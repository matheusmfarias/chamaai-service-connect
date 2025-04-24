
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceRequest } from '@/types/serviceRequest';
import { mockServiceRequests } from '@/mocks/serviceRequestMocks';

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
