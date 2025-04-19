
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Paintbrush, 
  Lightbulb, 
  Droplet, 
  Wrench, 
  Leaf, 
  Sparkles 
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const categories: CategoryItem[] = [
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
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Categorias = () => {
  return (
    <Layout>
      <div className="container-custom py-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Encontre o serviço ideal para você
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore as categorias disponíveis e conecte-se com profissionais qualificados.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial="hidden"
              animate="visible"
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
    </Layout>
  );
};

export default Categorias;
