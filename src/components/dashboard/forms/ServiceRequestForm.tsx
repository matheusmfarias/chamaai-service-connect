import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/constants/categories";
import { ServiceRequest } from "@/types/serviceRequest";

interface FormValues {
  title: string;
  category: string;
  description: string;
  preferredDate: Date | undefined;
  isPublic: boolean;
}

interface ServiceRequestFormProps {
  onSuccess: () => void;
}

export function ServiceRequestForm({ onSuccess }: ServiceRequestFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      preferredDate: undefined,
      isPublic: true
    },
  });

  const createServiceRequestMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Create mock service request
      const newRequest: Partial<ServiceRequest> = {
        client_id: user.id,
        title: values.title,
        description: values.description,
        category: values.category,
        status: 'pending',
        is_public: values.isPublic,
        estimated_price: null,
        scheduled_date: values.preferredDate ? values.preferredDate.toISOString() : new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return newRequest;
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
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message || "Não foi possível criar a solicitação de serviço.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: FormValues) => {
    createServiceRequestMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Insira um título para o serviço" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Serviço</FormLabel>
              <FormControl>
                <input
                  placeholder="Ex: Instalação de tomada, Pintura de parede..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          rules={{ required: "Selecione uma categoria" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          rules={{ required: "Descreva seu problema" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do problema</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o serviço que você precisa..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="preferredDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data preferencial</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Solicitação Pública</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Quando ativado, qualquer prestador poderá ver e enviar propostas para seu serviço.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            disabled={createServiceRequestMutation.isPending}
          >
            {createServiceRequestMutation.isPending ? (
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
    </Form>
  );
}
