import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import RecentRequests from "./RecentRequests";
import ServiceCategories from "./ServiceCategories";

const ClientDashboardHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-custom py-8 space-y-8">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Precisa de ajuda com o quê?
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Ex: preciso trocar a tomada da cozinha"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 text-lg"
            />
            <Button 
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <ServiceCategories />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Minhas Solicitações Recentes
          </h2>
          <RecentRequests />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboardHome;
