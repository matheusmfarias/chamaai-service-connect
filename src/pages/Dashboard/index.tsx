
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClientDashboardHome from "./Home";
import ProviderDashboard from "./ProviderDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isServiceProvider } = useAuth();

  useEffect(() => {
    // Redirect legacy routes
    if (window.location.pathname === "/Dashboard") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return isServiceProvider ? <ProviderDashboard /> : <ClientDashboardHome />;
};

export default Dashboard;
