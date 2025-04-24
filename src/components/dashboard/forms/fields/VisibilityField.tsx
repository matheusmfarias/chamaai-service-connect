
import { useFormContext } from "react-hook-form";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";
import { Checkbox } from "@/components/ui/checkbox";

export function VisibilityField() {
  const { register } = useFormContext<ServiceRequestFormValues>();

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="isPublic" {...register("isPublic")} />
      <label htmlFor="isPublic" className="text-sm font-medium">
        Solicitação pública (qualquer prestador pode enviar orçamento)
      </label>
    </div>
  );
}
