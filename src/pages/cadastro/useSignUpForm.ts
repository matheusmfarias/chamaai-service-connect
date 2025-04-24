
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationData } from "@/hooks/useLocationData";
import { formatPhone } from "@/utils/masks";

// Client form schema
const clientSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  termsAccepted: z.boolean().refine(val => val === true, "Você deve aceitar os Termos de Uso e Política de Privacidade")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

// Provider form schema
const providerSchema = z.object({
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

// Common functions and base hook
const useSignUpFormBase = (formType: 'client' | 'provider') => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { states, cities, loading, error, fetchCities } = useLocationData();
  
  const [emailStatus, setEmailStatus] = useState({
    loading: false,
    valid: false,
    error: ""
  });
  
  const [phoneStatus, setPhoneStatus] = useState({
    loading: false,
    valid: false,
    error: ""
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "Fraca"
  });
  
  // Handle state change
  const handleStateChange = (value: string) => {
    if (formType === 'client') {
      clientForm.setValue("state", value);
      clientForm.setValue("city", "");
    } else {
      providerForm.setValue("state", value);
      providerForm.setValue("city", "");
    }
    
    const selectedState = states.find(state => state.sigla === value);
    if (selectedState) {
      fetchCities(selectedState.id);
    }
  };
  
  // Handle phone change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    if (formType === 'client') {
      clientForm.setValue("phone", formattedPhone);
    } else {
      providerForm.setValue("phone", formattedPhone);
    }
    
    // Mock validation for phone
    if (formattedPhone.length > 0) {
      setPhoneStatus({ loading: true, valid: false, error: "" });
      
      setTimeout(() => {
        if (formattedPhone === "(11) 98765-4321") {
          setPhoneStatus({ loading: false, valid: false, error: "Telefone já cadastrado" });
        } else if (formattedPhone.length < 14) {
          setPhoneStatus({ loading: false, valid: false, error: "Telefone incompleto" });
        } else {
          setPhoneStatus({ loading: false, valid: true, error: "" });
        }
      }, 800);
    } else {
      setPhoneStatus({ loading: false, valid: false, error: "" });
    }
  };
  
  // Client form
  const clientForm = useForm({
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
  
  // Provider form
  const providerForm = useForm({
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
  
  // Mock client submission
  const onClientSubmit = async (data: z.infer<typeof clientSchema>) => {
    setIsSubmitting(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Client form submitted:", data);
    setIsSubmitting(false);
    // In a real app, this would redirect or show success message
  };
  
  // Mock provider submission
  const onProviderSubmit = async (data: z.infer<typeof providerSchema>) => {
    setIsSubmitting(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Provider form submitted:", data);
    setIsSubmitting(false);
    // In a real app, this would redirect or show success message
  };
  
  return {
    showPassword,
    setShowPassword,
    isSubmitting,
    handleStateChange,
    handlePhoneChange,
    states,
    cities,
    emailStatus,
    phoneStatus,
    passwordStrength
  };
};

// Client-specific hook
export const useClientSignUpForm = () => {
  const baseProps = useSignUpFormBase('client');
  const form = useForm({
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
  
  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    baseProps.isSubmitting = true;
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Client form submitted:", data);
    baseProps.isSubmitting = false;
    // In a real app, this would redirect or show success message
  };
  
  return {
    ...baseProps,
    form,
    onSubmit
  };
};

// Provider-specific hook
export const useProviderSignUpForm = () => {
  const baseProps = useSignUpFormBase('provider');
  const form = useForm({
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
  
  const onSubmit = async (data: z.infer<typeof providerSchema>) => {
    baseProps.isSubmitting = true;
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Provider form submitted:", data);
    baseProps.isSubmitting = false;
    // In a real app, this would redirect or show success message
  };
  
  return {
    ...baseProps,
    form,
    onSubmit
  };
};
