
import { useState } from "react";
import { UserProfile } from "../types/auth";
import { useToast } from "@/hooks/use-toast";

const mockProfiles: Record<string, UserProfile> = {
  "mock-user-1": {
    id: "mock-user-1",
    full_name: "João Silva",
    phone: "(11) 99999-9999",
    city: "São Paulo",
    state: "SP",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    user_type: "cliente"
  },
  "mock-user-2": {
    id: "mock-user-2",
    full_name: "Maria Santos",
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
      const mockProfile = mockProfiles[userId];
      if (mockProfile) {
        setUserProfile(mockProfile);
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
