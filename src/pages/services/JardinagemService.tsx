
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Leaf, Flower2, Sun, TreePine } from "lucide-react";

const JardinagemService = () => {
  const benefits = [
    {
      title: "Ambientes mais bonitos",
      description: "Transforme seu jardim em um espaço verde encantador e bem cuidado.",
      icon: <Flower2 className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Manutenção regular",
      description: "Serviços contínuos para manter seu jardim sempre saudável e bonito ao longo do ano.",
      icon: <Leaf className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Soluções sustentáveis",
      description: "Práticas ecológicas que respeitam o meio ambiente e valorizam seu espaço.",
      icon: <TreePine className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Jardinagem profissional para transformar seus espaços verdes"
        description="Cultive a beleza natural com nossos serviços de jardinagem profissional. Nossos especialistas cuidam do seu jardim com dedicação e conhecimento técnico, garantindo plantas saudáveis e espaços verdes harmoniosos. Oferecemos desde manutenção básica até projetos paisagísticos completos, sempre respeitando as características do seu espaço e suas preferências pessoais."
        benefits={benefits}
        serviceType="Jardinagem"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default JardinagemService;
