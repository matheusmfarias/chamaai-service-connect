
import { useToast } from "@/hooks/use-toast";
import { UserSignUpData } from "../types/auth";
import { supabase } from "@/integrations/supabase";

export const useAuthActions = (
  handleAuthChange: (session: any) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData: UserSignUpData) => {
    try {
      setIsLoading(true);
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type || 'cliente'
          }
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: userData.full_name,
            phone: userData.phone || null,
            city: userData.city || null,
            state: userData.state || null,
            user_type: userData.user_type || 'cliente',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (profileError) throw profileError;

        if (data.session) {
          handleAuthChange(data.session);
        }
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Você foi automaticamente conectado.",
        });
      }
    } catch (error: any) {
      let message = error.message;
      
      // More user-friendly error messages
      if (error.message.includes("already registered")) {
        message = "Este e-mail já está cadastrado.";
      }
      
      toast({
        title: "Erro ao criar conta",
        description: message || "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde.",
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
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        handleAuthChange(data.session);
        
        // We'll fetch the profile and redirect in the AuthContext
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
        });
      }
    } catch (error: any) {
      let message = error.message;
      
      // More user-friendly error messages
      if (error.message.includes("Invalid login")) {
        message = "E-mail ou senha incorretos.";
      }
      
      toast({
        title: "Erro ao fazer login",
        description: message || "Ocorreu um erro ao fazer login. Tente novamente mais tarde.",
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
      
      if (error) throw error;

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

  return {
    signUp,
    signIn,
    signOut
  };
};
