
import { useFormContext } from "react-hook-form";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";
import { Textarea } from "@/components/ui/textarea";
import { AIImproveDescription } from "../AIImproveDescription";

export function DescriptionField() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ServiceRequestFormValues>();
  const description = watch("description");

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição do Serviço*
        </label>
        <AIImproveDescription
          description={description}
          onImproved={(text) => setValue("description", text)}
        />
      </div>
      <Textarea
        id="description"
        placeholder="Descreva detalhadamente o serviço que você precisa..."
        className="min-h-[120px]"
        {...register("description", { required: "Descreva seu problema" })}
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
}
