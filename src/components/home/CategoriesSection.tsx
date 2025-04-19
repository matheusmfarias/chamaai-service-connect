
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
  { name: "Limpeza", icon: Sparkles, path: "/servicos/limpeza" },
  { name: "Pintura", icon: Paintbrush, path: "/servicos/pintura" },
  { name: "Elétrica", icon: Wrench, path: "/servicos/eletrica" },
  { name: "Hidráulica", icon: ShowerHead, path: "/servicos/hidraulica" },
  { name: "Jardinagem", icon: Leaf, path: "/servicos/jardinagem" },
  { name: "Montagem de Móveis", icon: Hammer, path: "/servicos/montagem-moveis" }
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
        <h2 className="text-3xl font-bold text-center mb-12">Categorias Populares</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center"
          variants={staggerContainer}
        >
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="w-full max-w-[200px]"
            >
              <Link to={category.path} className="block h-full">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 h-full">
                  <div className="bg-chamaai-lightgray p-4 rounded-full mb-4">
                    <category.icon className="w-8 h-8 text-chamaai-blue" />
                  </div>
                  <h3 className="font-medium text-center">{category.name}</h3>
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
