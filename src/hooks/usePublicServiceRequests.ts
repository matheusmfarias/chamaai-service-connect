
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import { ServiceRequest } from '@/types/serviceRequest';
import { toast } from '@/hooks/use-toast';

interface UsePublicServiceRequestsProps {
  categoryId?: string;
  location?: string;
  enabled?: boolean;
}

export const usePublicServiceRequests = ({ 
  categoryId, 
  location, 
  enabled = true 
}: UsePublicServiceRequestsProps = {}) => {
  
  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['public_service_requests', categoryId, location],
    queryFn: async () => {
      let query = supabase
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
      
      // Add filters if provided
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      // Filter by location if provided
      if (location) {
        query = query.ilike('location', `%${location}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        toast({
          title: 'Erro ao carregar solicitações',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      // Add backward compatibility for category field
      const requestsWithCategory = data.map((request: any) => ({
        ...request,
        category: request.categories?.slug || null
      }));
      
      return requestsWithCategory as ServiceRequest[];
    },
    enabled
  });
  
  return {
    requests,
    isLoading,
    error
  };
};
