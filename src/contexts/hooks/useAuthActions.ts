
import { useToast } from "@/hooks/use-toast";
import { UserSignUpData } from "../types/auth";

export const useAuthActions = (
  handleAuth: (userId: string) => void,
  handleSignOut: () => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData: UserSignUpData) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userId = userData.user_type === 'prestador' ? 'provider-user' : 'client-user';
      handleAuth(userId);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Você foi automaticamente conectado.",
      });

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let userId = 'client-user';
      if (email.includes('prestador') || email.includes('provider')) {
        userId = 'provider-user';
      }
      
      handleAuth(userId);

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });

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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      handleSignOut();

      toast({
        title: "Desconectado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });

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
