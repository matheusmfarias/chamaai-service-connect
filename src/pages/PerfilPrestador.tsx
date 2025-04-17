
import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  MessageCircle
} from "lucide-react";
import Layout from "@/components/Layout";

// Mock data for the service provider
const mockProvider = {
  id: "1",
  name: "João Pereira",
  avatar: "https://i.pravatar.cc/300?u=1",
  email: "joao.pereira@example.com",
  phone: "(11) 98765-4321",
  city: "São Paulo",
  state: "SP",
  category: "pintura",
  categoryName: "Pintura",
  ratePerHour: 50,
  rating: 4.8,
  totalReviews: 47,
  isVerified: true,
  description: "Pintor profissional com mais de 10 anos de experiência em pinturas residenciais e comerciais. Especializado em técnicas de acabamento, texturização e efeitos especiais. Trabalho com tintas acrílicas, látex e esmaltes. Atendimento personalizado, orçamento sem compromisso e garantia de satisfação.",
  servicesCompleted: 124,
  responseTime: "2 horas",
  joinedDate: "Janeiro 2022"
};

// Mock data for reviews
const mockReviews = [
  {
    id: "1",
    reviewer: "Maria Silva",
    avatar: "https://i.pravatar.cc/150?u=5",
    rating: 5,
    date: "2025-03-15T10:30:00Z",
    comment: "Excelente trabalho! O João foi muito profissional e atencioso. Pintou minha sala e corredor em um dia, com um acabamento perfeito. Recomendo demais!"
  },
  {
    id: "2",
    reviewer: "Carlos Santos",
    avatar: "https://i.pravatar.cc/150?u=6",
    rating: 5,
    date: "2025-02-28T14:45:00Z",
    comment: "Contratei o João para pintar meu apartamento e fiquei muito satisfeito. Ele foi pontual, organizado e o serviço ficou impecável. Certamente vou chamá-lo novamente."
  },
  {
    id: "3",
    reviewer: "Ana Oliveira",
    avatar: "https://i.pravatar.cc/150?u=7",
    rating: 4,
    date: "2025-02-10T09:15:00Z",
    comment: "Bom trabalho, mas demorou um pouco mais do que o combinado. O resultado final ficou ótimo e ele foi muito educado e prestativo."
  }
];

const PerfilPrestador = () => {
  const { id } = useParams();
  const { toast } = useToast();
  // In a real application, we would fetch the provider data based on the ID
  // For now, we'll just use our mock data
  const provider = mockProvider;
  
  const handleContactProvider = () => {
    toast({
      title: "Mensagem enviada",
      description: `Sua mensagem foi enviada para ${provider.name}. Aguarde o retorno.`,
    });
  };
  
  const handleRequestService = () => {
    // Redirect to service request page (would pass provider ID as parameter)
    window.location.href = "/solicitar-servico";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
  };

  if (!provider) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Provider Info Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold mb-1">{provider.name}</h1>
                  
                  <div className="flex items-center mb-2">
                    <Badge className="bg-chamaai-blue hover:bg-chamaai-lightblue">
                      {provider.categoryName}
                    </Badge>
                    {provider.isVerified && (
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        Verificado
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-amber-500 mb-4">
                    <Star className="w-5 h-5 fill-amber-500" />
                    <span className="ml-1 font-medium">{provider.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({provider.totalReviews} avaliações)</span>
                  </div>
                  
                  <div className="space-y-3 w-full mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{provider.city}, {provider.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Responde em {provider.responseTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{provider.servicesCompleted} serviços realizados</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Button 
                      className="bg-chamaai-blue hover:bg-chamaai-lightblue w-full flex items-center justify-center gap-2"
                      onClick={handleRequestService}
                    >
                      <Calendar className="w-4 h-4" />
                      Solicitar Orçamento
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleContactProvider}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Enviar Mensagem
                    </Button>
                  </div>
                  
                  <div className="mt-6 border-t pt-4 w-full">
                    <h3 className="font-semibold mb-2 text-left">Informações de Contato</h3>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{provider.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{provider.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full text-left text-sm text-gray-500 mt-4">
                    <p>Membro desde {provider.joinedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Provider Details and Reviews */}
          <div className="md:col-span-2">
            {/* About Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
                <CardDescription>
                  Informações sobre o prestador e seus serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {provider.description}
                </p>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-wrap justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-semibold mb-2">Taxa Horária</h3>
                      <p className="text-xl font-medium text-chamaai-blue">
                        R$ {provider.ratePerHour.toFixed(2)}<span className="text-sm text-gray-600">/hora</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Disponibilidade</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Disponível
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Reviews Section */}
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Avaliações</CardTitle>
                  <CardDescription>
                    O que os clientes estão dizendo sobre {provider.name}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="text-gray-600 text-sm ml-1">({provider.totalReviews})</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start">
                        <Avatar className="w-10 h-10 mr-3">
                          <AvatarImage src={review.avatar} alt={review.reviewer} />
                          <AvatarFallback>{review.reviewer.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{review.reviewer}</h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mt-1">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {mockReviews.length > 3 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline">Ver Todas as Avaliações</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PerfilPrestador;
