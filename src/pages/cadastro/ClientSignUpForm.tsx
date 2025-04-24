
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClientSignUpForm } from "./useSignUpForm";
import { Loader2 } from "lucide-react";

const ClientSignUpForm = () => {
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
  } = useClientSignUpForm();

  // Add safety check to prevent rendering before form is initialized
  if (!form.formState) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            id="showPasswordClient" 
            checked={showPassword} 
            onCheckedChange={() => setShowPassword(!showPassword)} 
          />
          <label 
            htmlFor="showPasswordClient"
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
          {isSubmitting ? "Cadastrando..." : "Cadastrar como Cliente"}
        </Button>
        <div className="text-center text-sm mt-2">
          Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Faça login</a>
        </div>
      </form>
    </Form>
  );
};

export default ClientSignUpForm;
