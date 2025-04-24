
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { usePublicServiceRequests } from '@/hooks/usePublicServiceRequests';
import PublicRequestsList from '@/components/dashboard/PublicRequestsList';

const ProviderDashboard = () => {
  const { userProfile } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Prestador';

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-8">
        Olá, {firstName}!
      </h1>
      
      <Tabs defaultValue="public">
        <TabsList className="w-full border-b flex">
          <TabsTrigger value="public" className="flex-1">
            Solicitações Públicas
          </TabsTrigger>
          <TabsTrigger value="proposals" className="flex-1">
            Minhas Propostas
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1">
            Serviços em Andamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Solicitações Públicas</h2>
            <PublicRequestsList categoryFilter={categoryFilter} />
          </div>
        </TabsContent>

        <TabsContent value="proposals">
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-500">Suas propostas aparecerão aqui</h3>
            <p className="text-gray-400 mt-2">Você ainda não enviou nenhuma proposta</p>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-500">Serviços em andamento aparecerão aqui</h3>
            <p className="text-gray-400 mt-2">Você não tem nenhum serviço em andamento</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDashboard;
