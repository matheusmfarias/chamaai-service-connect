
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ServiceProvider } from '@/types/serviceProvider';

export { type ServiceProvider };

// Mock data for service providers
const mockProviders: ServiceProvider[] = [
  {
    id: 'provider-1',
    user_id: 'user-1',
    category_id: 'limpeza',
    description: 'Serviços de limpeza residencial com produtos especializados.',
    rate_per_hour: 50,
    availability: ['morning', 'afternoon'],
    rating: 4.8,
    total_reviews: 24,
    created_at: '2024-01-01T10:00:00Z',
    profiles: {
      full_name: 'Maria Silva',
      phone: '(11) 98765-4321',
      city: 'São Paulo',
      state: 'SP',
      avatar_url: null
    },
    categories: {
      name: 'Limpeza',
      slug: 'limpeza',
      icon: 'clean'
    }
  },
  {
    id: 'provider-2',
    user_id: 'user-2',
    category_id: 'eletrica',
    description: 'Eletricista com 15 anos de experiência em instalações residenciais.',
    rate_per_hour: 80,
    availability: ['afternoon', 'evening'],
    rating: 4.9,
    total_reviews: 36,
    created_at: '2024-01-05T14:30:00Z',
    profiles: {
      full_name: 'João Ferreira',
      phone: '(11) 91234-5678',
      city: 'São Paulo',
      state: 'SP',
      avatar_url: null
    },
    categories: {
      name: 'Elétrica',
      slug: 'eletrica',
      icon: 'zap'
    }
  }
];

export const useServiceProviders = (category?: string) => {
  const { toast } = useToast();
  
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['providers', category],
    queryFn: async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (category) {
          return mockProviders.filter(provider => provider.categories.slug === category);
        }
        
        return mockProviders;
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProvider = mockProviders.find(p => p.id === id);
        
        if (!foundProvider) {
          throw new Error('Prestador não encontrado');
        }
        
        return foundProvider;
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
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!searchTerm) return [];
        
        const searchTermLower = searchTerm.toLowerCase();
        
        return mockProviders.filter(provider => 
          provider.description?.toLowerCase().includes(searchTermLower) ||
          provider.profiles.full_name.toLowerCase().includes(searchTermLower) ||
          provider.categories.name.toLowerCase().includes(searchTermLower)
        );
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
