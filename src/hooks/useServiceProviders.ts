
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ServiceProvider } from '@/types/serviceProvider';

export { type ServiceProvider };

export const useServiceProviders = (category?: string) => {
  const { toast } = useToast();
  
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['providers', category],
    queryFn: async () => {
      try {
        let query = supabase
          .from('service_providers')
          .select(`
            *,
            profiles (
              full_name,
              phone,
              city,
              state
            ),
            categories (
              name,
              slug,
              icon
            )
          `)
          .order('rating', { ascending: false });
        
        if (category) {
          query = query.eq('categories.slug', category);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        return data as unknown as ServiceProvider[];
      } catch (err: any) {
        toast({
          title: 'Erro ao carregar prestadores',
          description: err.message,
          variant: 'destructive',
        });
        throw err;
      }
    }
  });
  
  return { providers: providers || [], isLoading, error };
};

export const useServiceProvider = (id: string) => {
  const { toast } = useToast();
  
  const { data: provider, isLoading, error } = useQuery({
    queryKey: ['provider', id],
    queryFn: async () => {
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
            ),
            categories (
              name,
              slug,
              icon
            )
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        return data as unknown as ServiceProvider;
      } catch (err: any) {
        toast({
          title: 'Erro ao carregar prestador',
          description: err.message,
          variant: 'destructive',
        });
        throw err;
      }
    },
    enabled: !!id
  });
  
  return { provider, isLoading, error };
};

export const useSearchServiceProviders = (searchTerm: string) => {
  const { toast } = useToast();
  
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['search-providers', searchTerm],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .rpc('search_service_providers', {
            search_term: searchTerm
          });
        
        if (error) throw error;
        
        return data as unknown as ServiceProvider[];
      } catch (err: any) {
        toast({
          title: 'Erro ao buscar prestadores',
          description: err.message,
          variant: 'destructive',
        });
        throw err;
      }
    },
    enabled: !!searchTerm
  });
  
  return { providers: providers || [], isLoading, error };
};
