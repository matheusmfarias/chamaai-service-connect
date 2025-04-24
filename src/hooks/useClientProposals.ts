
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Proposal } from '@/types/serviceRequest';
import { supabase } from '@/integrations/supabase';

export const useClientProposals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: proposals = [], isLoading: isLoadingProposals } = useQuery({
    queryKey: ['client_proposals', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data: requests } = await supabase
        .from('service_requests')
        .select('id')
        .eq('client_id', user.id);

      if (!requests?.length) return [];

      const requestIds = requests.map(request => request.id);

      const { data, error } = await supabase
        .from('proposals')
        .select(`
          *,
          service_requests (
            id,
            title,
            status
          ),
          service_providers:provider_id (
            id,
            rating,
            profiles (
              full_name,
              city,
              state
            )
          )
        `)
        .in('request_id', requestIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Proposal[];
    },
    enabled: !!user
  });

  const updateProposalStatus = useMutation({
    mutationFn: async ({ 
      proposalId, 
      status, 
      requestId 
    }: { 
      proposalId: string; 
      status: 'accepted' | 'rejected';
      requestId: string;
    }) => {
      // Start a transaction
      const { error: updateError } = await supabase
        .from('proposals')
        .update({ status })
        .eq('id', proposalId);

      if (updateError) throw updateError;

      if (status === 'accepted') {
        // Reject all other proposals for this request
        const { error: rejectError } = await supabase
          .from('proposals')
          .update({ status: 'rejected' })
          .eq('request_id', requestId)
          .neq('id', proposalId);

        if (rejectError) throw rejectError;

        // Update request status to in_progress
        const { error: requestError } = await supabase
          .from('service_requests')
          .update({ status: 'in_progress' })
          .eq('id', requestId);

        if (requestError) throw requestError;
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client_proposals'] });
      queryClient.invalidateQueries({ queryKey: ['service_requests'] });
      toast({
        title: 'Status atualizado',
        description: 'O status da proposta foi atualizado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message || 'Não foi possível atualizar o status.',
        variant: 'destructive',
      });
    }
  });

  const completeServiceRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: 'completed' })
        .eq('id', requestId);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_requests'] });
      queryClient.invalidateQueries({ queryKey: ['client_proposals'] });
      toast({
        title: 'Serviço finalizado',
        description: 'O serviço foi marcado como concluído.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao finalizar serviço',
        description: error.message || 'Não foi possível finalizar o serviço.',
        variant: 'destructive',
      });
    }
  });

  return {
    proposals,
    isLoadingProposals,
    updateProposalStatus,
    completeServiceRequest
  };
};
