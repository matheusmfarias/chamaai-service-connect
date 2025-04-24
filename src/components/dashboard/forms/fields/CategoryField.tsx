
import { useFormContext } from "react-hook-form";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceCategories } from "@/constants/categories";

export function CategoryField() {
  const { watch, setValue, formState: { errors } } = useFormContext<ServiceRequestFormValues>();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Categoria*</label>
      <Select
        value={watch("category")}
        onValueChange={(value) => setValue("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categorias</SelectLabel>
            {serviceCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.category && (
        <p className="text-sm text-red-500">{errors.category.message}</p>
      )}
    </div>
  );
}
