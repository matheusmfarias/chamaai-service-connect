
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock implementation for signup form logic
export const useSignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle client registration
  const handleClientSignUp = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'cliente'
      });
      
      // Save email for verification page
      localStorage.setItem("verification_email", data.email);
      
      // Redirect to verification page
      navigate("/verificar-email");
      
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle provider registration
  const handleProviderSignUp = async (data: any) => {
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
      
      // Save email for verification page
      localStorage.setItem("verification_email", data.email);
      
      // Redirect to verification page
      navigate("/verificar-email");
      
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleClientSignUp,
    handleProviderSignUp
  };
};

export default useSignUpForm;
