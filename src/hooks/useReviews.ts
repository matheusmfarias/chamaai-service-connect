
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    service_provider_id: "provider-user",
    reviewer_id: "client-user",
    rating: 5,
    comment: "Excelente serviço, muito profissional e pontual!",
    created_at: "2024-01-01T00:00:00Z",
    request_id: "request-1",
    profiles: {
      full_name: "Cliente Exemplo"
    }
  },
  {
    id: "2",
    service_provider_id: "provider-user",
    reviewer_id: "another-client",
    rating: 4,
    comment: "Bom serviço, recomendo!",
    created_at: "2024-02-15T00:00:00Z",
    request_id: null,
    profiles: {
      full_name: "Outro Cliente"
    }
  },
];

export const useReviews = (providerId?: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', providerId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockReviews.filter(review => review.service_provider_id === providerId);
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReview: Review = {
        id: Math.random().toString(),
        service_provider_id,
        reviewer_id: user.id,
        rating,
        comment: comment || null,
        created_at: new Date().toISOString(),
        request_id,
        profiles: {
          full_name: user.user_metadata.full_name
        }
      };
      
      // Add to mock data
      mockReviews.push(newReview);
      return newReview;
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
