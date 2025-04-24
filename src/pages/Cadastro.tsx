
import { useState } from "react";
import Layout from "@/components/Layout";
import ClientSignUpForm from "./cadastro/ClientSignUpForm";
import ProviderSignUpForm from "./cadastro/ProviderSignUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

              {/* Client Form Tab */}
              <TabsContent value="client">
                <ClientSignUpForm />
              </TabsContent>

              {/* Provider Form Tab */}
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
