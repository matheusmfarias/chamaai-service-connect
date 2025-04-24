
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useServiceRequestForm } from "@/hooks/useServiceRequestForm";
import { ServiceRequestFormFields } from "./ServiceRequestFormFields";

interface ServiceRequestFormProps {
  onSuccess: () => void;
}

export function ServiceRequestForm({ onSuccess }: ServiceRequestFormProps) {
  const { form, onSubmit, isSubmitting } = useServiceRequestForm({ onSuccess });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <ServiceRequestFormFields />
        
        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar solicitação"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
