
import { useState, useCallback } from "react";
import { UserProfile } from "../types/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      if (data) {
        setUserProfile(data as UserProfile);
        return data as UserProfile;
      } else {
        console.log("Profile not found for user:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    const userId = userProfile?.id;
    if (!userId) return null;

    try {
      const { data: updatedData, error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      
      const updatedProfile = updatedData as UserProfile;
      setUserProfile(updatedProfile);

      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
      });
      
      return updatedProfile;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return null;
    }
  }, [userProfile?.id, toast]);

  return {
    userProfile,
    setUserProfile,
    fetchUserProfile,
    updateProfile,
  };
};
