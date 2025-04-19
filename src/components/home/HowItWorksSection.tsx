
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileCheck, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const howItWorks = [
  {
    title: "Descreva o serviço",
    description: "Conte-nos o que precisa ser feito e encontre profissionais qualificados.",
    icon: FileCheck
  },
  {
    title: "Compare orçamentos",
    description: "Receba e compare propostas de prestadores verificados.",
    icon: MessageCircle
  },
  {
    title: "Contrate com segurança",
    description: "Escolha o melhor prestador e agende o serviço rapidamente.",
    icon: Trash2
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HowItWorksSection = () => {
  return (
    <>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gray-50"
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
          <motion.p 
            variants={fadeIn}
            className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
          >
            Encontrar o profissional certo nunca foi tão fácil. Com o ChamaAí, você está a apenas alguns cliques de resolver seu problema.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 card-hover">
                  <div className="bg-chamaai-lightgray p-4 rounded-full inline-block mb-4">
                    <step.icon className="w-6 h-6 text-chamaai-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link to="/como-funciona">
              <Button variant="outline" className="border-chamaai-blue text-chamaai-blue">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white"
      >
        <div className="container-custom text-center">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-6"
          >
            Pronto para simplificar sua vida?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8"
          >
            Junte-se a milhares de pessoas que já estão usando o ChamaAí para encontrar os melhores profissionais para seus serviços.
          </motion.p>
          <motion.div 
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/cadastro?type=cliente">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-chamaai-blue hover:bg-gray-100"
              >
                Quero Contratar Serviços
              </Button>
            </Link>
            <Link to="/cadastro?type=prestador">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-chamaai-blue hover:bg-gray-100"
              >
                Quero Oferecer Serviços
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default HowItWorksSection;
