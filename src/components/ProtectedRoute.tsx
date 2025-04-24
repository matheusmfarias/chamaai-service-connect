
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
  
  // Show loading spinner while auth state is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-chamaai-blue mx-auto" />
          <span className="mt-2 text-lg text-chamaai-blue">Verificando autenticação...</span>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  // If the route requires the user to be a service provider and they're not, redirect
  if (requiresServiceProvider && !isServiceProvider) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
