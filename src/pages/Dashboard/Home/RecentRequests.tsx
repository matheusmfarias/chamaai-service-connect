
import { useNavigate } from "react-router-dom";
import { Star, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServiceRequests } from "@/hooks/useServiceRequests";

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "accepted":
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
    case "done":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "rated":
      return <Star className="h-5 w-5 text-amber-500" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    pending: { label: "Aguardando resposta", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
    accepted: { label: "Aceito", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    done: { label: "Concluído", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    rated: { label: "Avaliado", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

const RecentRequests = () => {
  const navigate = useNavigate();
  const { requests, isLoading } = useServiceRequests();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    );
  }

  if (!requests?.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500 mb-4">Você ainda não tem solicitações</p>
        <Button 
          onClick={() => navigate("/solicitar-servico")}
          className="bg-chamaai-blue hover:bg-chamaai-lightblue"
        >
          Solicitar Serviço
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <Card 
          key={request.id}
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate(`/solicitacao/${request.id}`)}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg mb-1">{request.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{request.category}</p>
              </div>
              <StatusIcon status={request.status} />
            </div>
            <StatusBadge status={request.status} />
          </CardContent>
          
          <CardFooter className="border-t pt-4 flex justify-between">
            {request.status === "done" && !request.is_rated && (
              <Button
                size="sm"
                className="bg-chamaai-blue hover:bg-chamaai-lightblue"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/avaliar/${request.id}`);
                }}
              >
                <Star className="w-4 h-4 mr-1" />
                Avaliar
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/solicitacao/${request.id}`);
              }}
            >
              Ver detalhes
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecentRequests;
