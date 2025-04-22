
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProviderSignUpForm } from "./useSignUpForm";

const ProviderSignUpForm = () => {
  const {
    form,
    showPassword,
    setShowPassword,
    isSubmitting,
    handleStateChange,
    handlePhoneChange,
    onSubmit,
    states,
    cities
  } = useProviderSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showPasswordProvider" 
            checked={showPassword} 
            onCheckedChange={() => setShowPassword(!showPassword)} 
          />
          <label 
            htmlFor="showPasswordProvider"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mostrar senhas
          </label>
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input 
                  placeholder="(99) 99999-9999" 
                  value={field.value}
                  onChange={(e) => handlePhoneChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => handleStateChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.sigla}>
                        {state.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => form.setValue("city", value)}
                  disabled={cities.length === 0 || !form.getValues("state")}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.nome}>
                        {city.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria de Serviço</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="limpeza">Limpeza</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
                  <SelectItem value="hidraulica">Hidráulica</SelectItem>
                  <SelectItem value="pintura">Pintura</SelectItem>
                  <SelectItem value="jardinagem">Jardinagem</SelectItem>
                  <SelectItem value="montagem_moveis">Montagem de Móveis</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição dos Serviços</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva os serviços que você oferece (mínimo 30 caracteres)"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratePerHour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor por hora (R$)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="30" 
                  max="500" 
                  step="5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Eu aceito os <a href="/termos" className="text-blue-600 hover:underline" target="_blank">Termos de Uso</a> e a <a href="/privacidade" className="text-blue-600 hover:underline" target="_blank">Política de Privacidade</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar como Prestador"}
        </Button>
        <div className="text-center text-sm mt-2">
          Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Faça login</a>
        </div>
      </form>
    </Form>
  );
};

export default ProviderSignUpForm;
</lov_write>

---

<lov-write file_path="src/pages/Cadastro.tsx">
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import forms
import ClientSignUpForm from "./cadastro/ClientSignUpForm";
import ProviderSignUpForm from "./cadastro/ProviderSignUpForm";

const Cadastro = () => {
  const [tabValue, setTabValue] = useState<"client" | "provider">("client");

  return (
    <Layout>
      <div className="container-custom py-12">
        <Card className="max-w-2xl mx-auto border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Cadastre-se</CardTitle>
            <CardDescription className="text-center">
              Crie sua conta para começar a usar o ChamaAí
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as "client" | "provider")}>
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="client">Sou Cliente</TabsTrigger>
                <TabsTrigger value="provider">Sou Prestador</TabsTrigger>
              </TabsList>
              <TabsContent value="client">
                <ClientSignUpForm />
              </TabsContent>
              <TabsContent value="provider">
                <ProviderSignUpForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Cadastro;
