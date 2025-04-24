
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ServiceProviderData } from "../types/auth";

const mockServiceProviders: Record<string, ServiceProviderData> = {
  "mock-provider-1": {
    category: "limpeza",
    description: "Serviços de limpeza residencial",
    rate_per_hour: 50,
  },
  "mock-provider-2": {
    category: "eletrica",
    description: "Serviços de elétrica em geral",
    rate_per_hour: 80,
  }
};

export const useServiceProvider = () => {
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const { toast } = useToast();

  const checkServiceProviderStatus = async (userId: string) => {
    try {
      const mockProvider = mockServiceProviders[userId];
      setIsServiceProvider(!!mockProvider);
      return !!mockProvider;
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
      return false;
    }
  };

  const createServiceProvider = async (data: ServiceProviderData) => {
    try {
      const mockUserId = "mock-user-" + Math.random().toString(36).substr(2, 9);
      mockServiceProviders[mockUserId] = data;
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
    const mockUserId = "mock-user-1"; // For testing purposes
    try {
      const mockProvider = mockServiceProviders[mockUserId];
      setIsServiceProvider(!!mockProvider);
      return !!mockProvider;
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
