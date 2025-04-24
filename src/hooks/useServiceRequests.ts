
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceRequest } from '@/types/serviceRequest';
import { supabase } from '@/integrations/supabase/client';

export const useServiceRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['service_requests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          profiles:client_id (
            full_name
          ),
          categories:category_id (
            name,
            slug,
            icon
          )
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ServiceRequest[];
    },
    enabled: !!user
  });

  const createRequest = async (requestData: Omit<ServiceRequest, 'id' | 'client_id' | 'created_at'>): Promise<string | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          ...requestData,
          client_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['service_requests'] });
      
      toast({
        title: 'Solicitação criada',
        description: 'Sua solicitação de serviço foi criada com sucesso.',
      });
      
      return data.id;
    } catch (err: any) {
      toast({
        title: 'Erro ao criar solicitação',
        description: 'Não foi possível criar a solicitação de serviço.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const getPublicRequests = async (category?: string): Promise<ServiceRequest[]> => {
    try {
      const query = supabase
        .from('service_requests')
        .select(`
          *,
          profiles:client_id (
            full_name
          ),
          categories:category_id (
            name,
            slug,
            icon
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (category) {
        query.eq('category_id', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ServiceRequest[];
    } catch (err: any) {
      toast({
        title: 'Erro ao carregar solicitações públicas',
        description: 'Não foi possível carregar as solicitações de serviço.',
        variant: 'destructive',
      });
      return [];
    }
  };
  
  return { requests, isLoading, error, createRequest, getPublicRequests };
};
