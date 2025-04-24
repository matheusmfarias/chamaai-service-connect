
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProviderSignUpForm } from "./useSignUpForm";
import { Loader2 } from "lucide-react";

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
    cities,
    emailStatus,
    phoneStatus,
    passwordStrength
  } = useProviderSignUpForm();

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
        {/* Nome completo */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome completo"
                  maxLength={60}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* E-mail */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    maxLength={120}
                    {...field}
                    autoComplete="email"
                  />
                  {emailStatus.loading && (
                    <span className="absolute right-2 top-3 text-xs text-gray-400 animate-pulse">verificando...</span>
                  )}
                  {emailStatus.error && (
                    <span className="absolute right-2 top-3 text-xs text-destructive">{emailStatus.error}</span>
                  )}
                  {emailStatus.valid && !emailStatus.error && (
                    <span className="absolute right-2 top-3 text-xs text-green-600">Disponível</span>
                  )}
                </div>
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
                  <div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      minLength={8}
                      maxLength={64}
                      autoComplete="new-password"
                      {...field}
                    />
                    {/* Nível da senha */}
                    <div className="text-xs mt-1">
                      <span className={
                        passwordStrength.score >= 3
                          ? "text-green-600"
                          : passwordStrength.score === 2
                          ? "text-yellow-600"
                          : "text-red-600"
                      }>
                        Segurança: {passwordStrength.feedback}
                      </span>
                    </div>
                  </div>
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
                    minLength={8}
                    maxLength={64}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Mostrar senha */}
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
        {/* Telefone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="(99) 99999-9999"
                    value={field.value}
                    onChange={handlePhoneChange}
                    autoComplete="tel"
                    maxLength={15}
                  />
                  {phoneStatus.loading && (
                    <span className="absolute right-2 top-3 text-xs text-gray-400 animate-pulse">verificando...</span>
                  )}
                  {phoneStatus.error && (
                    <span className="absolute right-2 top-3 text-xs text-destructive">{phoneStatus.error}</span>
                  )}
                  {phoneStatus.valid && !phoneStatus.error && (
                    <span className="absolute right-2 top-3 text-xs text-green-600">Disponível</span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Estado */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={handleStateChange}
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

          {/* Cidade */}
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
        {/* Categoria */}
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
        {/* Descrição dos Serviços */}
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
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Valor por hora */}
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
        {/* Termos de Uso */}
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
          disabled={isSubmitting || emailStatus.loading || phoneStatus.loading}
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
