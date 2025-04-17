import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Hammer
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const serviceCategories = [
  { name: "Faxina", icon: Sparkles, path: "/prestadores/faxina" },
  { name: "Pintura", icon: Paintbrush, path: "/prestadores/pintura" },
  { name: "Elétrica", icon: Wrench, path: "/prestadores/eletrica" },
  { name: "Hidráulica", icon: ShowerHead, path: "/prestadores/hidraulica" },
  { name: "Jardinagem", icon: Leaf, path: "/prestadores/jardinagem" },
  { name: "Montagem de Móveis", icon: Hammer, path: "/prestadores/montagem-moveis" }
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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-white"
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias Populares</h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center"
            variants={staggerContainer}
          >
            {serviceCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Link key={index} to={category.path} className="flex justify-center">
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 card-hover text-center w-full max-w-[200px]">
                    <div className="bg-chamaai-lightgray p-4 rounded-full mb-4">
                      <category.icon className="w-8 h-8 text-chamaai-blue" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

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
    </Layout>
  );
};

export default Index;
