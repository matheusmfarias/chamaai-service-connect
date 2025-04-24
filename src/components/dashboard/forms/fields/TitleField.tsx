
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";

export function TitleField() {
  const { register, formState: { errors } } = useFormContext<ServiceRequestFormValues>();

  return (
    <div className="space-y-2">
      <label htmlFor="title" className="text-sm font-medium">
        Título do Serviço*
      </label>
      <Input
        id="title"
        placeholder="Ex: Pintura de sala, Instalação de tomadas..."
        {...register("title", { required: "Insira um título para o serviço" })}
      />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
    </div>
  );
}
