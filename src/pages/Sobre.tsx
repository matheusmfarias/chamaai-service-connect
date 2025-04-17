import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock, Users, Eye, Mail } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
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

const Sobre = () => {
  const ourValues = [
    {
      title: "Confiança",
      description: "Cada prestador passa por verificação.",
      icon: ShieldCheck,
    },
    {
      title: "Praticidade",
      description: "Encontre ajuda com poucos cliques.",
      icon: Clock,
    },
    {
      title: "Acessibilidade",
      description: "Serviços para todos os perfis e bolsos.",
      icon: Users,
    },
    {
      title: "Transparência",
      description: "Avaliações reais, comunicação direta.",
      icon: Eye,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white py-20">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold">Conectando pessoas com soluções reais para o dia a dia</h1>
            <p className="text-xl">
              No ChamaAí, acreditamos que ninguém deve ficar na mão. Nossa missão é facilitar o encontro entre quem precisa de ajuda e quem pode oferecer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Nossa Missão</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Queremos simplificar a vida das pessoas ao conectar clientes a profissionais confiáveis para serviços essenciais. Do conserto ao cuidado, oferecemos uma ponte segura e prática para resolver tarefas do dia a dia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold">Nossos Valores</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Princípios que guiam nossas decisões e nosso compromisso com você.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ourValues.map((value, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div className="bg-chamaai-lightgray p-4 rounded-full mb-6">
                      <value.icon className="w-8 h-8 text-chamaai-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-8">Quem Somos</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              O ChamaAí nasceu da necessidade real de encontrar bons profissionais de forma rápida e segura. Somos um time apaixonado por tecnologia e por soluções humanas. Trabalhamos todos os dias para oferecer uma plataforma confiável, simples e justa para todos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Entre em Contato */}
      <section className="py-16 bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Quer Falar com a Gente?</h2>
            <p className="text-xl mb-8">
              Estamos sempre abertos a sugestões, dúvidas e parcerias. Entre em contato e vamos conversar!
            </p>
            <Link to="/contato">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-chamaai-blue hover:bg-gray-100 group"
              >
                <Mail className="mr-2 group-hover:rotate-12 transition-transform" /> Entre em contato
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
