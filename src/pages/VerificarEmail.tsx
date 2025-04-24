
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase";

const VerificarEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Retrieve email from localStorage or location state
  useEffect(() => {
    const storedEmail = localStorage.getItem('verification_email');
    const locationEmail = location.state?.email;
    
    const emailToUse = storedEmail || locationEmail;
    
    if (emailToUse) {
      setEmail(emailToUse);
      
      // Clean up the stored email after using it
      localStorage.removeItem('verification_email');
    } else {
      // If no email is found, redirect to signup
      navigate('/cadastro');
    }
  }, [location.state, navigate]);

  // Check email verification status periodically
  useEffect(() => {
    if (!isVerified) {
      const checkVerification = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user?.email_confirmed_at) {
            setIsVerified(true);
            setIsVerifying(false);
            
            toast({
              title: "E-mail verificado",
              description: "Seu e-mail foi verificado com sucesso.",
            });
            
            // Redirect to login after verification
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            setIsVerifying(false);
          }
        } catch (error) {
          console.error("Error checking verification:", error);
          setIsVerifying(false);
        }
      };
      
      // Initial check
      checkVerification();
      
      // Set up interval to check periodically (every 10 seconds)
      const interval = setInterval(checkVerification, 10000);
      
      // Clean up on unmount
      return () => clearInterval(interval);
    }
  }, [isVerified, toast, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
  }, [timeRemaining, isResendDisabled]);

  const handleResendVerification = async () => {
    setIsResendDisabled(true);
    setTimeRemaining(30);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "E-mail enviado",
        description: "Um novo e-mail de verificação foi enviado para seu endereço.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao reenviar e-mail",
        description: error.message || "Não foi possível reenviar o e-mail de verificação.",
        variant: "destructive",
      });
      
      // Reset disabled state if resend fails
      setIsResendDisabled(false);
      setTimeRemaining(0);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-chamaai-blue">
                Verificação de E-mail
              </CardTitle>
              <CardDescription>
                {isVerifying ? "Verificando seu e-mail..." : 
                 isVerified ? "E-mail verificado com sucesso" : 
                 "Verifique seu e-mail para continuar"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center p-4">
                {isVerifying ? (
                  <Loader2 className="h-16 w-16 text-chamaai-blue animate-spin" />
                ) : isVerified ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <Mail className="h-16 w-16 text-chamaai-blue" />
                )}
              </div>
              
              {!isVerifying && !isVerified && email && (
                <div className="text-center space-y-4">
                  <p className="text-gray-700 mb-4">
                    Enviamos um link de verificação para <strong>{email}</strong>. 
                    Por favor, verifique sua caixa de entrada.
                  </p>
                  
                  <Button 
                    className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
                    onClick={handleResendVerification}
                    disabled={isResendDisabled}
                  >
                    {isResendDisabled ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Aguarde {timeRemaining}s
                      </>
                    ) : (
                      "Reenviar E-mail de Verificação"
                    )}
                  </Button>
                  
                  <div className="text-center text-sm mt-2">
                    Já verificou seu e-mail? <a href="/login" className="text-chamaai-blue hover:underline">Faça login</a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VerificarEmail;
