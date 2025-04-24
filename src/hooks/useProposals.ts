
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Proposal } from '@/types/serviceRequest';
import { supabase } from '@/integrations/supabase';

export const useProposals = (requestId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: proposals = [], isLoading, error } = useQuery({
    queryKey: ['proposals', requestId],
    queryFn: async () => {
      if (!requestId || !user) return [];

      const { data, error } = await supabase
        .from('proposals')
        .select(`
          *,
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
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Proposal[];
    },
    enabled: !!requestId && !!user,
  });

  const createProposal = useMutation({
    mutationFn: async (data: { request_id: string; price: number; message: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('proposals')
        .insert({
          ...data,
          provider_id: user.id,
          status: 'pending'
        });

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Proposta enviada',
        description: 'Sua proposta foi enviada com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao enviar proposta',
        description: error.message || 'Não foi possível enviar sua proposta.',
        variant: 'destructive',
      });
    }
  });

  const updateProposalStatus = useMutation({
    mutationFn: async ({ proposalId, status }: { proposalId: string; status: 'accepted' | 'rejected' }) => {
      const { error } = await supabase
        .from('proposals')
        .update({ status })
        .eq('id', proposalId);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Status atualizado',
        description: 'O status da proposta foi atualizado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message || 'Não foi possível atualizar o status da proposta.',
        variant: 'destructive',
      });
    }
  });

  return {
    proposals,
    isLoading,
    error,
    createProposal,
    updateProposalStatus
  };
};
