import { useState } from "react";
import SearchSection from "@/components/dashboard/SearchSection";
import RecentRequests from "@/components/dashboard/RecentRequests";
import { useAuth } from "@/contexts/AuthContext";
import RecommendedProviders from "@/components/dashboard/RecommendedProviders";
import SupportSection from "@/components/dashboard/SupportSection";
import ServiceRequestModal from "@/components/dashboard/ServiceRequestModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ClientDashboard = () => {
  const { userProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstName = userProfile?.full_name?.split(' ')[0] || 'Usuário';

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          Olá, {firstName}!
        </h1>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-chamaai-blue hover:bg-chamaai-lightblue flex items-center gap-2"
        >
          <Plus size={18} />
          Nova Solicitação
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          <SearchSection />
          <RecentRequests />
        </div>
        
        <div className="space-y-6">
          <SupportSection />
          <RecommendedProviders />
        </div>
      </div>

      <ServiceRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ClientDashboard;
