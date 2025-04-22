
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { serviceCategories } from "@/constants/categories";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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

// Create provider schema separately instead of extending
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

type ClientFormValues = z.infer<typeof clientSchema>;
type ProviderFormValues = z.infer<typeof providerSchema>;

const Cadastro = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") === "prestador" ? "prestador" : "cliente";
  
  const navigate = useNavigate();
  const { signUp, createServiceProvider, isLoading } = useAuth();
  const { toast } = useToast();

  const clientForm = useForm<ClientFormValues>({
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

  const providerForm = useForm<ProviderFormValues>({
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
      ratePerHour: 30,
      termsAccepted: false
    }
  });

  const handleClientSubmit = async (data: ClientFormValues) => {
    try {
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'cliente'
      });

      toast({
        title: "Cadastro realizado",
        description: "Sua conta de cliente foi criada com sucesso!",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleProviderSubmit = async (data: ProviderFormValues) => {
    try {
      // Primeiro, cadastra o usuário
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        state: data.state,
        user_type: 'prestador'
      });

      // Depois, cria o perfil de prestador
      await createServiceProvider({
        category: data.category,
        description: data.description,
        rate_per_hour: data.ratePerHour
      });

      toast({
        title: "Cadastro realizado",
        description: "Seu perfil de prestador está em análise. Você receberá um e-mail quando for aprovado.",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-chamaai-blue">Crie sua conta</CardTitle>
              <CardDescription>
                Escolha entre ser cliente ou prestador de serviços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={defaultTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cliente">Sou Cliente</TabsTrigger>
                  <TabsTrigger value="prestador">Sou Prestador</TabsTrigger>
                </TabsList>
                
                {/* Cliente Form */}
                <TabsContent value="cliente">
                  <Form {...clientForm}>
                    <form onSubmit={clientForm.handleSubmit(handleClientSubmit)} className="space-y-4">
                      <FormField
                        control={clientForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={clientForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={clientForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={clientForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={clientForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input placeholder="Estado" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={clientForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="Cidade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={clientForm.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>
                                Li e aceito os{" "}
                                <Link 
                                  to="/termos" 
                                  className="text-chamaai-blue hover:underline"
                                >
                                  Termos de Uso
                                </Link>{" "}
                                e{" "}
                                <Link 
                                  to="/privacidade" 
                                  className="text-chamaai-blue hover:underline"
                                >
                                  Política de Privacidade
                                </Link>
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-chamaai-blue hover:bg-chamaai-lightblue" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Criando conta..." : "Criar conta de Cliente"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Prestador Form */}
                <TabsContent value="prestador">
                  <Form {...providerForm}>
                    <form onSubmit={providerForm.handleSubmit(handleProviderSubmit)} className="space-y-4">
                      <FormField
                        control={providerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={providerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={providerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={providerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={providerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={providerForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <FormControl>
                                <Input placeholder="Estado" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={providerForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="Cidade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={providerForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoria de Serviço</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceCategories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={providerForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição do Serviço</FormLabel>
                            <FormControl>
                              <textarea 
                                className="w-full p-2 border rounded-md" 
                                rows={4}
                                placeholder="Descreva detalhadamente os serviços que você oferece (mínimo 30 caracteres)"
                                {...field}
                              ></textarea>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={providerForm.control}
                        name="ratePerHour"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor por Hora (R$)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Valor entre R$30 e R$500" 
                                min={30}
                                max={500}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={providerForm.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>
                                Li e aceito os{" "}
                                <Link 
                                  to="/termos" 
                                  className="text-chamaai-blue hover:underline"
                                >
                                  Termos de Uso
                                </Link>{" "}
                                e{" "}
                                <Link 
                                  to="/privacidade" 
                                  className="text-chamaai-blue hover:underline"
                                >
                                  Política de Privacidade
                                </Link>
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-chamaai-blue hover:bg-chamaai-lightblue" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Criando conta..." : "Criar conta de Prestador"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-chamaai-blue hover:underline">
                  Entrar
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Cadastro;
