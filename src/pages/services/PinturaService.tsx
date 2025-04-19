
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Paintbrush, Palette, Award, CheckCircle } from "lucide-react";

const PinturaService = () => {
  const benefits = [
    {
      title: "Acabamento perfeito",
      description: "Profissionais com técnica apurada que garantem um acabamento impecável em cada projeto.",
      icon: <Paintbrush className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Materiais de qualidade",
      description: "Trabalhamos com as melhores tintas e materiais do mercado para um resultado duradouro.",
      icon: <Palette className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Expertise e pontualidade",
      description: "Seu projeto será entregue no prazo combinado e com a qualidade que você merece.",
      icon: <Award className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Renove seus ambientes com serviços de pintura profissional"
        description="Transforme completamente seus espaços com nossos serviços de pintura. Nossos pintores profissionais combinam técnica, experiência e materiais de qualidade para garantir um acabamento impecável e duradouro. Seja para renovar o visual da sua casa ou para um projeto comercial, oferecemos soluções personalizadas que atendem às suas necessidades."
        benefits={benefits}
        serviceType="Pintura"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default PinturaService;
