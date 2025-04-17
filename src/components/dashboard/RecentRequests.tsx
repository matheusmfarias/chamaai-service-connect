
import { Eye, Star, Clock, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServiceRequests, ServiceRequest } from "@/hooks/useServiceRequests";
import { Link } from "react-router-dom";

const RequestCard = ({ request }: { request: ServiceRequest }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Aguardando resposta
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aceito
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <Award className="w-3 h-3 mr-1" />
            Concluído
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
            <Badge variant="secondary" className="mb-2">
              {request.category}
            </Badge>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">
          {request.status === "pending" ? "Aguardando prestador" : "Nome do Prestador"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/solicitacao/${request.id}`}>
            <Eye className="w-4 h-4 mr-2" />
            Ver detalhes
          </Link>
        </Button>
        {request.status === "completed" && (
          <Button size="sm" className="bg-chamaai-blue hover:bg-chamaai-lightblue">
            <Star className="w-4 h-4 mr-2" />
            Avaliar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const RecentRequests = () => {
  const { requests, isLoading } = useServiceRequests();

  if (isLoading) {
    return <div className="animate-pulse">Carregando solicitações...</div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Minhas Solicitações Recentes</h2>
        <Button asChild className="bg-chamaai-blue hover:bg-chamaai-lightblue">
          <Link to="/solicitar-servico">Nova Solicitação</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <Card className="col-span-full p-6 text-center">
            <p className="text-gray-500 mb-4">
              Você ainda não tem solicitações de serviço.
            </p>
            <Button asChild className="bg-chamaai-blue hover:bg-chamaai-lightblue">
              <Link to="/solicitar-servico">Solicitar Serviço</Link>
            </Button>
          </Card>
        )}
      </div>
    </section>
  );
};

export default RecentRequests;
