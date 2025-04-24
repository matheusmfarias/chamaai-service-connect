
import { useState } from "react";
import { UserProfile } from "../types/auth";
import { useToast } from "@/hooks/use-toast";

const mockProfiles: Record<string, UserProfile> = {
  "client-user": {
    id: "client-user",
    full_name: "Cliente Exemplo",
    phone: "(11) 99999-9999",
    city: "São Paulo",
    state: "SP",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    user_type: "cliente"
  },
  "provider-user": {
    id: "provider-user",
    full_name: "Prestador Exemplo",
    phone: "(11) 88888-8888",
    city: "Rio de Janeiro",
    state: "RJ",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    user_type: "prestador"
  }
};

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockProfile = mockProfiles[userId];
      if (mockProfile) {
        setUserProfile(mockProfile);
        return mockProfile;
      } else {
        console.log("Perfil não encontrado para o usuário:", userId);
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    const userId = userProfile?.id;
    if (!userId) return null;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedProfile = {
        ...mockProfiles[userId],
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      mockProfiles[userId] = updatedProfile;
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
  };

  return {
    userProfile,
    setUserProfile,
    fetchUserProfile,
    updateProfile,
  };
};
