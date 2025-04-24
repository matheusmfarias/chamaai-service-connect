
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ServiceProviderData } from "../types/auth";

const mockServiceProviders: Record<string, ServiceProviderData> = {
  "provider-user": {
    category: "limpeza",
    description: "Serviços de limpeza residencial com produtos de alta qualidade",
    rate_per_hour: 50,
    service_radius: 10 // 10 km
  }
};

export const useServiceProvider = () => {
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const { toast } = useToast();

  const checkServiceProviderStatus = async (userId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUserId = "provider-user";
      mockServiceProviders[mockUserId] = {
        ...data,
        service_radius: data.service_radius || 10 // Default to 10 km if not provided
      };
      
      setIsServiceProvider(true);

      toast({
        title: "Perfil de prestador criado",
        description: "Seu perfil de prestador foi criado com sucesso.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao criar perfil de prestador",
        description: error.message || "Ocorreu um erro ao criar seu perfil de prestador. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  };

  const checkIsServiceProvider = async (): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockProvider = mockServiceProviders["provider-user"];
      setIsServiceProvider(!!mockProvider);
      return !!mockProvider;
    } catch (error) {
      console.error("Erro ao verificar status de prestador:", error);
      return false;
    }
  };

  const updateServiceProviderInfo = async (data: Partial<ServiceProviderData>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUserId = "provider-user";
      if (!mockServiceProviders[mockUserId]) {
        throw new Error("Perfil de prestador não encontrado");
      }
      
      mockServiceProviders[mockUserId] = {
        ...mockServiceProviders[mockUserId],
        ...data
      };

      toast({
        title: "Perfil de prestador atualizado",
        description: "Suas informações de prestador foram atualizadas com sucesso.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar perfil de prestador",
        description: error.message || "Ocorreu um erro ao atualizar suas informações de prestador. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isServiceProvider,
    setIsServiceProvider,
    checkServiceProviderStatus,
    createServiceProvider,
    checkIsServiceProvider,
    updateServiceProviderInfo
  };
};
