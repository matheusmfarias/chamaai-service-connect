
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Review } from '@/types/serviceRequest';
import { supabase } from '@/integrations/supabase';

export const useReviews = (providerId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', providerId],
    queryFn: async () => {
      if (!providerId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:from_user_id (
            full_name
          )
        `)
        .eq('to_user_id', providerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    enabled: !!providerId
  });
  
  const createReview = useMutation({
    mutationFn: async ({ 
      service_provider_id, 
      rating, 
      comment,
      request_id = null
    }: { 
      service_provider_id: string;
      rating: number;
      comment?: string;
      request_id?: string | null;
    }) => {
      if (!user) throw new Error('Usuário não autenticado');
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          from_user_id: user.id,
          to_user_id: service_provider_id,
          rating,
          comment: comment || null,
          request_id
        });

      if (error) throw error;
      return true;
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
    createReview: createReview.mutate,
    averageRating: reviews?.length ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 
      0
  };
};

