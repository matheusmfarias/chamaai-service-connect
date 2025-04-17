
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Paintbrush, 
  Lightbulb, 
  Droplet, 
  Hammer, 
  Leaf, 
  Wrench, 
  Briefcase, 
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
    id: "reforma",
    name: "Reforma",
    icon: <Hammer className="h-10 w-10" />,
    description: "Reformas e reparos gerais"
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
  {
    id: "servicos-gerais",
    name: "Serviços Gerais",
    icon: <Briefcase className="h-10 w-10" />,
    description: "Diversos serviços para sua casa ou empresa"
  },
];

const Categorias = () => {
  return (
    <Layout>
      <div className="container-custom py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Encontre o serviço ideal para você
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore as categorias disponíveis e conecte-se com profissionais qualificados.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={`/prestadores/${category.id}`} key={category.id}>
              <Card className="h-full card-hover transition-all border border-gray-200 hover:border-chamaai-blue overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                  <div className="mb-4 text-chamaai-blue">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categorias;
