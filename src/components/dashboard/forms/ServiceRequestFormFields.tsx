
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { ServiceRequestFormValues } from "@/hooks/useServiceRequestForm";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceCategories } from "@/constants/categories";
import { AIImproveDescription } from "./AIImproveDescription";
import { cn } from "@/lib/utils";

export function ServiceRequestFormFields() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ServiceRequestFormValues>();
  const description = watch("description");
  const date = watch("preferredDate");

  return (
    <div className="space-y-6">
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Data*</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("preferredDate", date)}
              disabled={(date) => date < new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          {...register("isPublic")}
          className="rounded-md"
        />
        <label htmlFor="isPublic" className="text-sm font-medium">
          Solicitação pública (qualquer prestador pode enviar orçamento)
        </label>
      </div>
    </div>
  );
}
