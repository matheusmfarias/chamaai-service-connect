import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Leaf 
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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <section className="bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Encontre o serviço que você precisa</h1>
              <p className="text-xl">
                Conectamos você com os melhores profissionais da sua região para resolver qualquer problema do dia a dia.
              </p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="O que você precisa? Ex: Pintura, Faxina, Elétrica..."
                  className="bg-white text-gray-800 pl-10 pr-4 py-6 rounded-lg w-full focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-chamaai-blue hover:bg-chamaai-lightblue">
                  Buscar
                </Button>
              </div>
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
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Serviços domésticos" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {serviceCategories.map((category, index) => (
              <Link key={index} to={category.path} className="flex justify-center">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 card-hover text-center w-full max-w-[200px]">
                  <div className="bg-chamaai-lightgray p-4 rounded-full mb-4">
                    <category.icon className="w-8 h-8 text-chamaai-blue" />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Encontrar o profissional certo nunca foi tão fácil. Com o ChamaAí, você está a apenas alguns cliques de resolver seu problema.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100 card-hover">
                <div className="bg-chamaai-lightgray p-4 rounded-full inline-block mb-4">
                  <step.icon className="w-6 h-6 text-chamaai-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/como-funciona">
              <Button variant="outline" className="border-chamaai-blue text-chamaai-blue">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-chamaai-blue to-chamaai-lightblue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para simplificar sua vida?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Junte-se a milhares de pessoas que já estão usando o ChamaAí para encontrar os melhores profissionais para seus serviços.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
