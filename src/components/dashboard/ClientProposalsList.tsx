
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  CheckCheck, 
  Star
} from "lucide-react";
import { useClientProposals } from "@/hooks/useClientProposals";
import ReviewProviderForm from "./ReviewProviderForm";
import { formatCurrency } from "@/utils/formatters";

export default function ClientProposalsList() {
  const { proposals, isLoadingProposals, updateProposalStatus, completeServiceRequest } = useClientProposals();
  const [reviewFormProvider, setReviewFormProvider] = useState<{ id: string, name: string, requestId: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState<string | null>(null);

  if (isLoadingProposals) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-chamaai-blue" />
        <span className="ml-2 text-gray-500">Carregando propostas...</span>
      </div>
    );
  }

  if (!proposals.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Você ainda não recebeu propostas para seus serviços.</p>
      </div>
    );
  }

  const handleUpdateStatus = async (proposalId: string, status: 'accepted' | 'rejected', requestId: string) => {
    setIsUpdating(proposalId);
    try {
      await updateProposalStatus.mutateAsync({ proposalId, status, requestId });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleCompleteService = async (requestId: string) => {
    setIsCompleting(requestId);
    try {
      await completeServiceRequest.mutateAsync(requestId);
    } finally {
      setIsCompleting(null);
    }
  };

  const showReviewForm = (providerId: string, providerName: string, requestId: string) => {
    setReviewFormProvider({ id: providerId, name: providerName, requestId });
  };

  const closeReviewForm = () => {
    setReviewFormProvider(null);
  };

  // Group proposals by service request
  const requestsWithProposals = proposals.reduce((acc, proposal) => {
    const requestId = proposal.request_id;
    if (!acc[requestId]) {
      acc[requestId] = {
        id: requestId,
        title: proposal.service_requests?.title || 'Serviço sem título',
        status: proposal.service_requests?.status || 'pending',
        proposals: []
      };
    }
    acc[requestId].proposals.push(proposal);
    return acc;
  }, {} as Record<string, { id: string; title: string; status: string; proposals: typeof proposals }> );

  return (
    <div className="space-y-8">
      {Object.values(requestsWithProposals).map((request) => (
        <div key={request.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="font-medium">{request.title}</h3>
              <div className="flex items-center mt-1">
                <Badge className={
                  request.status === 'pending' ? 'bg-amber-500' : 
                  request.status === 'in_progress' ? 'bg-chamaai-blue' : 
                  request.status === 'completed' ? 'bg-green-500' : 
                  'bg-gray-500'
                }>
                  {
                    request.status === 'pending' ? 'Aguardando' : 
                    request.status === 'in_progress' ? 'Em andamento' :
                    request.status === 'completed' ? 'Concluído' :
                    'Cancelado'
                  }
                </Badge>
              </div>
            </div>
            
            {request.status === 'in_progress' && (
              <Button 
                onClick={() => handleCompleteService(request.id)}
                disabled={!!isCompleting}
                className="bg-green-500 hover:bg-green-600"
              >
                {isCompleting === request.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  <>
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Marcar como Concluído
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div>
            {request.proposals.map((proposal) => {
              const providerName = proposal.service_providers?.profiles?.full_name || 'Prestador';
              const providerLocation = 
                proposal.service_providers?.profiles?.city && proposal.service_providers?.profiles?.state 
                  ? `${proposal.service_providers.profiles.city}, ${proposal.service_providers.profiles.state}`
                  : 'Localização não informada';
              
              const isAccepted = proposal.status === 'accepted';
              const isRejected = proposal.status === 'rejected';
              const isPending = proposal.status === 'pending';
              const isCompleted = request.status === 'completed';
              
              return (
                <Card key={proposal.id} className="m-4 border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{providerName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{providerName}</CardTitle>
                          <CardDescription>{providerLocation}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-chamaai-blue">
                          {formatCurrency(proposal.price)}
                        </div>
                        {proposal.status === 'accepted' && (
                          <Badge className="bg-green-500">Aceita</Badge>
                        )}
                        {proposal.status === 'rejected' && (
                          <Badge variant="outline" className="text-gray-500">Rejeitada</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{proposal.message}</p>
                  </CardContent>
                  {isPending && request.status === 'pending' && (
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button 
                        variant="outline" 
                        onClick={() => handleUpdateStatus(proposal.id, 'rejected', request.id)}
                        disabled={!!isUpdating}
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        {isUpdating === proposal.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Rejeitar
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStatus(proposal.id, 'accepted', request.id)}
                        disabled={!!isUpdating}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {isUpdating === proposal.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aceitar
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                  {isAccepted && isCompleted && (
                    <CardFooter className="flex justify-end space-x-2 pt-0">
                      <Button 
                        onClick={() => showReviewForm(
                          proposal.provider_id || '', 
                          providerName, 
                          proposal.request_id
                        )}
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        <Star className="mr-2 h-4 w-4" />
                        Avaliar Prestador
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {reviewFormProvider && (
        <ReviewProviderForm
          providerId={reviewFormProvider.id}
          providerName={reviewFormProvider.name}
          requestId={reviewFormProvider.requestId}
          isOpen={!!reviewFormProvider}
          onClose={closeReviewForm}
        />
      )}
    </div>
  );
};
