
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Proposal } from '@/types/serviceRequest';
import { mockProposals } from '@/mocks/serviceRequestMocks';

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
