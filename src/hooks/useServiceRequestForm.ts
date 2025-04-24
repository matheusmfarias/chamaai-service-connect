
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequest } from "@/types/serviceRequest";

export interface ServiceRequestFormValues {
  title: string;
  category: string;
  description: string;
  preferredDate: Date | undefined;
  isPublic: boolean;
}

interface UseServiceRequestFormProps {
  onSuccess: () => void;
}

export function useServiceRequestForm({ onSuccess }: UseServiceRequestFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ServiceRequestFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      preferredDate: undefined,
      isPublic: true
    },
  });

  const createServiceRequestMutation = useMutation({
    mutationFn: async (values: ServiceRequestFormValues) => {
      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          status: 'pending',
          is_public: values.isPublic,
          estimated_price: null,
          scheduled_date: values.preferredDate?.toISOString() || new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service_requests'] });
      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação foi criada com sucesso!",
      });
      form.reset();
      onSuccess();
    },
    onError: (error: any) => {
      console.error('Error creating service request:', error);
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message || "Não foi possível criar a solicitação de serviço.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: ServiceRequestFormValues) => {
    createServiceRequestMutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isSubmitting: createServiceRequestMutation.isPending
  };
}
