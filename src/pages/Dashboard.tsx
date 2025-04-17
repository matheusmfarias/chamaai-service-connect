
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redireciona para o dashboard apropriado
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="flex justify-center items-center h-screen">
      Redirecionando...
    </div>
  );
};

export default Dashboard;
