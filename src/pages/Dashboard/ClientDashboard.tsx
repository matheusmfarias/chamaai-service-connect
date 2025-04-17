
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MessageSquare,
  Star
} from "lucide-react";
import { useServiceRequests, ServiceRequest } from "@/hooks/useServiceRequests";
import { useServiceProviders, ServiceProvider } from "@/hooks/useServiceProviders";

const ServiceRequestCard = ({ request }: { request: ServiceRequest }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Aceito</Badge>;
      case "done":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Concluído</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card key={request.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{request.title}</CardTitle>
            <CardDescription className="mt-1">
              {getStatusBadge(request.status)}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(request.scheduled_date)}
            </div>
            {request.estimated_price && (
              <div className="font-medium">
                R$ {request.estimated_price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{request.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {request.status === "pending" ? "Aguardando orçamento" : 
           request.status === "accepted" ? "Serviço confirmado" :
           request.status === "done" ? "Serviço concluído" : "Serviço cancelado"}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            Mensagem
          </Button>
          {request.status === "done" && (
            <Button size="sm" className="bg-chamaai-blue hover:bg-chamaai-lightblue flex items-center gap-1">
              <Star className="w-4 h-4" />
              Avaliar
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const ProviderCard = ({ provider }: { provider: ServiceProvider }) => {
  return (
    <Card key={provider.id} className="overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback>{provider.profiles.full_name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center mb-2">
            <h3 className="font-semibold text-lg">{provider.profiles.full_name}</h3>
            {provider.is_verified && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Verificado</Badge>
            )}
          </div>
          <div className="flex items-center mb-2 text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="ml-1">{provider.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{provider.category.charAt(0).toUpperCase() + provider.category.slice(1)}</p>
          <p className="text-sm text-gray-600 mb-4">{provider.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">R$ {provider.rate_per_hour.toFixed(2)}/hora</span>
            <Link to={`/prestador/${provider.id}`}>
              <Button 
                size="sm" 
                className="bg-chamaai-blue hover:bg-chamaai-lightblue"
              >
                Ver perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ClientDashboard = () => {
  const { requests, isLoading: requestsLoading } = useServiceRequests();
  const { providers, isLoading: providersLoading } = useServiceProviders();

  const pendingRequests = requests.filter(req => req.status === "pending");
  const acceptedRequests = requests.filter(req => req.status === "accepted");
  const completedRequests = requests.filter(req => req.status === "done");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Serviços Solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{acceptedRequests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Seus Serviços</h2>
          <Link to="/solicitar-servico">
            <Button className="bg-chamaai-blue hover:bg-chamaai-lightblue">
              Solicitar Novo Serviço
            </Button>
          </Link>
        </div>
        
        {requestsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
            <p className="text-gray-600 mt-2">Carregando solicitações...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <ServiceRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">Você ainda não tem solicitações de serviço.</p>
              <Link to="/solicitar-servico">
                <Button className="bg-chamaai-blue hover:bg-chamaai-lightblue">
                  Solicitar Serviço
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Prestadores Recomendados</h2>
        
        {providersLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
            <p className="text-gray-600 mt-2">Carregando prestadores...</p>
          </div>
        ) : providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.slice(0, 6).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500">Não há prestadores disponíveis no momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ClientDashboard;
