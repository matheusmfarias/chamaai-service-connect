
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./Dashboard/ClientDashboard";
import ProviderDashboard from "./Dashboard/ProviderDashboard";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading, checkIsServiceProvider } = useAuth();
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      try {
        const isProvider = await checkIsServiceProvider();
        console.log("User is service provider:", isProvider);
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
        Carregando...
      </div>
    );
  }

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return null; // não renderiza nada enquanto redireciona
  }

  return (
    <Layout>
      <ClientDashboard />
    </Layout>
  );
};

export default Dashboard;
