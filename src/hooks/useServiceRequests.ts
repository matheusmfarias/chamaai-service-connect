
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
        const { data, error } = await supabase
          .from('service_requests')
          .select(`
            *,
            profiles (
              full_name
            )
          `)
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setRequests(data as unknown as ServiceRequest[]);
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
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          ...requestData,
          client_id: user.id
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setRequests(prev => [data as unknown as ServiceRequest, ...prev]);
      return data.id;
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
        const { data, error } = await supabase
          .from('service_proposals')
          .select(`
            *,
            service_providers (
              *,
              profiles (
                full_name,
                city,
                state
              )
            )
          `)
          .eq('request_id', requestId)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setProposals(data);
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
