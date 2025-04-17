
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  service_provider_id: string;
  reviewer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

export const useReviews = (providerId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!providerId) return;
    
    const fetchReviews = async () => {
      setIsLoading(true);
      
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
        
        if (error) {
          throw error;
        }
        
        setReviews(data as unknown as Review[]);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Erro ao carregar avaliações',
          description: 'Não foi possível carregar as avaliações para este prestador.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, [providerId, toast]);
  
  const createReview = async (reviewData: {
    service_provider_id: string;
    rating: number;
    comment?: string;
  }): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('reviews')
        .insert(reviewData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Avaliação enviada',
        description: 'Obrigado por compartilhar sua experiência!',
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: 'Erro ao enviar avaliação',
        description: 'Não foi possível enviar sua avaliação. Tente novamente mais tarde.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  return { reviews, isLoading, error, createReview };
};
