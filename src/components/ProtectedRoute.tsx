
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresServiceProvider?: boolean;
}

const ProtectedRoute = ({ children, requiresServiceProvider = false }: ProtectedRouteProps) => {
  const { user, isLoading, isServiceProvider } = useAuth();
  const location = useLocation();
  
  // Se estiver carregando, mostra um spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-chamaai-blue" />
        <span className="ml-2 text-lg text-chamaai-blue">Carregando...</span>
      </div>
    );
  }
  
  // Se não estiver autenticado, redireciona para login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  // Se a rota requer ser prestador e o usuário não é prestador, redireciona
  if (requiresServiceProvider && !isServiceProvider) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
