
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePublicServiceRequests } from '@/hooks/usePublicServiceRequests';
import ProposalForm from './ProposalForm';

interface PublicRequestsListProps {
  categoryFilter?: string;
}

export default function PublicRequestsList({ categoryFilter }: PublicRequestsListProps) {
  const { requests, isLoading } = usePublicServiceRequests({ 
    categoryId: categoryFilter 
  });
  
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-chamaai-blue" />
        <span className="ml-2 text-chamaai-blue">Carregando solicitações...</span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Não há solicitações públicas disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {requests.map((request) => (
        <Card key={request.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{request.title}</CardTitle>
                <CardDescription>
                  {request.profiles?.full_name} - {request.categories?.name || request.category}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">
                Nova
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="text-gray-700 whitespace-pre-line">{request.description}</p>
            
            {request.scheduled_date && (
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">
                  {format(new Date(request.scheduled_date), "PPP", { locale: ptBR })}
                </span>
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(request.scheduled_date), "HH:mm", { locale: ptBR })}
                </span>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-2">
            <Button
              onClick={() => setSelectedRequestId(request.id)}
              className="bg-chamaai-blue hover:bg-chamaai-lightblue"
            >
              Enviar Proposta
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {selectedRequestId && (
        <ProposalForm 
          requestId={selectedRequestId}
          isOpen={!!selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
        />
      )}
    </div>
  );
}
