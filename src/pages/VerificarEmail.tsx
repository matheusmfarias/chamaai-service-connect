
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { AlertCircle, CheckCircle, Clock, Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const VerificarEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "error">("pending");
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("verification_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email is found, redirect to signup
      toast({
        title: "Sessão expirada",
        description: "Por favor, faça cadastro novamente.",
        variant: "destructive",
      });
      navigate("/cadastro");
    }

    // Check if user is already verified
    checkVerificationStatus();

    // Set up interval to periodically check verification status
    const interval = setInterval(() => {
      checkVerificationStatus();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Create user profile function
  const createUserProfile = async (userId: string) => {
    try {
      setCreatingProfile(true);

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (existingProfile) {
        console.log("Profile already exists for user:", userId);
        setProfileCreated(true);
        return;
      }

      // Get stored user data
      const userDataString = localStorage.getItem("user_signup_data");
      if (!userDataString) {
        throw new Error("User signup data not found");
      }

      const userData = JSON.parse(userDataString);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userData.full_name,
          phone: userData.phone || null,
          city: userData.city || null,
          state: userData.state || null,
          user_type: userData.user_type || 'cliente',
          email: user.email
        });
          
      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw profileError;
      } else {
        console.log("Profile created successfully for user:", userId);
        setProfileCreated(true);
        
        // Success message
        toast({
          title: "Perfil criado com sucesso!",
          description: "Seu cadastro foi concluído.",
        });
      }
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast({
        title: "Erro ao criar perfil",
        description: error.message || "Ocorreu um erro ao criar seu perfil. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setCreatingProfile(false);
    }
  };

  // Check verification status
  const checkVerificationStatus = async () => {
    if (!email) return;

    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Error checking user:", error);
        setVerificationStatus("error");
        return;
      }

      if (data?.user) {
        // If email is confirmed, the user is verified
        if (data.user.email_confirmed_at) {
          setVerificationStatus("verified");
          
          // Create user profile if not already created
          if (!profileCreated && !creatingProfile) {
            await createUserProfile(data.user.id);
          }
          
          // If verified, redirect to login after a short delay
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setVerificationStatus("pending");
        }
      } else {
        setVerificationStatus("pending");
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      setVerificationStatus("error");
    }
  };

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (resendCountdown > 0 || !email) return;

    setResendLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/verificar-email`
        }
      });

      if (error) throw error;

      toast({
        title: "E-mail reenviado",
        description: "Verifique sua caixa de entrada e spam.",
      });

      // Set cooldown for resend button
      setResendCountdown(30);
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error("Error resending email:", error);
      toast({
        title: "Erro ao reenviar e-mail",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  // Check if email is available
  const checkEmailAvailability = async (email: string) => {
    if (!email) return;
    
    setCheckingEmail(true);
    setIsAvailable(null);

    try {
      const { data, error } = await supabase.rpc('is_email_available', {
        email: email
      });

      if (error) throw error;

      setIsAvailable(data);
    } catch (error: any) {
      console.error("Error checking email availability:", error);
      toast({
        title: "Erro ao verificar e-mail",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
      setIsAvailable(null);
    } finally {
      setCheckingEmail(false);
    }
  };

  // Handle change email
  const handleChangeEmail = async () => {
    if (!newEmail || !isAvailable) return;

    setLoading(true);

    try {
      // First update the email in Supabase Auth
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) throw error;

      // Update email in localStorage
      localStorage.setItem("verification_email", newEmail);
      setEmail(newEmail);
      setNewEmail("");
      setEmailChangeSuccess(true);
      
      toast({
        title: "E-mail alterado",
        description: "Verifique sua caixa de entrada para confirmar o novo e-mail.",
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setEmailChangeSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error("Error changing email:", error);
      toast({
        title: "Erro ao alterar e-mail",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect to login
  const handleRedirectToLogin = () => {
    // Clear signup data as it's no longer needed
    localStorage.removeItem("user_signup_data");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <Card className="max-w-md mx-auto border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Verificação de E-mail</CardTitle>
            <CardDescription className="text-center">
              {verificationStatus === "pending" && "Aguardando confirmação do seu e-mail"}
              {verificationStatus === "verified" && !profileCreated && "E-mail verificado! Criando seu perfil..."}
              {verificationStatus === "verified" && profileCreated && "E-mail verificado e perfil criado com sucesso!"}
              {verificationStatus === "error" && "Erro ao verificar e-mail"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status message */}
            {verificationStatus === "pending" && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertTitle>Aguardando confirmação</AlertTitle>
                <AlertDescription>
                  Enviamos um e-mail de verificação para <strong>{email}</strong>.
                  Por favor, verifique sua caixa de entrada e spam.
                </AlertDescription>
              </Alert>
            )}

            {verificationStatus === "verified" && !profileCreated && (
              <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                <Clock className="h-4 w-4 text-yellow-600" />
                <AlertTitle>E-mail verificado</AlertTitle>
                <AlertDescription>
                  Estamos criando seu perfil no sistema...
                </AlertDescription>
              </Alert>
            )}

            {verificationStatus === "verified" && profileCreated && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>E-mail verificado</AlertTitle>
                <AlertDescription>
                  Seu e-mail foi verificado com sucesso e seu perfil foi criado. 
                  Você será redirecionado para o login em instantes...
                </AlertDescription>
              </Alert>
            )}

            {verificationStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro ao verificar</AlertTitle>
                <AlertDescription>
                  Ocorreu um erro ao verificar seu e-mail. Por favor, tente novamente mais tarde.
                </AlertDescription>
              </Alert>
            )}

            {/* Resend email button */}
            {verificationStatus === "pending" && (
              <div className="space-y-4">
                <div className="text-center">
                  <Button
                    onClick={handleResendEmail}
                    disabled={resendLoading || resendCountdown > 0}
                    className="w-full"
                    variant="outline"
                  >
                    {resendCountdown > 0 
                      ? `Aguarde ${resendCountdown}s para reenviar` 
                      : resendLoading 
                        ? "Reenviando..." 
                        : "Reenviar e-mail de verificação"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Não recebeu? Verifique sua caixa de spam ou tente mudar seu e-mail abaixo.
                  </p>
                </div>
                
                {/* Change email section */}
                <div className="border rounded-md p-4 space-y-3">
                  <h3 className="font-medium text-sm">Alterar e-mail</h3>
                  
                  {emailChangeSuccess ? (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle>E-mail alterado</AlertTitle>
                      <AlertDescription>
                        Enviamos um e-mail de verificação para o novo endereço.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <FormLabel htmlFor="new-email">Novo e-mail</FormLabel>
                        <Input
                          id="new-email"
                          type="email"
                          placeholder="novo@email.com"
                          value={newEmail}
                          onChange={(e) => {
                            setNewEmail(e.target.value);
                            setIsAvailable(null);
                          }}
                          onBlur={() => checkEmailAvailability(newEmail)}
                        />
                        
                        {/* Email availability indicator */}
                        {newEmail && (
                          <div className="text-sm">
                            {checkingEmail && <p className="text-gray-500">Verificando disponibilidade...</p>}
                            {!checkingEmail && isAvailable === true && (
                              <p className="text-green-600">E-mail disponível</p>
                            )}
                            {!checkingEmail && isAvailable === false && (
                              <p className="text-red-600">Este e-mail já está em uso</p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={handleChangeEmail}
                        disabled={loading || !newEmail || !isAvailable}
                        className="w-full"
                      >
                        {loading ? "Alterando..." : "Alterar e-mail"}
                      </Button>
                    </>
                  )}
                </div>
                
                <div className="text-center mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="text-sm"
                  >
                    Voltar para login
                  </Button>
                </div>
              </div>
            )}

            {/* Button for verified users */}
            {verificationStatus === "verified" && profileCreated && (
              <Button
                onClick={handleRedirectToLogin}
                className="w-full"
              >
                Ir para login
              </Button>
            )}

            {/* Button for error state */}
            {verificationStatus === "error" && (
              <div className="space-y-4">
                <Button
                  onClick={checkVerificationStatus}
                  className="w-full"
                >
                  Verificar novamente
                </Button>
                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/cadastro")}
                    className="text-sm"
                  >
                    Voltar para cadastro
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VerificarEmail;
