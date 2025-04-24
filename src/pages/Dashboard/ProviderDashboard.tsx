
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProviderPublicRequests from './ProviderPublicRequests';

const ProviderDashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const firstName = userProfile?.full_name?.split(' ')[0] || 'Prestador';

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-8">
        Olá, {firstName}!
      </h1>
      
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList className="flex mb-6 border-b">
          <Tab 
            className={`px-4 py-2 cursor-pointer ${activeTab === 0 ? 'border-b-2 border-chamaai-blue font-medium text-chamaai-blue' : 'text-gray-500'}`}
          >
            Solicitações Públicas
          </Tab>
          <Tab 
            className={`px-4 py-2 cursor-pointer ${activeTab === 1 ? 'border-b-2 border-chamaai-blue font-medium text-chamaai-blue' : 'text-gray-500'}`}
          >
            Minhas Propostas
          </Tab>
          <Tab 
            className={`px-4 py-2 cursor-pointer ${activeTab === 2 ? 'border-b-2 border-chamaai-blue font-medium text-chamaai-blue' : 'text-gray-500'}`}
          >
            Serviços em Andamento
          </Tab>
        </TabList>

        <TabPanel>
          <ProviderPublicRequests />
        </TabPanel>

        <TabPanel>
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-500">Suas propostas aparecerão aqui</h3>
            <p className="text-gray-400 mt-2">Você ainda não enviou nenhuma proposta</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-500">Serviços em andamento aparecerão aqui</h3>
            <p className="text-gray-400 mt-2">Você não tem nenhum serviço em andamento</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProviderDashboard;
