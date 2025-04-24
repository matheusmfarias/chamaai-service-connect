
import { useToast } from "@/hooks/use-toast";
import { UserSignUpData } from "../types/auth";
import { supabase } from "@/integrations/supabase";
import { useNavigate } from "react-router-dom";

export const useAuthActions = (
  handleAuthChange: (session: any) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData: UserSignUpData) => {
    try {
      setIsLoading(true);
      
      // Store email in localStorage for verification page
      localStorage.setItem('verification_email', email);
      
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type || 'cliente'
          },
          emailRedirectTo: `${window.location.origin}/verificar-email`
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
            email: email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (profileError) throw profileError;

        // Navigate to verification page
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Enviamos um link de verificação para o seu e-mail.",
        });
        
        navigate("/verificar-email");
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

      // Clear localStorage if signup fails
      localStorage.removeItem('verification_email');
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
        
        // Fetch user profile and redirect based on user type
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.session.user.id)
          .single();
        
        const redirectPath = profile?.user_type === 'prestador' 
          ? '/dashboard/prestador' 
          : '/dashboard/cliente';
        
        navigate(redirectPath);
        
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

  return {
    signUp,
    signIn
  };
};
