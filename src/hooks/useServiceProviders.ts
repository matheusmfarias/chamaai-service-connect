
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
  search_tags?: string[];
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
          console.log(`Buscando prestadores com termo: "${searchQuery.toLowerCase()}"`);
          
          // Use the search_service_providers function for search queries
          const { data, error: searchError } = await supabase
            .rpc('search_service_providers', {
              search_term: searchQuery.toLowerCase()
            });
            
          if (searchError) {
            console.error("Erro na busca:", searchError);
            throw searchError;
          }
          
          console.log(`Resultados da busca:`, data);
          query = data;
          
        } else if (category) {
          console.log(`Buscando prestadores por categoria: "${category.toLowerCase()}"`);
          
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
            
          if (categoryError) {
            console.error("Erro na busca por categoria:", categoryError);
            throw categoryError;
          }
          
          console.log(`Resultados da busca por categoria:`, data);
          query = data;
          
        } else {
          console.log("Buscando todos os prestadores");
          
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
            
          if (allError) {
            console.error("Erro na busca de todos os prestadores:", allError);
            throw allError;
          }
          
          console.log(`Total de prestadores encontrados:`, data?.length || 0);
          query = data;
        }
        
        setProviders(query || []);
      } catch (err: any) {
        console.error("Erro completo:", err);
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
