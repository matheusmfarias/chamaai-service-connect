
import { useEffect } from "react";
import SearchSection from "@/components/dashboard/SearchSection";
import RecentRequests from "@/components/dashboard/RecentRequests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ClientDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não está carregando e não tem usuário, redireciona para login
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="container-custom py-8 space-y-8">
      <SearchSection />
      <RecentRequests />
    </div>
  );
};

export default ClientDashboard;
