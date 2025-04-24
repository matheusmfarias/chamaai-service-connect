import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface ServiceRequest {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  is_public: boolean;
  estimated_price: number | null;
  scheduled_date: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
  };
}

export interface Proposal {
  id: string;
  request_id: string;
  provider_id: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  created_at: string;
  updated_at: string;
  service_providers?: {
    id: string;
    rating: number;
    profiles: {
      full_name: string;
      city: string | null;
      state: string | null;
    };
  };
}

// Mock service requests
const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'request-1',
    client_id: 'client-user',
    title: 'Limpeza de apartamento',
    description: 'Preciso de uma faxina completa em apartamento de 70m²',
    category: 'limpeza',
    status: 'pending',
    is_public: true,
    estimated_price: null,
    scheduled_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'Cliente Exemplo'
    }
  },
  {
    id: 'request-2',
    client_id: 'client-user',
    title: 'Instalação de tomadas',
    description: 'Preciso instalar 5 tomadas na sala e cozinha',
    category: 'eletrica',
    status: 'pending',
    is_public: false,
    estimated_price: null,
    scheduled_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profiles: {
      full_name: 'Cliente Exemplo'
    }
  }
];

// Mock proposals
const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    request_id: 'request-1',
    provider_id: 'provider-user',
    price: 150,
    status: 'pending',
    message: 'Posso fazer o serviço completo incluindo produtos de limpeza.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    service_providers: {
      id: 'provider-user',
      rating: 4.8,
      profiles: {
        full_name: 'Prestador Exemplo',
        city: 'Rio de Janeiro',
        state: 'RJ'
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest: ServiceRequest = {
        ...requestData,
        id: `request-${Date.now()}`,
        client_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      mockServiceRequests.push(newRequest);
      setRequests(prev => [newRequest, ...prev]);
      
      toast({
        title: 'Solicitação criada',
        description: 'Sua solicitação de serviço foi criada com sucesso.',
      });
      
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

  const getPublicRequests = async (category?: string): Promise<ServiceRequest[]> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredRequests = mockServiceRequests.filter(req => req.is_public);
      
      if (category) {
        filteredRequests = filteredRequests.filter(req => req.category === category);
      }
      
      return filteredRequests;
    } catch (err: any) {
      toast({
        title: 'Erro ao carregar solicitações públicas',
        description: 'Não foi possível carregar as solicitações de serviço.',
        variant: 'destructive',
      });
      return [];
    }
  };
  
  return { requests, isLoading, error, createRequest, getPublicRequests };
};

export const useProposals = (requestId?: string) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
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

  const createProposal = async (data: {
    request_id: string;
    price: number;
    message: string;
  }): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProposal: Proposal = {
        id: `proposal-${Date.now()}`,
        provider_id: user.id,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...data
      };
      
      mockProposals.push(newProposal);
      setProposals(prev => [...prev, newProposal]);
      
      toast({
        title: 'Proposta enviada',
        description: 'Sua proposta foi enviada com sucesso.',
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: 'Erro ao enviar proposta',
        description: 'Não foi possível enviar sua proposta.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateProposalStatus = async (proposalId: string, status: 'accepted' | 'rejected'): Promise<boolean> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const proposalIndex = mockProposals.findIndex(p => p.id === proposalId);
      if (proposalIndex === -1) return false;
      
      mockProposals[proposalIndex].status = status;
      mockProposals[proposalIndex].updated_at = new Date().toISOString();
      
      setProposals(prev => 
        prev.map(p => p.id === proposalId ? 
          { ...p, status, updated_at: new Date().toISOString() } : p
        )
      );
      
      const actionText = status === 'accepted' ? 'aceita' : 'recusada';
      
      toast({
        title: `Proposta ${actionText}`,
        description: `A proposta foi ${actionText} com sucesso.`,
      });
      
      return true;
    } catch (err: any) {
      toast({
        title: 'Erro ao atualizar proposta',
        description: 'Não foi possível atualizar o status da proposta.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  return { 
    proposals, 
    isLoading, 
    error, 
    createProposal,
    updateProposalStatus
  };
};
