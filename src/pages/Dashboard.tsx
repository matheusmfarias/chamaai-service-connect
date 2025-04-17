
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  XCircle,
  Star,
  FileText,
  User,
  Settings,
  Briefcase
} from "lucide-react";
import Layout from "@/components/Layout";

// Mock data for service requests
const mockServiceRequests = [
  {
    id: "1",
    title: "Pintura de sala de estar",
    description: "Preciso pintar minha sala de estar de 20m². As paredes estão em bom estado.",
    category: "pintura",
    status: "pending",
    createdAt: "2025-04-15T14:30:00Z",
    scheduledDate: "2025-04-20T10:00:00Z",
    clientName: "Maria Silva",
    estimatedPrice: null
  },
  {
    id: "2",
    title: "Instalação de tomadas",
    description: "Preciso instalar 3 tomadas novas na cozinha. Já possuo os materiais.",
    category: "eletrica",
    status: "accepted",
    createdAt: "2025-04-14T09:15:00Z",
    scheduledDate: "2025-04-18T14:00:00Z",
    clientName: "Carlos Santos",
    estimatedPrice: 150
  },
  {
    id: "3",
    title: "Limpeza pós-obra",
    description: "Preciso de uma faxina completa após reforma. Apartamento de 70m².",
    category: "faxina",
    status: "done",
    createdAt: "2025-04-10T16:45:00Z",
    scheduledDate: "2025-04-12T09:00:00Z",
    clientName: "Ana Oliveira",
    estimatedPrice: 280
  }
];

// Mock data for service providers
const mockServiceProviders = [
  {
    id: "1",
    name: "João Pereira",
    category: "pintura",
    avatar: "https://i.pravatar.cc/150?u=1",
    ratePerHour: 50,
    rating: 4.8,
    isVerified: true,
    description: "Pintor com mais de 10 anos de experiência em pinturas residenciais e comerciais."
  },
  {
    id: "2",
    name: "Antônio Ferreira",
    category: "eletrica",
    avatar: "https://i.pravatar.cc/150?u=2",
    ratePerHour: 70,
    rating: 4.9,
    isVerified: true,
    description: "Eletricista especializado em instalações e reparos residenciais."
  },
  {
    id: "3",
    name: "Mariana Costa",
    category: "faxina",
    avatar: "https://i.pravatar.cc/150?u=3",
    ratePerHour: 40,
    rating: 4.7,
    isVerified: false,
    description: "Diarista experiente em limpezas residenciais e pós-obra."
  }
];

// Mock user data (this would come from Supabase auth)
const mockUser = {
  id: "user123",
  fullName: "José Antônio",
  email: "jose@example.com",
  phone: "(11) 98765-4321",
  city: "São Paulo",
  state: "SP",
  isServiceProvider: true,
  serviceProvider: {
    id: "sp123",
    category: "pintura",
    description: "Pintor profissional com mais de 15 anos de experiência.",
    ratePerHour: 60,
    isVerified: true,
    rating: 4.9
  }
};

const Dashboard = () => {
  const [userType, setUserType] = useState(mockUser.isServiceProvider ? "provider" : "client");
  const { toast } = useToast();
  
  // Function to handle accepting a service request
  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Orçamento enviado",
      description: "Seu orçamento foi enviado ao cliente com sucesso.",
    });
  };
  
  // Function to handle declining a service request
  const handleDeclineRequest = (requestId: string) => {
    toast({
      title: "Serviço recusado",
      description: "Você recusou esta solicitação de serviço.",
    });
  };
  
  // Function to handle sending quote for service
  const handleSendQuote = (requestId: string, price: number) => {
    toast({
      title: "Orçamento enviado",
      description: `Você enviou um orçamento de R$${price.toFixed(2)} para o cliente.`,
    });
  };
  
  // Function to handle requesting a service from provider
  const handleRequestService = (providerId: string) => {
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de orçamento foi enviada ao prestador.",
    });
  };

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

  const renderClientDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Serviços Solicitados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockServiceRequests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockServiceRequests.filter(req => req.status === "accepted").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockServiceRequests.filter(req => req.status === "done").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Seus Serviços</h2>
          
          <div className="space-y-4">
            {mockServiceRequests.map((request) => (
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
                        {formatDate(request.scheduledDate)}
                      </div>
                      {request.estimatedPrice && (
                        <div className="font-medium">
                          R$ {request.estimatedPrice.toFixed(2)}
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
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Prestadores Recomendados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockServiceProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      {provider.isVerified && (
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
                      <span className="font-medium">R$ {provider.ratePerHour}/hora</span>
                      <Button 
                        size="sm" 
                        className="bg-chamaai-blue hover:bg-chamaai-lightblue"
                        onClick={() => handleRequestService(provider.id)}
                      >
                        Solicitar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderProviderDashboard = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Novas Solicitações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockServiceRequests.filter(req => req.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Aceitos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockServiceRequests.filter(req => req.status === "accepted").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockServiceRequests.filter(req => req.status === "done").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="text-3xl font-bold mr-1">{mockUser.serviceProvider?.rating}</div>
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Solicitações de Serviço</h2>
          
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="accepted">Aceitos</TabsTrigger>
              <TabsTrigger value="done">Concluídos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <div className="space-y-4">
                {mockServiceRequests
                  .filter(req => req.status === "pending")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {request.clientName}
                            </CardDescription>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(request.scheduledDate)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{request.description}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <div className="text-sm text-gray-500">
                          Solicitado em {formatDate(request.createdAt)}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center gap-1"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            <XCircle className="w-4 h-4" />
                            Recusar
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-chamaai-blue hover:bg-chamaai-lightblue flex items-center gap-1"
                            onClick={() => handleSendQuote(request.id, 200)}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Enviar Orçamento
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                  
                {mockServiceRequests.filter(req => req.status === "pending").length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <p className="text-gray-500">Não há solicitações pendentes no momento.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="accepted">
              <div className="space-y-4">
                {mockServiceRequests
                  .filter(req => req.status === "accepted")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {request.clientName}
                            </CardDescription>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(request.scheduledDate)}
                            </div>
                            <div className="font-medium text-right">
                              R$ {request.estimatedPrice?.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{request.description}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <div className="text-sm text-gray-500">
                          Aceito em {formatDate(request.createdAt)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            Mensagem
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Marcar como Concluído
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                  
                {mockServiceRequests.filter(req => req.status === "accepted").length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <p className="text-gray-500">Não há serviços aceitos no momento.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="done">
              <div className="space-y-4">
                {mockServiceRequests
                  .filter(req => req.status === "done")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{request.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {request.clientName}
                            </CardDescription>
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(request.scheduledDate)}
                            </div>
                            <div className="font-medium text-right">
                              R$ {request.estimatedPrice?.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{request.description}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <div className="text-sm text-gray-500">
                          Concluído em {formatDate(request.createdAt)}
                        </div>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          Ver Detalhes
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                {mockServiceRequests.filter(req => req.status === "done").length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <p className="text-gray-500">Não há serviços concluídos no momento.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Bem-vindo, {mockUser.fullName}!
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-1">
              <User size={18} />
              <span>Meu Perfil</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Settings size={18} />
              <span>Configurações</span>
            </Button>
          </div>
        </div>
        
        {mockUser.isServiceProvider && (
          <Tabs defaultValue={userType} value={userType} onValueChange={setUserType}>
            <TabsList className="mb-8">
              <TabsTrigger value="provider" className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                Prestador
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Cliente
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="provider">
              {renderProviderDashboard()}
            </TabsContent>
            
            <TabsContent value="client">
              {renderClientDashboard()}
            </TabsContent>
          </Tabs>
        )}
        
        {!mockUser.isServiceProvider && renderClientDashboard()}
      </div>
    </Layout>
  );
};

export default Dashboard;
