import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AuthContextType, UserSignUpData, User, Session, ServiceProviderData, UserProfile } from "./types/auth";
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

// Mock users for development - one client and one provider
const mockUsers: Record<string, User> = {
  "client-user": {
    id: "client-user",
    email: "client@example.com",
    user_metadata: {
      full_name: "Cliente Exemplo"
    },
    app_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString()
  },
  "provider-user": {
    id: "provider-user",
    email: "provider@example.com",
    user_metadata: {
      full_name: "Prestador Exemplo"
    },
    app_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString()
  }
};

// Mock sessions for development
const mockSessions: Record<string, Session> = {
  "client-user": {
    access_token: "mock-token-client",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "mock-refresh-token-client",
    user: mockUsers["client-user"]
  },
  "provider-user": {
    access_token: "mock-token-provider",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "mock-refresh-token-provider",
    user: mockUsers["provider-user"]
  }
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
    // Simulate initial auth check - no auto login in development
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const signUp = async (email: string, password: string, userData: UserSignUpData) => {
    try {
      setIsLoading(true);
      
      // Simulate signup delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userId = userData.user_type === 'prestador' ? 'provider-user' : 'client-user';
      
      // Simulate successful signup
      setUser(mockUsers[userId]);
      setSession(mockSessions[userId]);
      
      // Set user profile based on signup data
      const newProfile: UserProfile = {
        id: userId,
        full_name: userData.full_name,
        phone: userData.phone || null,
        city: userData.city || null, 
        state: userData.state || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_type: userData.user_type || 'cliente'
      };
      
      setUserProfile(newProfile);
      
      // If user is signing up as a service provider
      if (userData.user_type === 'prestador' && userData.category && userData.description && userData.rate_per_hour) {
        await createServiceProvider({
          category: userData.category,
          description: userData.description,
          rate_per_hour: userData.rate_per_hour
        });
        setIsServiceProvider(true);
      } else {
        setIsServiceProvider(false);
      }

      // Simulate email verification (in real app, this would be done via email)
      await new Promise(resolve => setTimeout(resolve, 500));

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

      // In mock mode, we'll determine the user type based on email
      let userId = 'client-user'; // default
      if (email.includes('prestador') || email.includes('provider')) {
        userId = 'provider-user';
      }

      // Set user and session
      setUser(mockUsers[userId]);
      setSession(mockSessions[userId]);
      
      // Fetch user profile
      await fetchUserProfile(userId);
      
      // Check if user is a service provider
      const isProvider = await checkIsServiceProvider();
      setIsServiceProvider(isProvider);

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
      await new Promise(resolve => setTimeout(resolve, 500));

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
