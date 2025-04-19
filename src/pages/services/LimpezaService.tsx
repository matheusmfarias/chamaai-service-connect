import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const LimpezaService = () => {
  const navigate = useNavigate();

  const handleExploreProviders = () => {
    navigate('/busca?q=limpeza');
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
              Serviços de Limpeza Profissional
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Encontre profissionais qualificados para manter sua casa ou escritório 
              impecável. O ChamaAí conecta você aos melhores prestadores de serviço 
              de limpeza da sua região.
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Profissionais Verificados</h3>
                <p className="text-gray-600">Todos os prestadores passam por verificação de antecedentes</p>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Avaliações Reais</h3>
                <p className="text-gray-600">Feedbacks de clientes que já utilizaram o serviço</p>
              </Card>

              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 text-chamaai-blue" />
                <h3 className="font-semibold mb-2">Agendamento Flexível</h3>
                <p className="text-gray-600">Escolha o melhor horário para você</p>
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
                  <Sparkles className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Mais de 10.000 limpezas realizadas</h3>
                    <p className="text-gray-600">Experiência comprovada em conectar clientes a profissionais</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Garantia de satisfação</h3>
                    <p className="text-gray-600">Suporte completo durante todo o processo</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 mt-1 mr-3 text-chamaai-blue" />
                  <div>
                    <h3 className="font-semibold">Preços transparentes</h3>
                    <p className="text-gray-600">Sem surpresas ou taxas escondidas</p>
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
                Explorar prestadores de limpeza
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default LimpezaService;
