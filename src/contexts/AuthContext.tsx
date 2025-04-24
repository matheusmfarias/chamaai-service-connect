
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AuthContextType, UserSignUpData, User, Session } from "./types/auth";
import { useProfile } from "./hooks/useProfile";
import { useServiceProvider } from "./hooks/useServiceProvider";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user for development
const mockUser: User = {
  id: "mock-user-1",
  email: "user@example.com",
  user_metadata: {
    full_name: "Mock User"
  },
  app_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString()
};

// Mock session for development
const mockSession: Session = {
  access_token: "mock-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "mock-refresh-token",
  user: mockUser
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { userProfile, setUserProfile, fetchUserProfile, updateProfile } = useProfile();
  const { isServiceProvider, setIsServiceProvider, checkServiceProviderStatus, createServiceProvider, checkIsServiceProvider } = useServiceProvider();

  useEffect(() => {
    // Simulate initial auth check
    setTimeout(() => {
      setUser(mockUser);
      setSession(mockSession);
      setIsLoading(false);
    }, 1000);
  }, []);

  const signUp = async (email: string, password: string, userData: UserSignUpData) => {
    try {
      setIsLoading(true);
      
      // Simulate signup delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful signup
      setUser(mockUser);
      setSession(mockSession);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Você foi automaticamente conectado.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate signin delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful signin
      setUser(mockUser);
      setSession(mockSession);

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro ao fazer login. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Simulate signout delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(null);
      setSession(null);
      setUserProfile(null);
      setIsServiceProvider(false);

      toast({
        title: "Desconectado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao sair. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    userProfile,
    isServiceProvider,
    signUp,
    signIn,
    signOut,
    updateProfile,
    createServiceProvider,
    checkIsServiceProvider
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
