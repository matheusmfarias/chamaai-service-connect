
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Paintbrush, 
  Wrench, 
  ShowerHead,
  Leaf,
  Hammer
} from "lucide-react";

const serviceCategories = [
  { name: "Limpeza", icon: Sparkles, description: "Serviços de limpeza residencial e comercial", path: "/servicos/limpeza" },
  { name: "Pintura", icon: Paintbrush, description: "Pintura de interiores e exteriores", path: "/servicos/pintura" },
  { name: "Elétrica", icon: Wrench, description: "Instalações e reparos elétricos", path: "/servicos/eletrica" },
  { name: "Hidráulica", icon: ShowerHead, description: "Reparos e instalações hidráulicas", path: "/servicos/hidraulica" },
  { name: "Jardinagem", icon: Leaf, description: "Manutenção e paisagismo de jardins", path: "/servicos/jardinagem" },
  { name: "Montagem de Móveis", icon: Hammer, description: "Montagem e desmontagem de móveis", path: "/servicos/montagem-moveis" }
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

const CategoriesSection = () => {
  return (
    <motion.section 
      id="categories"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-16 bg-white"
    >
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-4">Categorias de Serviços</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Encontre profissionais qualificados para todos os tipos de serviços
        </p>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="h-full"
            >
              <Link to={category.path} className="block h-full">
                <div className="group h-full p-6 bg-white rounded-xl border border-gray-200 hover:border-chamaai-blue hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-chamaai-lightgray p-4 rounded-lg group-hover:bg-chamaai-blue/10">
                      <category.icon className="w-8 h-8 text-chamaai-blue" />
                    </div>
                    <h3 className="text-xl font-semibold ml-4">{category.name}</h3>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
