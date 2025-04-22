
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLocationData } from "@/hooks/useLocationData";
import { formatPhone } from "@/utils/masks";

export const clientSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  termsAccepted: z.boolean().refine(val => val === true, "Você deve aceitar os Termos de Uso e Política de Privacidade"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export const providerSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().min(30, "Descrição deve ter pelo menos 30 caracteres"),
  ratePerHour: z.coerce.number()
    .min(30, "Valor mínimo R$30")
    .max(500, "Valor máximo R$500"),
  termsAccepted: z.boolean().refine(val => val === true, "Você deve aceitar os Termos de Uso e Política de Privacidade")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export type ClientFormValues = z.infer<typeof clientSchema>;
export type ProviderFormValues = z.infer<typeof providerSchema>;

export function useClientSignUpForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { states, cities, loading, error, fetchCities } = useLocationData();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
      state: "",
      termsAccepted: false
    }
  });

  const handleStateChange = (value: string) => {
    form.setValue("state", value);
    form.setValue("city", "");

    const selectedState = states.find(state => state.sigla === value);
    if (selectedState) {
      fetchCities(selectedState.id);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    form.setValue("phone", formattedPhone);
  };

  const onSubmit = async (data: ClientFormValues) => {
    try {
      setIsSubmitting(true);
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'cliente'
      });

      localStorage.setItem("verification_email", data.email);
      navigate("/verificar-email");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    isSubmitting,
    handleStateChange,
    handlePhoneChange,
    onSubmit,
    states,
    cities,
    loading,
    error,
  };
}

export function useProviderSignUpForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { states, cities, loading, error, fetchCities } = useLocationData();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "",
      state: "",
      category: "",
      description: "",
      ratePerHour: 50,
      termsAccepted: false
    }
  });

  const handleStateChange = (value: string) => {
    form.setValue("state", value);
    form.setValue("city", "");

    const selectedState = states.find(state => state.sigla === value);
    if (selectedState) {
      fetchCities(selectedState.id);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    form.setValue("phone", formattedPhone);
  };

  const onSubmit = async (data: ProviderFormValues) => {
    try {
      setIsSubmitting(true);
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'prestador',
        category: data.category,
        description: data.description,
        rate_per_hour: data.ratePerHour
      });

      localStorage.setItem("verification_email", data.email);
      navigate("/verificar-email");
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    isSubmitting,
    handleStateChange,
    handlePhoneChange,
    onSubmit,
    states,
    cities,
    loading,
    error,
  };
}
