
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ClientDashboard from "./ClientDashboard";
import ProviderDashboard from "./ProviderDashboard";

const Dashboard = () => {
  const [userType, setUserType] = useState<string>("client");
  const { user, isServiceProvider, checkIsServiceProvider } = useAuth();
  
  useEffect(() => {
    if (user) {
      const checkProviderStatus = async () => {
        const isProvider = await checkIsServiceProvider();
        setUserType(isProvider ? "provider" : "client");
      };
      
      checkProviderStatus();
    }
  }, [user, checkIsServiceProvider]);

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Bem-vindo!
            </p>
          </div>
        </div>
        
        {isServiceProvider ? (
          <Tabs defaultValue={userType} value={userType} onValueChange={setUserType}>
            <TabsList className="mb-8">
              <TabsTrigger value="provider">
                Prestador
              </TabsTrigger>
              <TabsTrigger value="client">
                Cliente
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="provider">
              <ProviderDashboard />
            </TabsContent>
            
            <TabsContent value="client">
              <ClientDashboard />
            </TabsContent>
          </Tabs>
        ) : (
          <ClientDashboard />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
