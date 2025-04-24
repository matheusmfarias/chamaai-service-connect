
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Paintbrush, 
  Wrench, 
  ShowerHead,
  Leaf,
  Hammer,
  Loader2
} from "lucide-react";
import { useCategories } from "@/hooks/useCategories";

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "limpeza":
      return Sparkles;
    case "pintura":
      return Paintbrush;
    case "eletrica":
      return Wrench;
    case "hidraulica":
      return ShowerHead;
    case "jardinagem":
      return Leaf;
    case "montagem-moveis":
      return Hammer;
    default:
      return Wrench;
  }
};

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
  const { categories, isLoading } = useCategories();

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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-chamaai-blue" />
            <span className="ml-2 text-chamaai-blue">Carregando categorias...</span>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.slug);
              return (
                <motion.div
                  key={category.id}
                  variants={fadeIn}
                  className="h-full"
                >
                  <Link to={`/servicos/${category.slug}`} className="block h-full">
                    <div className="group h-full p-6 bg-white rounded-xl border border-gray-200 hover:border-chamaai-blue hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-chamaai-lightgray p-4 rounded-lg group-hover:bg-chamaai-blue/10">
                          <IconComponent className="w-8 h-8 text-chamaai-blue" />
                        </div>
                        <h3 className="text-xl font-semibold ml-4">{category.name}</h3>
                      </div>
                      <p className="text-gray-600">
                        Serviços de {category.name.toLowerCase()} residencial e comercial
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
