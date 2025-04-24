
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface ServiceRequest {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  estimated_price: number | null;
  scheduled_date: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
  };
}

// Mock service requests
const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'request-1',
    client_id: 'mock-user-1',
    title: 'Limpeza de apartamento',
    description: 'Preciso de uma faxina completa em apartamento de 70m²',
    category: 'limpeza',
    status: 'pending',
    estimated_price: null,
    scheduled_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'João Silva'
    }
  },
  {
    id: 'request-2',
    client_id: 'mock-user-1',
    title: 'Instalação de tomadas',
    description: 'Preciso instalar 5 tomadas na sala e cozinha',
    category: 'eletrica',
    status: 'pending',
    estimated_price: null,
    scheduled_date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'João Silva'
    }
  }
];

// Mock service proposals
const mockProposals = [
  {
    id: 'proposal-1',
    request_id: 'request-1',
    provider_id: 'provider-1',
    price: 150,
    status: 'pending',
    message: 'Posso fazer o serviço completo incluindo produtos de limpeza.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    service_providers: {
      id: 'provider-1',
      rating: 4.8,
      profiles: {
        full_name: 'Maria Silva',
        city: 'São Paulo',
        state: 'SP'
      }
    }
  }
];

export const useServiceRequests = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const filteredRequests = mockServiceRequests.filter(
          req => req.client_id === user.id
        );
        
        setRequests(filteredRequests);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Erro ao carregar solicitações',
          description: 'Não foi possível carregar suas solicitações de serviço.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [user, toast]);
  
  const createRequest = async (requestData: Omit<ServiceRequest, 'id' | 'client_id' | 'created_at' | 'updated_at'>): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const newRequest: ServiceRequest = {
        ...requestData,
        id: `request-${Date.now()}`,
        client_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      mockServiceRequests.push(newRequest);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest.id;
    } catch (err: any) {
      toast({
        title: 'Erro ao criar solicitação',
        description: 'Não foi possível criar a solicitação de serviço.',
        variant: 'destructive',
      });
      return null;
    }
  };
  
  return { requests, isLoading, error, createRequest };
};

export const useProposals = (requestId?: string) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!requestId) return;
    
    const fetchProposals = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const filteredProposals = mockProposals.filter(
          proposal => proposal.request_id === requestId
        );
        
        setProposals(filteredProposals);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Erro ao carregar propostas',
          description: 'Não foi possível carregar as propostas para esta solicitação.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProposals();
  }, [requestId, toast]);
  
  return { proposals, isLoading, error };
};
