
import { useState } from "react";
import { UserProfile } from "../types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao buscar perfil:", error);
        return;
      }

      if (data) {
        setUserProfile(data as UserProfile);
      } else {
        console.log("Perfil não encontrado para o usuário:", userId);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    const userId = userProfile?.id;
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

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
    }
  };

  return {
    userProfile,
    setUserProfile,
    fetchUserProfile,
    updateProfile,
  };
};
