
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Sparkles, Clock, Shield, CheckCircle } from "lucide-react";

const LimpezaService = () => {
  const benefits = [
    {
      title: "Qualidade profissional",
      description: "Profissionais treinados e qualificados para oferecer um serviço de limpeza impecável.",
      icon: <Sparkles className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Economia de tempo",
      description: "Dedique seu tempo ao que realmente importa, enquanto nossos profissionais cuidam da limpeza.",
      icon: <Clock className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Segurança garantida",
      description: "Todos os profissionais são verificados e avaliados pela comunidade ChamaAí.",
      icon: <Shield className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Serviços de Limpeza profissionais para seu lar"
        description="Transforme seu ambiente com nossos serviços de limpeza de alta qualidade. Seja para sua casa ou escritório, nossos profissionais especializados garantem um espaço limpo, organizado e saudável. Com equipamentos modernos e produtos de qualidade, oferecemos resultados excepcionais que superam suas expectativas."
        benefits={benefits}
        serviceType="Limpeza"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default LimpezaService;
