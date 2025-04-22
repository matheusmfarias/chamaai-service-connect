import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationData } from "@/hooks/useLocationData";
import { formatPhone } from "@/utils/masks";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  isValidEmail,
  isValidPhone,
  validatePasswordStrength,
  sanitizeTextInput,
} from "@/utils/validation";

export function useClientSignUpForm() {
  const { states, cities, fetchCities } = useLocationData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
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

  const form = useForm({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // TODO: Implementar a lógica de cadastro aqui
      console.log("Dados do formulário:", data);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Você será redirecionado em breve.",
      });
      navigate("/login");
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
    cities
  };
}

export function useProviderSignUpForm() {
  const { states, cities, fetchCities } = useLocationData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New for real-time uniqueness/validation feedback
  const [emailStatus, setEmailStatus] = useState<{valid: boolean, loading: boolean, error: string}>({valid: false, loading: false, error: ''});
  const [phoneStatus, setPhoneStatus] = useState<{valid: boolean, loading: boolean, error: string}>({valid: false, loading: false, error: ''});
  const [passwordStrength, setPasswordStrength] = useState<{score: number, feedback: string, valid: boolean}>({score: 0, feedback: "Muito fraca", valid: false});

  // Enhanced Zod schema
  const formSchema = z.object({
    fullName: z.string()
      .min(2, "Nome completo é obrigatório")
      .max(60, "O nome deve ter no máximo 60 caracteres"),
    email: z.string()
      .email("E-mail inválido")
      .max(120, "O e-mail deve ter no máximo 120 caracteres"), // for system safety
    password: z.string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(64, "Máximo 64 caracteres")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, "A senha precisa conter letra maiúscula, minúscula, número e símbolo"),
    confirmPassword: z.string(),
    phone: z.string()
      .refine(isValidPhone, { message: "Telefone inválido. Deve ser (99) 99999-9999" }),
    city: z.string()
      .max(50, "Cidade: máximo 50 caracteres")
      .min(1, "Cidade é obrigatória"),
    state: z.string().max(50, "Estado: máximo 50 caracteres").min(1, "Estado é obrigatório"),
    category: z.string().min(1, "Categoria é obrigatória"),
    description: z.string().min(30, "Descrição deve ter pelo menos 30 caracteres").max(500, "Máximo 500 caracteres"),
    ratePerHour: z.coerce.number().min(30, "Valor mínimo R$30").max(500, "Valor máximo R$500"),
    termsAccepted: z.boolean().refine((val) => val === true, "Você precisa aceitar os Termos de Uso"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
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

  // Real-time email uniqueness
  async function checkEmailUniqueness(email: string) {
    setEmailStatus({valid: false, loading: true, error: ''});
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (error) {
      setEmailStatus({valid: false, loading: false, error: "Erro ao validar e-mail"});
      return false;
    }
    if (data) {
      setEmailStatus({valid: false, loading: false, error: "Já existe uma conta com esse e-mail"});
      return false;
    }
    setEmailStatus({valid: true, loading: false, error: ''});
    return true;
  }

  // Real-time phone uniqueness
  async function checkPhoneUniqueness(phone: string) {
    setPhoneStatus({valid: false, loading: true, error: ''});
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();
    if (error) {
      setPhoneStatus({valid: false, loading: false, error: "Erro ao validar telefone"});
      return false;
    }
    if (data) {
      setPhoneStatus({valid: false, loading: false, error: "Este telefone já pertence a outro usuário"});
      return false;
    }
    setPhoneStatus({valid: true, loading: false, error: ''});
    return true;
  }

  // Input handlers with debounce (could optimize for prod)
  useEffect(() => {
    const subscription = form.watch(async (values, { name }) => {
      // Email
      if (name === "email" && isValidEmail(values.email)) {
        await checkEmailUniqueness(values.email);
      }
      // Phone
      if (name === "phone" && isValidPhone(values.phone)) {
        await checkPhoneUniqueness(values.phone);
      }
      // Password strength
      if (name === "password") {
        setPasswordStrength(validatePasswordStrength(values.password));
      }
      // Full name, city sanitization
      if (["fullName", "city", "state"].includes(name ?? "")) {
        const field = name as "fullName"|"city"|"state";
        const max = field === "fullName" ? 60 : 50;
        if (values[field]) {
          const sanitized = sanitizeTextInput(values[field], max);
          if (sanitized !== values[field]) {
            form.setValue(field, sanitized);
          }
        }
      }
    });
    return () => subscription.unsubscribe?.();
  }, [form]);

  // On state select, fetch cities
  const handleStateChange = (value: string) => {
    form.setValue("state", value);
    form.setValue("city", "");
    const selectedState = states.find(state => state.sigla === value);
    if (selectedState) fetchCities(selectedState.id);
  };

  // Mask/validate phone input, sanitize in real time
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    form.setValue("phone", formatted);
    if (formatted.length >= 14) checkPhoneUniqueness(formatted);
  };

  // On submit, validate again, then continue
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // Do not proceed if a field is invalid
    if (!emailStatus.valid) {
      toast({ title: "E-mail inválido/ja utilizado", description: emailStatus.error, variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!phoneStatus.valid) {
      toast({ title: "Telefone já utilizado", description: phoneStatus.error, variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    // Complete sign up via Supabase Auth
    try {
      // Always store email in profile as well now (api will do too but to be sure)
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
            city: data.city,
            state: data.state,
            user_type: 'prestador',
            email: data.email,
            category: data.category,
            description: data.description,
            rate_per_hour: data.ratePerHour,
          }
        }
      });
      // Save email for verifying
      localStorage.setItem('verification_email', data.email);
      toast({
        title: "Cadastro realizado",
        description: "Enviamos um link de verificação para seu email. Confirme antes de acessar.",
      });
      navigate('/verificar-email');
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
    emailStatus,
    phoneStatus,
    passwordStrength
  };
}
