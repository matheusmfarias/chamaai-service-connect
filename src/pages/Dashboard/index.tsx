
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./ClientDashboard";
import ProviderDashboard from "./ProviderDashboard";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isServiceProvider } = useAuth();

  useEffect(() => {
    // Redirect legacy routes
    if (window.location.pathname === "/Dashboard") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      {isServiceProvider ? <ProviderDashboard /> : <ClientDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
