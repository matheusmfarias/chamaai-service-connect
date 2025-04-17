import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ServiceProvider {
  id: string;
  category: string;
  description: string | null;
  rate_per_hour: number;
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  services_completed: number;
  response_time: string | null;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
    phone: string | null;
    city: string | null;
    state: string | null;
  };
}

export const useServiceProviders = (category?: string, searchQuery?: string) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);
      try {
        let query;
        
        if (searchQuery) {
          // Use the search_service_providers function for search queries
          const { data, error: searchError } = await supabase
            .rpc('search_service_providers', {
              search_term: searchQuery.toLowerCase()
            });
            
          if (searchError) throw searchError;
          query = data;
          
        } else if (category) {
          // If no search query but category is specified, filter by category
          const { data, error: categoryError } = await supabase
            .from('service_providers')
            .select(`
              *,
              profiles (
                full_name,
                phone,
                city,
                state
              )
            `)
            .eq('category', category.toLowerCase());
            
          if (categoryError) throw categoryError;
          query = data;
          
        } else {
          // If no search query and no category, get all providers
          const { data, error: allError } = await supabase
            .from('service_providers')
            .select(`
              *,
              profiles (
                full_name,
                phone,
                city,
                state
              )
            `);
            
          if (allError) throw allError;
          query = data;
        }
        
        setProviders(query || []);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Erro ao carregar prestadores',
          description: 'Não foi possível carregar a lista de prestadores de serviço.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProviders();
  }, [category, searchQuery, toast]);
  
  return { providers, isLoading, error };
};

export const useServiceProvider = (id: string) => {
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProvider = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .select(`
            *,
            profiles (
              full_name,
              phone,
              city,
              state
            )
          `)
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setProvider(data as unknown as ServiceProvider);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Erro ao carregar prestador',
          description: 'Não foi possível carregar os dados do prestador de serviço.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProvider();
    }
  }, [id, toast]);
  
  return { provider, isLoading, error };
};
