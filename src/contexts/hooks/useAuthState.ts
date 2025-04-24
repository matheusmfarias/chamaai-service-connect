
import { useState, useCallback } from "react";
import { User, Session } from "../types/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setSession(null);
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
  }, [toast, navigate]);

  const handleAuthChange = useCallback((currentSession: Session | null) => {
    setSession(currentSession);
    setUser(currentSession?.user || null);
    setIsLoading(false);
  }, []);
  
  const restoreSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (data?.session) {
        handleAuthChange(data.session);
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error restoring session:", error);
      setIsLoading(false);
    }
  }, [handleAuthChange]);

  return {
    user,
    session,
    isLoading,
    setIsLoading,
    handleAuthChange,
    handleSignOut,
    restoreSession,
    toast,
    navigate
  };
};
