
import { Eye, Star, Clock, CheckCircle, Award, XCircle, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServiceRequests } from "@/hooks";
import { ServiceRequest } from "@/types/serviceRequest";
import { Link } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RequestCard = ({ request }: { request: ServiceRequest }) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "pending":
        return {
          badge: (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Aguardando resposta
            </Badge>
          ),
          color: "border-l-yellow-400",
          icon: <Clock className="text-yellow-500" />,
        };
      case "accepted":
        return {
          badge: (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Aceito
            </Badge>
          ),
          color: "border-l-blue-400",
          icon: <CheckCircle className="text-blue-500" />,
        };
      case "completed":
        return {
          badge: (
            <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
              <Award className="w-3 h-3" />
              Concluído
            </Badge>
          ),
          color: "border-l-green-400",
          icon: <Award className="text-green-500" />,
        };
      default:
        return {
          badge: (
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {status}
            </Badge>
          ),
          color: "border-l-gray-400",
          icon: <AlertCircle className="text-gray-500" />,
        };
    }
  };

  const statusDetails = getStatusDetails(request.status);

  return (
    <Card className={`hover:shadow-md transition-all border-l-4 ${statusDetails.color}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{request.title}</CardTitle>
            <Badge variant="secondary" className="mt-2 font-normal">
              {request.category}
            </Badge>
          </div>
          {statusDetails.badge}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          Solicitado em {new Date(request.created_at).toLocaleDateString('pt-BR')}
        </div>
        <p className="text-sm text-gray-600">
          {request.status === "pending" ? "Aguardando prestador" : "Nome do Prestador"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button variant="ghost" size="sm" asChild className="text-gray-600">
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
        {request.status === "pending" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                <XCircle className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar solicitação</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esta solicitação? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não, manter solicitação</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Sim, cancelar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

const RecentRequests = () => {
  const { requests, isLoading } = useServiceRequests();

  if (isLoading) {
    return (
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium mb-6">Minhas Solicitações</h2>
        <div className="animate-pulse text-center py-10">Carregando solicitações...</div>
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-medium mb-6">Minhas Solicitações</h2>

      <div className="grid grid-cols-1 gap-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <Card className="p-6 text-center">
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
