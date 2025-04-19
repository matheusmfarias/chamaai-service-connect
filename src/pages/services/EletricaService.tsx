
import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";

const EletricaService = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Serviços de Elétrica
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Resolva problemas elétricos com segurança e profissionalismo. 
              O ChamaAí conecta você aos melhores eletricistas certificados 
              da sua região.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Profissionais Certificados</h3>
                <p className="text-gray-600">Eletricistas com formação técnica e experiência comprovada</p>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Serviço Garantido</h3>
                <p className="text-gray-600">Qualidade e segurança em todas as instalações</p>
              </Card>

              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Atendimento Rápido</h3>
                <p className="text-gray-600">Profissionais disponíveis para emergências</p>
              </Card>
            </div>

            <div className="bg-chamaai-blue/5 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Por que escolher o ChamaAí?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Wrench className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Mais de 5.000 instalações realizadas</h3>
                    <p className="text-gray-600">Experiência comprovada em serviços elétricos</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Wrench className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Segurança em primeiro lugar</h3>
                    <p className="text-gray-600">Profissionais seguem todas as normas técnicas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Wrench className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Orçamento transparente</h3>
                    <p className="text-gray-600">Preços justos e sem surpresas</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link to="/prestadores/eletrica">
                <Button size="lg" className="bg-chamaai-blue hover:bg-chamaai-lightblue text-lg">
                  Explorar prestadores de elétrica
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EletricaService;
