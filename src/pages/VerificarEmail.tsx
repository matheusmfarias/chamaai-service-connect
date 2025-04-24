
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificarEmail = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // In a real app, we would verify the token from the URL
  // For mock purposes, we'll simulate verification
  useEffect(() => {
    const simulateVerification = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For mock purposes, always succeed
      setIsVerified(true);
      setIsVerifying(false);
      
      toast({
        title: "E-mail verificado",
        description: "Seu e-mail foi verificado com sucesso.",
      });
    };
    
    simulateVerification();
  }, [toast]);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleResendVerification = async () => {
    // Simulate resending verification email
    toast({
      title: "E-mail enviado",
      description: "Um novo e-mail de verificação foi enviado para seu endereço.",
    });
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
                  "Houve um problema ao verificar seu e-mail."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center p-4">
                {isVerifying ? (
                  <Loader2 className="h-16 w-16 text-chamaai-blue animate-spin" />
                ) : isVerified ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              
              {!isVerifying && (
                <div className="space-y-4">
                  {isVerified ? (
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
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-700 mb-4">
                        Não foi possível verificar seu e-mail. O link pode ter expirado ou ser inválido.
                      </p>
                      <Button 
                        className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue"
                        onClick={handleResendVerification}
                      >
                        Reenviar E-mail de Verificação
                      </Button>
                    </div>
                  )}
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
