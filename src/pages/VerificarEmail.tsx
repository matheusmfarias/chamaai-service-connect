
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

const VerificarEmail = () => {
  const [email, setEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { toast } = useToast();
  
  // Recupera o email do localStorage onde foi salvo após o cadastro
  useEffect(() => {
    const savedEmail = localStorage.getItem("verification_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (resendCooldown > 0) {
      timer = window.setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "E-mail reenviado!",
        description: "Por favor, verifique sua caixa de entrada.",
      });

      setResendCooldown(60);
    } catch (error: any) {
      toast({
        title: "Erro ao reenviar e-mail",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.updateUser({ email });

      if (error) throw error;

      localStorage.setItem("verification_email", email);
      
      toast({
        title: "E-mail atualizado!",
        description: "Um novo e-mail de verificação foi enviado.",
      });

      setIsEditingEmail(false);
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar e-mail",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-chamaai-blue">
                Verifique seu e-mail
              </CardTitle>
              <CardDescription>
                Enviamos um e-mail de confirmação para:
                <br />
                <strong className="text-black">{email}</strong>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {isEditingEmail ? (
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Novo e-mail"
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Atualizar e-mail
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsEditingEmail(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    disabled={resendCooldown > 0}
                    className="w-full"
                  >
                    {resendCooldown > 0
                      ? `Você poderá reenviar em ${resendCooldown} segundos...`
                      : "Reenviar e-mail de verificação"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsEditingEmail(true)}
                    className="w-full"
                  >
                    Digite outro e-mail
                  </Button>
                </div>
              )}
              
              <div className="text-center text-sm text-gray-600 mt-6">
                <Link to="/login" className="text-chamaai-blue hover:underline">
                  Voltar para o login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VerificarEmail;
