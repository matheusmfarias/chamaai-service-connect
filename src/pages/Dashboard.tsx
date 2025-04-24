
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./Dashboard/ClientDashboard";
import ProviderDashboard from "./Dashboard/ProviderDashboard";
import Layout from "@/components/Layout";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile, isLoading, isServiceProvider, checkIsServiceProvider } = useAuth();
  
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      try {
        if (userProfile) {
          console.log("User profile loaded:", userProfile);
          
          // Check if user is a service provider
          await checkIsServiceProvider();
          
          // Redirect based on user type
          const userType = userProfile.user_type;
          console.log("User type:", userType);
          
          if (userType === 'prestador' || userType === 'provider') {
            console.log("User is a service provider, staying on dashboard");
          } else if (userType === 'cliente' || userType === 'client') {
            console.log("User is a client, staying on dashboard");
          } else {
            console.log("Unknown user type:", userType);
          }
        } else {
          console.log("User profile not loaded yet");
        }
      } catch (error) {
        console.error("Error checking user type:", error);
      }
    };
    
    if (!isLoading && user) {
      checkUserType();
    }
  }, [user, userProfile, isLoading, navigate, checkIsServiceProvider]);

  // Mostrar loading enquanto verifica o status
  if (isLoading || !userProfile) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-chamaai-blue mx-auto mb-4" />
            <p>Carregando seu dashboard...</p>
          </div>
        </div>
      </Layout>
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
