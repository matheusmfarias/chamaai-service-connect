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

// Mock data for testing purposes
const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    category: "Faxina",
    description: "Especialista em limpeza residencial com mais de 5 anos de experiência. Atendo apartamentos e casas.",
    rate_per_hour: 35,
    is_verified: true,
    rating: 4.8,
    total_reviews: 127,
    services_completed: 156,
    response_time: "30 minutos",
    created_at: "2024-01-15",
    updated_at: "2024-04-17",
    profiles: {
      full_name: "Maria Silva",
      phone: "(11) 98765-4321",
      city: "São Paulo",
      state: "SP"
    }
  },
  {
    id: "2",
    category: "Faxina",
    description: "Faxineira profissional com experiência em limpeza pós-obra e limpeza pesada.",
    rate_per_hour: 40,
    is_verified: true,
    rating: 4.9,
    total_reviews: 89,
    services_completed: 102,
    response_time: "45 minutos",
    created_at: "2024-02-01",
    updated_at: "2024-04-17",
    profiles: {
      full_name: "Ana Santos",
      phone: "(11) 91234-5678",
      city: "Guarulhos",
      state: "SP"
    }
  },
  {
    id: "3",
    category: "Faxina",
    description: "Especializada em limpeza de escritórios e ambientes comerciais. Experiência com produtos específicos.",
    rate_per_hour: 45,
    is_verified: true,
    rating: 4.7,
    total_reviews: 64,
    services_completed: 78,
    response_time: "1 hora",
    created_at: "2024-03-10",
    updated_at: "2024-04-17",
    profiles: {
      full_name: "Joana Oliveira",
      phone: "(11) 97777-8888",
      city: "São Paulo",
      state: "SP"
    }
  },
  {
    id: "4",
    category: "Faxina",
    description: "Atendo com limpeza residencial, especialista em organização e limpeza de rotina.",
    rate_per_hour: 38,
    is_verified: false,
    rating: 4.6,
    total_reviews: 32,
    services_completed: 45,
    response_time: "2 horas",
    created_at: "2024-03-15",
    updated_at: "2024-04-17",
    profiles: {
      full_name: "Beatriz Lima",
      phone: "(11) 96666-5555",
      city: "Osasco",
      state: "SP"
    }
  },
  {
    id: "5",
    category: "Faxina",
    description: "Realizo limpeza completa, incluindo janelas, cortinas e armários. Organização de ambientes.",
    rate_per_hour: 42,
    is_verified: true,
    rating: 5.0,
    total_reviews: 28,
    services_completed: 35,
    response_time: "1 hora",
    created_at: "2024-03-20",
    updated_at: "2024-04-17",
    profiles: {
      full_name: "Regina Costa",
      phone: "(11) 95555-4444",
      city: "São Paulo",
      state: "SP"
    }
  }
];

export const useServiceProviders = (category?: string) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulando um delay de carregamento para testar estados de loading
    const fetchProviders = async () => {
      setIsLoading(true);
      
      try {
        // Simula uma chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Por enquanto, retornamos os dados mockados
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
