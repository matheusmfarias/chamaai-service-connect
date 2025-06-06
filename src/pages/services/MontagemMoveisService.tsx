import React from "react";
import { useNavigate } from "react-router-dom";
import { Hammer, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const MontagemMoveisService = () => {
  const navigate = useNavigate();

  const handleExploreProviders = () => {
    navigate('/busca?q=montagem');
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
              Montagem de Móveis
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Monte seus móveis com segurança e precisão. 
              O ChamaAí conecta você aos melhores montadores 
              profissionais da sua região.
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Montadores Experientes</h3>
                <p className="text-gray-600">Profissionais especializados em diversas marcas</p>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Montagem Perfeita</h3>
                <p className="text-gray-600">Garantia de qualidade no serviço</p>
              </Card>

              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Agilidade</h3>
                <p className="text-gray-600">Serviço rápido e eficiente</p>
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
                  <Hammer className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Mais de 8.000 móveis montados</h3>
                    <p className="text-gray-600">Experiência com diferentes tipos de móveis</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Hammer className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Ferramentas adequadas</h3>
                    <p className="text-gray-600">Equipamento profissional para cada tipo de móvel</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Hammer className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Garantia na montagem</h3>
                    <p className="text-gray-600">Segurança e qualidade garantidas</p>
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
                Explorar prestadores de montagem
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default MontagemMoveisService;
