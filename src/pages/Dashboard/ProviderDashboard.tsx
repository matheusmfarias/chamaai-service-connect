
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  XCircle,
  Star,
  FileText
} from "lucide-react";
import { ServiceRequest } from "@/hooks/useServiceRequests";

interface ServiceProposal {
  id: string;
  request_id: string;
  provider_id: string;
  price: number;
  status: string;
  message: string | null;
  created_at: string;
  updated_at: string;
  service_requests?: ServiceRequest;
}

const ServiceRequestCard = ({ request, onAccept, onDecline }: { 
  request: any; 
  onAccept?: (id: string) => void; 
  onDecline?: (id: string) => void; 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }).format(date);
  };

  return (
    <Card key={request.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{request.title}</CardTitle>
            <CardDescription className="mt-1">
              {request.profiles?.full_name}
            </CardDescription>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(request.scheduled_date)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{request.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-gray-500">
          Solicitado em {formatDate(request.created_at)}
        </div>
        <div className="flex gap-2">
          {onDecline && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => onDecline(request.id)}
            >
              <XCircle className="w-4 h-4" />
              Recusar
            </Button>
          )}
          {onAccept && (
            <Button 
              size="sm" 
              className="bg-chamaai-blue hover:bg-chamaai-lightblue flex items-center gap-1"
              onClick={() => onAccept(request.id)}
            >
              <CheckCircle2 className="w-4 h-4" />
              Enviar Orçamento
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const ProviderDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<ServiceProposal[]>([]);
  const [completedRequests, setCompletedRequests] = useState<ServiceProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchRequests = async () => {
      setIsLoading(true);
      
      try {
        // Buscar todas as solicitações (isso seria refinado em produção)
        const { data: pendingData, error: pendingError } = await supabase
          .from('service_requests')
          .select(`
            *,
            profiles (
              full_name
            )
          `)
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
        
        if (pendingError) throw pendingError;
        
        // Buscar solicitações aceitas por este prestador
        const { data: acceptedData, error: acceptedError } = await supabase
          .from('service_proposals')
          .select(`
            *,
            service_requests (
              *,
              profiles (
                full_name
              )
            )
          `)
          .eq('provider_id', user.id)
          .eq('status', 'pending')
          .order('created_at', { ascending: false });
        
        if (acceptedError) throw acceptedError;
        
        // Buscar solicitações concluídas por este prestador
        const { data: completedData, error: completedError } = await supabase
          .from('service_proposals')
          .select(`
            *,
            service_requests (
              *,
              profiles (
                full_name
              )
            )
          `)
          .eq('provider_id', user.id)
          .eq('status', 'done')
          .order('created_at', { ascending: false });
        
        if (completedError) throw completedError;
        
        setPendingRequests(pendingData as any[]);
        setAcceptedRequests(acceptedData as ServiceProposal[]);
        setCompletedRequests(completedData as ServiceProposal[]);
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast({
          title: 'Erro ao carregar solicitações',
          description: 'Não foi possível carregar as solicitações. Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [user, toast]);
  
  const handleAcceptRequest = async (requestId: string) => {
    if (!user) return;
    
    try {
      // Normalmente aqui haveria uma interface para definir o valor do orçamento
      // Para simplificar, estamos definindo um valor fixo
      const price = 250; // R$ 250,00
      
      const { data, error } = await supabase
        .from('service_proposals')
        .insert({
          request_id: requestId,
          provider_id: user.id,
          price,
          status: 'pending',
          message: 'Orçamento enviado automaticamente'
        });
      
      if (error) throw error;
      
      toast({
        title: 'Orçamento enviado',
        description: 'Seu orçamento foi enviado ao cliente com sucesso.',
      });
      
      // Atualiza a lista removendo a solicitação aceita
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: 'Erro ao enviar orçamento',
        description: 'Não foi possível enviar o orçamento. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeclineRequest = (requestId: string) => {
    // Na implementação real, poderíamos marcar esta solicitação como "não interessado"
    // para este prestador específico
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    
    toast({
      title: 'Serviço recusado',
      description: 'Você recusou esta solicitação de serviço.',
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Novas Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {pendingRequests.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Propostas Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {acceptedRequests.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {completedRequests.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Avaliação</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-3xl font-bold mr-1">
              {userProfile?.id ? "0" : "0"}
            </div>
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Solicitações de Serviço</h2>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Novas Solicitações</TabsTrigger>
            <TabsTrigger value="accepted">Propostas Enviadas</TabsTrigger>
            <TabsTrigger value="done">Concluídos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
                <p className="text-gray-600 mt-2">Carregando solicitações...</p>
              </div>
            ) : pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <ServiceRequestCard 
                    key={request.id} 
                    request={request} 
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">Não há solicitações pendentes no momento.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="accepted">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
                <p className="text-gray-600 mt-2">Carregando propostas...</p>
              </div>
            ) : acceptedRequests.length > 0 ? (
              <div className="space-y-4">
                {acceptedRequests.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{proposal.service_requests?.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {proposal.service_requests?.profiles?.full_name}
                          </CardDescription>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(proposal.service_requests?.scheduled_date || "").toLocaleDateString('pt-BR')}
                          </div>
                          <div className="font-medium text-right">
                            R$ {proposal.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{proposal.service_requests?.description}</p>
                      {proposal.message && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md">
                          <p className="text-gray-700 text-sm">{proposal.message}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="text-sm text-gray-500">
                        Proposta enviada em {new Date(proposal.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          Mensagem
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">Você não enviou propostas ainda.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="done">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
                <p className="text-gray-600 mt-2">Carregando serviços concluídos...</p>
              </div>
            ) : completedRequests.length > 0 ? (
              <div className="space-y-4">
                {completedRequests.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{proposal.service_requests?.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {proposal.service_requests?.profiles?.full_name}
                          </CardDescription>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(proposal.service_requests?.scheduled_date || "").toLocaleDateString('pt-BR')}
                          </div>
                          <div className="font-medium text-right">
                            R$ {proposal.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{proposal.service_requests?.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="text-sm text-gray-500">
                        Concluído em {new Date(proposal.updated_at).toLocaleDateString('pt-BR')}
                      </div>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Ver Detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">Você não possui serviços concluídos.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProviderDashboard;
