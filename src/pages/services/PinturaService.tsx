import React from "react";
import { useNavigate } from "react-router-dom";
import { Paintbrush, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const PinturaService = () => {
  const navigate = useNavigate();

  const handleExploreProviders = () => {
    navigate('/busca?q=pintura');
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="container-custom py-12"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Serviços de Pintura
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Renove os ambientes da sua casa ou escritório com profissionais 
              especializados em pintura. O ChamaAí conecta você aos melhores 
              pintores da sua região.
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Profissionais Qualificados</h3>
                <p className="text-gray-600">Pintores com anos de experiência no mercado</p>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Acabamento Perfeito</h3>
                <p className="text-gray-600">Qualidade garantida em cada projeto</p>
              </Card>

              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Prazo Garantido</h3>
                <p className="text-gray-600">Compromisso com o cronograma estabelecido</p>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-chamaai-blue/5 rounded-2xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Por que escolher o ChamaAí?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Paintbrush className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Mais de 3.000 projetos concluídos</h3>
                    <p className="text-gray-600">Experiência em diversos tipos de pintura</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Paintbrush className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Materiais de qualidade</h3>
                    <p className="text-gray-600">Apenas produtos de marcas reconhecidas</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Paintbrush className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Orçamento detalhado</h3>
                    <p className="text-gray-600">Transparência em todos os custos</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <Button 
                size="lg" 
                className="bg-chamaai-blue hover:bg-chamaai-lightblue text-lg"
                onClick={handleExploreProviders}
              >
                Explorar prestadores de pintura
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default PinturaService;
