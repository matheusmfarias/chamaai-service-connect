
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
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
  );
};

export default HeroSection;
