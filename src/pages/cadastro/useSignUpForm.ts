
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Common form hooks for client and provider signup
const useSignUpFormBase = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock states and cities
  const states = [
    { id: 1, sigla: "SP", nome: "São Paulo" },
    { id: 2, sigla: "RJ", nome: "Rio de Janeiro" },
    { id: 3, sigla: "MG", nome: "Minas Gerais" }
  ];
  
  const citiesByState: Record<string, Array<{id: number, nome: string}>> = {
    "SP": [
      { id: 1, nome: "São Paulo" },
      { id: 2, nome: "Campinas" },
      { id: 3, nome: "Guarulhos" }
    ],
    "RJ": [
      { id: 4, nome: "Rio de Janeiro" },
      { id: 5, nome: "Niterói" },
      { id: 6, nome: "Duque de Caxias" }
    ],
    "MG": [
      { id: 7, nome: "Belo Horizonte" },
      { id: 8, nome: "Uberlândia" },
      { id: 9, nome: "Contagem" }
    ]
  };
  
  const [cities, setCities] = useState<Array<{id: number, nome: string}>>([]);
  
  const handleStateChange = (state: string) => {
    setCities(citiesByState[state] || []);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock implementation - a real one would format the phone number
    console.log("Phone changed:", e.target.value);
  };

  return {
    navigate,
    signUp,
    toast,
    isSubmitting,
    setIsSubmitting,
    showPassword,
    setShowPassword,
    states,
    cities,
    setCities,
    handleStateChange,
    handlePhoneChange
  };
};

// Client signup form hook
export const useClientSignUpForm = () => {
  const base = useSignUpFormBase();
  
  const form = {
    control: {},
    handleSubmit: (callback: any) => (e: React.FormEvent) => {
      e.preventDefault();
      callback({});
    },
    setValue: () => {},
    getValues: () => ""
  };
  
  const onSubmit = async (data: any) => {
    try {
      base.setIsSubmitting(true);
      
      await base.signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'cliente'
      });
      
      // Save email for verification page
      localStorage.setItem("verification_email", data.email);
      
      // Redirect to verification page
      base.navigate("/verificar-email");
      
    } catch (error: any) {
      base.toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      base.setIsSubmitting(false);
    }
  };
  
  return {
    ...base,
    form,
    onSubmit
  };
};

// Provider signup form hook
export const useProviderSignUpForm = () => {
  const base = useSignUpFormBase();
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
  
  const form = {
    control: {},
    handleSubmit: (callback: any) => (e: React.FormEvent) => {
      e.preventDefault();
      callback({});
    },
    setValue: () => {},
    getValues: () => ""
  };
  
  const onSubmit = async (data: any) => {
    try {
      base.setIsSubmitting(true);
      
      await base.signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'prestador',
        category: data.category,
        description: data.description,
        rate_per_hour: data.ratePerHour
      });
      
      // Save email for verification page
      localStorage.setItem("verification_email", data.email);
      
      // Redirect to verification page
      base.navigate("/verificar-email");
      
    } catch (error: any) {
      base.toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      base.setIsSubmitting(false);
    }
  };
  
  return {
    ...base,
    form,
    onSubmit,
    emailStatus,
    phoneStatus,
    passwordStrength
  };
};

// Default export
export default useSignUpForm;
