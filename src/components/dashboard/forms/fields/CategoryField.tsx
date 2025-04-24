
import { useFormContext } from "react-hook-form";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Loader2 } from "lucide-react";

export function CategoryField() {
  const { watch, setValue, formState: { errors } } = useFormContext<ServiceRequestFormValues>();
  const { categories, isLoading } = useCategories();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Categoria*</label>
      <Select
        value={watch("category")}
        onValueChange={(value) => setValue("category", value)}
        disabled={isLoading}
      >
        <SelectTrigger>
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            <SelectValue placeholder="Selecione uma categoria" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categorias</SelectLabel>
            {categories.map((cat) => (
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
