
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
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { id: "faxina", name: "Faxina" },
  { id: "pintura", name: "Pintura" },
  { id: "eletrica", name: "Elétrica" },
  { id: "hidraulica", name: "Hidráulica" },
  { id: "reforma", name: "Reforma" },
  { id: "jardinagem", name: "Jardinagem" },
];

const Cadastro = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") === "prestador" ? "prestador" : "cliente";
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword || !phone || !city || !state) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A senha e a confirmação de senha devem ser idênticas.",
        variant: "destructive",
      });
      return;
    }
    
    if (activeTab === "prestador" && (!category || !description || !ratePerHour)) {
      toast({
        title: "Informações do prestador",
        description: "Por favor, preencha todas as informações do prestador.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would be replaced with actual Supabase auth and database operations
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Faça login para continuar.",
      });
      
      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                Seja bem-vindo ao ChamaAí! Preencha seus dados para criar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cliente">Sou Cliente</TabsTrigger>
                  <TabsTrigger value="prestador">Sou Prestador</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Nome Completo*
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Senha*
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirmar Senha*
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Telefone*
                    </label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        Cidade*
                      </label>
                      <Input
                        id="city"
                        placeholder="Sua cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium">
                        Estado*
                      </label>
                      <Input
                        id="state"
                        placeholder="Seu estado"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {activeTab === "prestador" && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Categoria de Serviço*
                        </label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Descrição dos serviços*
                        </label>
                        <textarea
                          id="description"
                          rows={3}
                          className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          placeholder="Descreva brevemente seus serviços e experiência..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="ratePerHour" className="text-sm font-medium">
                          Valor por hora (R$)*
                        </label>
                        <Input
                          id="ratePerHour"
                          type="number"
                          placeholder="0.00"
                          value={ratePerHour}
                          onChange={(e) => setRatePerHour(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6 bg-chamaai-blue hover:bg-chamaai-lightblue"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>
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
