
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Review {
  id: string;
  service_provider_id: string;
  reviewer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  request_id: string | null;
  profiles: {
    full_name: string;
  };
}

export const useReviews = (providerId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', providerId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            profiles (
              full_name
            )
          `)
          .eq('service_provider_id', providerId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        return data as unknown as Review[];
      } catch (err: any) {
        toast({
          title: 'Erro ao carregar avaliações',
          description: err.message,
          variant: 'destructive',
        });
        throw err;
      }
    },
    enabled: !!providerId
  });
  
  const createReview = useMutation({
    mutationFn: async ({ 
      service_provider_id, 
      rating, 
      comment 
    }: { 
      service_provider_id: string;
      rating: number;
      comment?: string;
    }) => {
      if (!user) throw new Error('Usuário não autenticado');
      
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          service_provider_id,
          reviewer_id: user.id,
          rating,
          comment
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', providerId] });
      queryClient.invalidateQueries({ queryKey: ['provider', providerId] });
      toast({
        title: 'Avaliação enviada',
        description: 'Obrigado por compartilhar sua experiência!',
      });
    },
    onError: (err: any) => {
      toast({
        title: 'Erro ao enviar avaliação',
        description: err.message,
        variant: 'destructive',
      });
    }
  });
  
  return {
    reviews: reviews || [],
    isLoading,
    error,
    createReview: createReview.mutate
  };
};
