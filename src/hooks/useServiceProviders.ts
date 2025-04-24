
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ServiceProvider } from '@/types/serviceProvider';

export { type ServiceProvider };

// Mock data for service providers with enhanced fields
const mockProviders: ServiceProvider[] = [
  {
    id: 'provider-1',
    user_id: 'provider-user',
    category_id: 'limpeza',
    category: 'Limpeza', 
    description: 'Serviços de limpeza residencial com produtos especializados.',
    rate_per_hour: 50,
    availability: ['morning', 'afternoon'],
    rating: 4.8,
    total_reviews: 24,
    created_at: '2024-01-01T10:00:00Z',
    is_verified: true,
    service_radius: 10, // 10 km
    response_time: '30 minutos',
    services_completed: 45,
    profiles: {
      full_name: 'Prestador Exemplo',
      phone: '(11) 98765-4321',
      city: 'Rio de Janeiro',
      state: 'RJ',
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
    user_id: 'another-provider',
    category_id: 'eletrica',
    category: 'Elétrica',
    description: 'Eletricista com 15 anos de experiência em instalações residenciais.',
    rate_per_hour: 80,
    availability: ['afternoon', 'evening'],
    rating: 4.9,
    total_reviews: 36,
    created_at: '2024-01-05T14:30:00Z',
    is_verified: false,
    service_radius: 15, // 15 km
    response_time: '1 hora',
    services_completed: 78,
    profiles: {
      full_name: 'Outro Prestador',
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

// Add more providers for different categories
mockProviders.push({
  id: 'provider-3',
  user_id: 'hydro-provider',
  category_id: 'hidraulica',
  category: 'Hidráulica',
  description: 'Encanador com experiência em reparos e instalações residenciais.',
  rate_per_hour: 70,
  availability: ['morning', 'afternoon', 'evening'],
  rating: 4.6,
  total_reviews: 18,
  created_at: '2024-02-01T09:15:00Z',
  is_verified: true,
  service_radius: 8, // 8 km
  response_time: '45 minutos',
  services_completed: 32,
  profiles: {
    full_name: 'Prestador Hidráulica',
    phone: '(11) 95555-8888',
    city: 'São Paulo',
    state: 'SP',
    avatar_url: null
  },
  categories: {
    name: 'Hidráulica',
    slug: 'hidraulica',
    icon: 'droplets'
  }
});

mockProviders.push({
  id: 'provider-4',
  user_id: 'painting-provider',
  category_id: 'pintura',
  category: 'Pintura',
  description: 'Pintor especializado em ambientes internos e externos.',
  rate_per_hour: 60,
  availability: ['morning', 'afternoon'],
  rating: 4.7,
  total_reviews: 29,
  created_at: '2024-01-20T14:30:00Z',
  is_verified: true,
  service_radius: 12, // 12 km
  response_time: '40 minutos',
  services_completed: 51,
  profiles: {
    full_name: 'Prestador Pintura',
    phone: '(11) 94444-7777',
    city: 'São Paulo',
    state: 'SP',
    avatar_url: null
  },
  categories: {
    name: 'Pintura',
    slug: 'pintura',
    icon: 'paintbrush'
  }
});

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

export const useSearchServiceProviders = (searchTerm: string, filters?: {
  category?: string;
  maxDistance?: number;
  minRating?: number;
  isVerified?: boolean;
}) => {
  const { toast } = useToast();
  
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['search-providers', searchTerm, filters],
    queryFn: async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Base filtering with search term
        let filteredProviders = searchTerm ? mockProviders.filter(provider => 
          provider.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.profiles.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) : [...mockProviders];
        
        // Apply additional filters if provided
        if (filters) {
          if (filters.category) {
            filteredProviders = filteredProviders.filter(provider => 
              provider.category_id === filters.category
            );
          }
          
          if (filters.minRating !== undefined) {
            filteredProviders = filteredProviders.filter(provider => 
              provider.rating >= filters.minRating!
            );
          }
          
          if (filters.isVerified) {
            filteredProviders = filteredProviders.filter(provider => 
              provider.is_verified === true
            );
          }
          
          if (filters.maxDistance !== undefined) {
            filteredProviders = filteredProviders.filter(provider => 
              provider.service_radius && provider.service_radius <= filters.maxDistance!
            );
          }
        }
        
        return filteredProviders;
      } catch (err: any) {
        toast({
          title: 'Erro ao buscar prestadores',
          description: err.message,
          variant: 'destructive',
        });
        throw err;
      }
    }
  });
  
  return { providers: providers || [], isLoading, error };
};
