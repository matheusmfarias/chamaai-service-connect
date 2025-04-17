import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Paintbrush,
  Wrench,
  ShowerHead,
  Sparkles,
  FileCheck,
  MessageCircle,
  Trash2,
  Leaf,
  Lightbulb,
  Droplet
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const serviceCategories = [
  { name: "Faxina", icon: Sparkles, path: "/prestadores/faxina" },
  { name: "Pintura", icon: Paintbrush, path: "/prestadores/pintura" },
  { name: "Elétrica", icon: Wrench, path: "/prestadores/eletrica" },
  { name: "Hidráulica", icon: ShowerHead, path: "/prestadores/hidraulica" },
  { name: "Jardinagem", icon: Leaf, path: "/prestadores/jardinagem" }
];

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

const categories = [
  {
    id: "faxina",
    name: "Faxina",
    icon: <Sparkles className="h-10 w-10" />,
    description: "Serviços de limpeza para residências e escritórios"
  },
  {
    id: "pintura",
    name: "Pintura",
    icon: <Paintbrush className="h-10 w-10" />,
    description: "Serviços de pintura interna e externa"
  },
  {
    id: "eletrica",
    name: "Elétrica",
    icon: <Lightbulb className="h-10 w-10" />,
    description: "Instalações e reparos elétricos"
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    icon: <Droplet className="h-10 w-10" />,
    description: "Reparos e instalações hidráulicas"
  },
  {
    id: "jardinagem",
    name: "Jardinagem",
    icon: <Leaf className="h-10 w-10" />,
    description: "Manutenção e criação de jardins"
  },
  {
    id: "montagem-moveis",
    name: "Montagem de Móveis",
    icon: <Wrench className="h-10 w-10" />,
    description: "Montagem e desmontagem de móveis"
  }
];

const clientSteps = [
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

const securityFeatures = [
  {
    title: "Segurança",
    description: "Todos os profissionais são verificados e certificados.",
    icon: <Lightbulb className="h-10 w-10" />
  },
  {
    title: "Qualidade",
    description: "Os serviços são garantidos e de alta qualidade.",
    icon: <Droplet className="h-10 w-10" />
  },
  {
    title: "Confiabilidade",
    description: "O sistema é seguro e protege suas informações.",
    icon: <Leaf className="h-10 w-10" />
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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Layout>
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white py-16"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="space-y-6"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold">Encontre o serviço que você precisa</h1>
              <p className="text-xl">
                Conectamos você com os melhores profissionais da sua região para resolver qualquer problema do dia a dia.
              </p>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="O que você precisa? Ex: Pintura, Faxina, Elétrica..."
                  className="bg-white text-gray-800 pl-10 pr-4 py-6 rounded-lg w-full focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-chamaai-blue hover:bg-chamaai-lightblue"
                >
                  Buscar
                </Button>
              </form>
              <div className="flex flex-wrap gap-4">
                <Link to="/cadastro?type=cliente">
                  <Button variant="secondary" className="bg-white text-chamaai-blue hover:bg-gray-100">
                    Sou Cliente
                  </Button>
                </Link>
                <Link to="/cadastro?type=prestador">
                  <Button variant="secondary" className="bg-white text-chamaai-blue hover:bg-gray-100">
                    Sou Prestador de Serviço
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png" 
                alt="Serviços e Prestadores" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="categorias"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-white"
      >
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Encontre o serviço ideal para você
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore as categorias disponíveis e conecte-se com profissionais qualificados.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/prestadores/${category.id}`}>
                  <Card className="h-full card-hover transition-all border border-gray-200 hover:border-chamaai-blue overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-chamaai-lightblue/20 flex items-center justify-center text-chamaai-blue">
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="como-funciona"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-b from-chamaai-lightblue/10 to-white"
      >
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-chamaai-blue">Como Funciona o ChamaAí</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conectamos clientes a prestadores de serviços de forma simples, segura e eficiente.
              Veja como nosso sistema funciona na prática.
            </p>
          </motion.div>

          {/* Client Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {clientSteps.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full card-hover">
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-chamaai-blue text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-chamaai-lightblue/20 flex items-center justify-center text-chamaai-blue mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Security Features */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Segurança e Qualidade</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-chamaai-lightblue/20 flex items-center justify-center text-chamaai-blue mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
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
    </Layout>
  );
};

export default Index;
