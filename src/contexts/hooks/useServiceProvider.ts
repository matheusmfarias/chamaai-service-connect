
import { useState } from "react";
import { ServiceProviderData } from "../types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useServiceProvider = () => {
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const { toast } = useToast();

  const checkServiceProviderStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("service_providers")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao verificar status de prestador:", error);
        return;
      }

      setIsServiceProvider(!!data);
      return !!data;
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
    }
  };

  const createServiceProvider = async (data: ServiceProviderData) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) return;

    try {
      const { error } = await supabase
        .from("service_providers")
        .insert({
          id: session.session.user.id,
          category: data.category,
          description: data.description,
          rate_per_hour: data.rate_per_hour,
        });

      if (error) {
        toast({
          title: "Erro ao criar perfil de prestador",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setIsServiceProvider(true);

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
    }
  };

  const checkIsServiceProvider = async (): Promise<boolean> => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) return false;
    
    try {
      const { data, error } = await supabase
        .from("service_providers")
        .select("id")
        .eq("id", session.session.user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao verificar status de prestador:", error);
        return false;
      }

      setIsServiceProvider(!!data);
      return !!data;
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
      return false;
    }
  };

  return {
    isServiceProvider,
    setIsServiceProvider,
    checkServiceProviderStatus,
    createServiceProvider,
    checkIsServiceProvider,
  };
};
