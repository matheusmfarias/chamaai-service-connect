
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userProfile: UserProfile | null;
  isServiceProvider: boolean;
  signUp: (email: string, password: string, userData: UserSignUpData, isProvider: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  createServiceProvider: (data: ServiceProviderData) => Promise<void>;
  checkIsServiceProvider: () => Promise<boolean>;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  provider_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSignUpData {
  full_name: string;
  phone?: string;
  city?: string;
  state?: string;
  provider_type?: string;
}

export interface ServiceProviderData {
  category: string;
  description: string;
  rate_per_hour: number;
}

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isServiceProvider, setIsServiceProvider] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          setUserProfile(null);
          setIsServiceProvider(false);
        } else {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
            checkServiceProviderStatus(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (session?.user) {
        fetchUserProfile(session.user.id);
        checkServiceProviderStatus(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        return;
      }

      console.log("Perfil do usuário carregado:", data);
      setUserProfile(data);
      
      // Check if user is a service provider based on provider_type
      if (data.provider_type === 'service_provider') {
        setIsServiceProvider(true);
      } else {
        // Double check by querying the service_providers table
        checkServiceProviderStatus(userId);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  const checkServiceProviderStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("service_providers")
        .select("id, category")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao verificar status de prestador:", error);
        return;
      }

      console.log("Status de prestador verificado:", !!data);
      setIsServiceProvider(!!data);
      
      // If user is a service provider but provider_type is not set, update it
      if (!!data && userProfile && userProfile.provider_type !== 'service_provider') {
        await supabase
          .from("profiles")
          .update({
            provider_type: 'service_provider',
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
        
        // Update local userProfile state
        setUserProfile({
          ...userProfile,
          provider_type: 'service_provider'
        });
      }
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
    }
  };

  const signUp = async (email: string, password: string, userData: UserSignUpData, isProvider: boolean = false) => {
    try {
      setIsLoading(true);
      
      // Set provider_type based on registration choice
      const providerType = isProvider ? 'service_provider' : 'client';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone || null,
            city: userData.city || null,
            state: userData.state || null,
            provider_type: providerType
          }
        }
      });

      if (error) {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

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
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

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

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        toast({
          title: "Erro ao atualizar perfil",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (userProfile) {
        setUserProfile({
          ...userProfile,
          ...data,
        });
      }

      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createServiceProvider = async (data: ServiceProviderData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      const searchTags = [
        data.category.toLowerCase(),
        ...data.description.toLowerCase().split(' ')
      ].filter(tag => tag.length > 3);

      console.log("Criando perfil de prestador com tags:", searchTags);
      
      // Update the user's provider_type in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          provider_type: 'service_provider',
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (profileError) {
        console.error("Erro ao atualizar perfil como prestador:", profileError);
        toast({
          title: "Erro ao atualizar perfil",
          description: profileError.message,
          variant: "destructive",
        });
        return;
      }

      // Create service provider entry
      const { error } = await supabase
        .from("service_providers")
        .insert({
          id: user.id,
          category: data.category,
          description: data.description,
          rate_per_hour: data.rate_per_hour,
          search_tags: searchTags
        });

      if (error) {
        console.error("Erro ao criar perfil de prestador:", error);
        toast({
          title: "Erro ao criar perfil de prestador",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Update local state
      setIsServiceProvider(true);
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          provider_type: 'service_provider'
        });
      }

      toast({
        title: "Perfil de prestador criado",
        description: "Seu perfil de prestador foi criado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao criar perfil de prestador",
        description: error.message || "Ocorreu um erro ao criar seu perfil de prestador. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsServiceProvider = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // First check profile's provider_type
      if (userProfile && userProfile.provider_type === 'service_provider') {
        return true;
      }
      
      // Double-check in the service_providers table
      const { data, error } = await supabase
        .from("service_providers")
        .select("id, category")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao verificar status de prestador:", error);
        return false;
      }

      const isProvider = !!data;
      setIsServiceProvider(isProvider);
      return isProvider;
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
      return false;
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
