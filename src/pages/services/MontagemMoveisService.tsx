
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Hammer, Sofa, Clock, Tool } from "lucide-react";

const MontagemMoveisService = () => {
  const benefits = [
    {
      title: "Montagem profissional",
      description: "Garantimos a montagem correta e segura de todos os seus móveis, com acabamento perfeito.",
      icon: <Hammer className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Economia de tempo",
      description: "Esqueça o estresse de montar móveis complexos e deixe isso com nossos especialistas.",
      icon: <Clock className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Ferramentas adequadas",
      description: "Nossos profissionais possuem todas as ferramentas necessárias para montagem eficiente.",
      icon: <Tool className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Montagem de móveis com precisão e qualidade"
        description="Transforme sua casa ou escritório sem preocupações com nosso serviço especializado de montagem de móveis. Nossos profissionais têm experiência com diversos tipos de mobiliário e garantem uma montagem precisa, segura e com acabamento perfeito. Economize tempo e evite o estresse de lidar com manuais complexos e peças pequenas."
        benefits={benefits}
        serviceType="Montagem de Móveis"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default MontagemMoveisService;
