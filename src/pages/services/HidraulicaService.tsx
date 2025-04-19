
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Droplet, ShowerHead, Tool, ThumbsUp } from "lucide-react";

const HidraulicaService = () => {
  const benefits = [
    {
      title: "Solução rápida de problemas",
      description: "Atendimento ágil para resolver vazamentos, entupimentos e outros problemas hidráulicos.",
      icon: <Droplet className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Profissionais experientes",
      description: "Encanadores qualificados para lidar com todos os tipos de instalações e reparos hidráulicos.",
      icon: <ShowerHead className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Materiais de qualidade",
      description: "Utilizamos peças e materiais confiáveis para garantir durabilidade e evitar problemas futuros.",
      icon: <Tool className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Serviços hidráulicos para resolver qualquer problema"
        description="Conte com nossa rede de profissionais especializados para solucionar todos os tipos de problemas hidráulicos. Oferecemos serviços de reparo, instalação e manutenção para garantir o perfeito funcionamento dos sistemas hidráulicos da sua casa ou empresa. Com atendimento rápido e soluções eficientes, eliminamos vazamentos, entupimentos e outros problemas comuns."
        benefits={benefits}
        serviceType="Hidráulica"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default HidraulicaService;
