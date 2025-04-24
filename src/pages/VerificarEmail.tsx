
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase";

const VerificarEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get email from location state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      setNewEmail(location.state.email);
    }
  }, [location.state]);

  // Check email verification status periodically
  useEffect(() => {
    if (!isVerified) {
      const checkVerification = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            setIsVerified(true);
            setIsVerifying(false);
            
            toast({
              title: "E-mail verificado",
              description: "Seu e-mail foi verificado com sucesso.",
            });
            
            // Delay navigation to show success message
            setTimeout(() => {
              navigate("/dashboard");
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

  const handleContinue = () => {
    navigate("/login");
  };

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
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail || newEmail === email) {
      return;
    }
    
    setIsChangingEmail(true);
    
    try {
      // First check if email is already in use
      const { data, error } = await supabase.rpc('is_email_available', {
        email: newEmail
      });
      
      if (error) throw error;
      
      if (!data) {
        toast({
          title: "E-mail indisponível",
          description: "Este e-mail já está em uso por outra conta.",
          variant: "destructive",
        });
        setIsChangingEmail(false);
        return;
      }
      
      // Update email
      const { error: updateError } = await supabase.auth.updateUser({ 
        email: newEmail 
      });
      
      if (updateError) throw updateError;
      
      setEmail(newEmail);
      setShowChangeEmail(false);
      
      toast({
        title: "E-mail atualizado",
        description: "Um e-mail de verificação foi enviado para o novo endereço.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao alterar e-mail",
        description: error.message || "Não foi possível alterar o e-mail.",
        variant: "destructive",
      });
    } finally {
      setIsChangingEmail(false);
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
                {isVerifying ? "Verificando seu e-mail..." : isVerified ? 
                  "Seu e-mail foi verificado com sucesso." : 
                  "Verifique seu e-mail para continuar."}
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
              
              {!isVerifying && !isVerified && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-gray-700 mb-4">
                      Enviamos um link de verificação para <strong>{email}</strong>. 
                      Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
                    </p>
                    
                    <div className="space-y-4">
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
                      
                      {!showChangeEmail && (
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowChangeEmail(true)}
                        >
                          Alterar E-mail
                        </Button>
                      )}
                    </div>
                    
                    {showChangeEmail && (
                      <div className="mt-4 space-y-3">
                        <Input 
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="Digite seu novo e-mail"
                          disabled={isChangingEmail}
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowChangeEmail(false)}
                            disabled={isChangingEmail}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            className="flex-1 bg-chamaai-blue hover:bg-chamaai-lightblue"
                            onClick={handleChangeEmail}
                            disabled={isChangingEmail || !newEmail || newEmail === email}
                          >
                            {isChangingEmail ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : "Confirmar"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 pt-4 border-t">
                    Já verificou seu e-mail?{" "}
                    <button onClick={handleContinue} className="text-chamaai-blue hover:underline">
                      Ir para o login
                    </button>
                  </div>
                </div>
              )}
              
              {!isVerifying && isVerified && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    Sua conta está pronta para uso. Você já pode acessar todas as funcionalidades do ChamaAí.
                  </p>
                  <Button 
                    className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
                    onClick={handleContinue}
                  >
                    Continuar para o Dashboard
                  </Button>
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
