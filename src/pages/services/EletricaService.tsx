
import Layout from "@/components/Layout";
import ServiceDescriptionLayout from "@/components/ServiceDescriptionLayout";
import { Lightbulb, Zap, Tool, ShieldCheck } from "lucide-react";

const EletricaService = () => {
  const benefits = [
    {
      title: "Profissionais certificados",
      description: "Eletricistas qualificados e com experiência comprovada para garantir instalações seguras.",
      icon: <Zap className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Serviço rápido e eficiente",
      description: "Resolvemos seus problemas elétricos com rapidez e precisão, minimizando transtornos.",
      icon: <Lightbulb className="w-8 h-8 text-chamaai-blue" />
    },
    {
      title: "Garantia de segurança",
      description: "Trabalhamos seguindo todas as normas técnicas para garantir instalações elétricas seguras.",
      icon: <ShieldCheck className="w-8 h-8 text-chamaai-blue" />
    }
  ];

  return (
    <Layout>
      <ServiceDescriptionLayout
        title="Serviços elétricos com qualidade e segurança"
        description="Conte com nossa rede de eletricistas qualificados para todas as suas necessidades elétricas. Desde instalações simples até projetos complexos, nossos profissionais estão preparados para oferecer soluções seguras e eficientes que atendam às normas técnicas vigentes e garantam o pleno funcionamento da sua instalação elétrica."
        benefits={benefits}
        serviceType="Elétrica"
        imageSrc="/lovable-uploads/0b558c87-f585-4b75-bdd7-c07dd66894d3.png"
      />
    </Layout>
  );
};

export default EletricaService;
