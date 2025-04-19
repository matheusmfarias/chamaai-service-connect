
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ServiceProvider } from '@/types/serviceProvider';
import { mockProviders } from '@/mocks/serviceProviders';
import {
  filterProvidersBySearch,
  filterProvidersByLocation,
  filterProvidersByRating,
  filterProvidersByPrice,
  sortProviders
} from '@/utils/providerUtils';

export { type ServiceProvider };

export const useServiceProviders = (category?: string) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProviders(mockProviders);
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
  }, [category, toast]);
  
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
