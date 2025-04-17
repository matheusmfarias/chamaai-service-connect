
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./Dashboard/ClientDashboard";
import ProviderDashboard from "./Dashboard/ProviderDashboard";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, isServiceProvider, checkIsServiceProvider } = useAuth();
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      try {
        await checkIsServiceProvider();
      } catch (error) {
        console.error("Error checking if user is service provider:", error);
      }
    };
    
    if (!isLoading) {
      checkUserType();
    }
  }, [user, isLoading, navigate, checkIsServiceProvider]);

  // Mostrar loading enquanto verifica o status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-chamaai-blue mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return null; // não renderiza nada enquanto redireciona
  }

  return (
    <Layout>
      {isServiceProvider ? <ProviderDashboard /> : <ClientDashboard />}
    </Layout>
  );
};

export default Dashboard;
