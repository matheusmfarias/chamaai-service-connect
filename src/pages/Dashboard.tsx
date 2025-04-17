
// Arquivo legado - uso redirecionado para o novo componente Dashboard
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return null;
};

export default Dashboard;
