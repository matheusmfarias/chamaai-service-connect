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
import { useServiceProvider } from "@/hooks/useServiceProviders";
import { useReviews, Review } from "@/hooks/useReviews";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface CreateReviewParams {
  rating: number;
  comment: string;
  providerId: string;
  onSuccess: () => void;
}

const CreateReviewForm = ({ rating, comment, providerId, onSuccess }: CreateReviewParams) => {
  const [reviewComment, setReviewComment] = useState(comment);
  const [reviewRating, setReviewRating] = useState(rating);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createReview } = useReviews(providerId);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (reviewRating < 1) {
      toast({
        title: "Avaliação inválida",
        description: "Por favor, selecione uma classificação de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    createReview({
      service_provider_id: providerId,
      rating: reviewRating,
      comment: reviewComment,
    });
    
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 font-medium">Sua avaliação</div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star 
              key={value}
              className={`w-8 h-8 cursor-pointer ${
                value <= reviewRating ? "fill-amber-500 text-amber-500" : "text-gray-300"
              }`}
              onClick={() => setReviewRating(value)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block mb-2 font-medium">
          Comentário (opcional)
        </label>
        <Textarea
          id="comment"
          placeholder="Compartilhe sua experiência com este prestador..."
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </div>
  );
};

const ReviewItem = ({ review }: { review: Review }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
  };

  return (
    <div className="border-b pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-start">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarFallback>{review.profiles.full_name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{review.profiles.full_name}</h4>
            <span className="text-sm text-gray-500">
              {formatDate(review.created_at)}
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
          {review.comment && <p className="text-gray-700 mt-1">{review.comment}</p>}
        </div>
      </div>
    </div>
  );
};

const PerfilPrestador = () => {
  const { id } = useParams<{id: string}>();
  const { toast } = useToast();
  const { provider, isLoading: isProviderLoading } = useServiceProvider(id || "");
  const { reviews, isLoading: areReviewsLoading } = useReviews(id);
  const { user, userProfile } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleContactProvider = () => {
    toast({
      title: "Mensagem enviada",
      description: `Sua mensagem foi enviada para ${provider?.profiles.full_name}. Aguarde o retorno.`,
    });
  };
  
  const handleRequestService = () => {
    window.location.href = "/solicitar-servico";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
  };

  if (isProviderLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chamaai-blue mx-auto"></div>
              <p className="text-gray-600">Carregando informações do prestador...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!provider) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Prestador não encontrado</h2>
            <p className="text-gray-600 mb-6">O prestador que você está procurando não foi encontrado.</p>
            <Button onClick={() => window.history.back()}>Voltar</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getCategoryName = (categoryId: string) => {
    const categories: {[key: string]: string} = {
      "faxina": "Faxina",
      "pintura": "Pintura",
      "eletrica": "Elétrica",
      "hidraulica": "Hidráulica",
      "reforma": "Reforma",
      "jardinagem": "Jardinagem"
    };
    
    return categories[categoryId] || categoryId;
  };

  const formatJoinedDate = () => {
    const date = new Date(provider.created_at);
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
    return `${month} ${date.getFullYear()}`;
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarFallback>{provider.profiles.full_name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold mb-1">{provider.profiles.full_name}</h1>
                  
                  <div className="flex items-center mb-2">
                    <Badge className="bg-chamaai-blue hover:bg-chamaai-lightblue">
                      {getCategoryName(provider.category)}
                    </Badge>
                    {provider.is_verified && (
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        Verificado
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-amber-500 mb-4">
                    <Star className="w-5 h-5 fill-amber-500" />
                    <span className="ml-1 font-medium">{provider.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({provider.total_reviews} avaliações)</span>
                  </div>
                  
                  <div className="space-y-3 w-full mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{provider.profiles.city || 'Não informado'}, {provider.profiles.state || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Responde em {provider.response_time || '24 horas'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{provider.services_completed} serviços realizados</span>
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
                  
                  {user && user.id !== provider.id && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="mt-4 text-chamaai-blue hover:text-chamaai-lightblue hover:bg-transparent p-0 h-auto"
                        >
                          Avaliar prestador
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Avaliar {provider.profiles.full_name}</DialogTitle>
                          <DialogDescription>
                            Compartilhe sua experiência com este prestador de serviços para ajudar outros usuários.
                          </DialogDescription>
                        </DialogHeader>
                        <CreateReviewForm 
                          rating={3} 
                          comment="" 
                          providerId={provider.id}
                          onSuccess={() => setDialogOpen(false)} 
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  {provider.profiles.phone && (
                    <div className="mt-6 border-t pt-4 w-full">
                      <h3 className="font-semibold mb-2 text-left">Informações de Contato</h3>
                      <div className="space-y-2 text-left">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{provider.profiles.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="w-full text-left text-sm text-gray-500 mt-4">
                    <p>Membro desde {formatJoinedDate()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
                <CardDescription>
                  Informações sobre o prestador e seus serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {provider.description || "Este prestador ainda não adicionou uma descrição."}
                </p>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-wrap justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-semibold mb-2">Taxa Horária</h3>
                      <p className="text-xl font-medium text-chamaai-blue">
                        R$ {provider.rate_per_hour.toFixed(2)}<span className="text-sm text-gray-600">/hora</span>
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
            
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Avaliações</CardTitle>
                  <CardDescription>
                    O que os clientes estão dizendo sobre {provider.profiles.full_name}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <span className="ml-1 font-medium">{provider.rating}</span>
                  <span className="text-gray-600 text-sm ml-1">({provider.total_reviews})</span>
                </div>
              </CardHeader>
              <CardContent>
                {areReviewsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-chamaai-blue mx-auto"></div>
                    <p className="text-gray-600 mt-2">Carregando avaliações...</p>
                  </div>
                ) : reviews && reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.slice(0, 3).map((review) => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Este prestador ainda não tem avaliações.</p>
                  </div>
                )}
                
                {reviews && reviews.length > 3 && (
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
