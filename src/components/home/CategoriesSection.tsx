
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
  { name: "Faxina", icon: Sparkles, path: "/prestadores/faxina" },
  { name: "Pintura", icon: Paintbrush, path: "/prestadores/pintura" },
  { name: "Elétrica", icon: Wrench, path: "/prestadores/eletrica" },
  { name: "Hidráulica", icon: ShowerHead, path: "/prestadores/hidraulica" },
  { name: "Jardinagem", icon: Leaf, path: "/prestadores/jardinagem" },
  { name: "Montagem de Móveis", icon: Hammer, path: "/prestadores/montagem-moveis" }
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
              <Link to={category.path} className="flex justify-center">
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
  );
};

export default CategoriesSection;
