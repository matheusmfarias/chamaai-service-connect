
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  Search, 
  FileText, 
  MessageSquare, 
  Star,
  Shield,
  Users,
  CheckSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const StepCard = ({ icon, title, description, delay, number }) => (
  <motion.div 
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    transition={{ duration: 0.5, delay }}
    className="relative"
  >
    <Card className="h-full card-hover">
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-chamaai-blue text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <CardHeader className="pb-4">
        <div className="w-16 h-16 rounded-full bg-chamaai-lightblue/20 flex items-center justify-center text-chamaai-blue mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

// Dados para os passos de clientes
const clientSteps = [
  {
    icon: <UserCheck size={28} />,
    title: 'Crie sua conta gratuitamente',
    description: 'Basta informar seu nome, e-mail, cidade e telefone. Em poucos cliques, você já pode buscar por serviços próximos.'
  },
  {
    icon: <Search size={28} />,
    title: 'Encontre profissionais da sua região',
    description: 'Busque por categoria (faxina, pintura, elétrica, etc.) ou digite o que você precisa. O sistema mostrará os profissionais mais próximos, com avaliações de outros usuários.'
  },
  {
    icon: <FileText size={28} />,
    title: 'Solicite orçamentos sem compromisso',
    description: 'Escolha um prestador e envie uma solicitação com os detalhes do que precisa. Você pode comparar valores, disponibilidade e escolher o que for melhor para você.'
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'Combine diretamente com o prestador',
    description: 'Após aceitar o orçamento, você pode conversar com o prestador para ajustar detalhes e confirmar o dia e horário.'
  },
  {
    icon: <Star size={28} />,
    title: 'Avalie o serviço após a conclusão',
    description: 'Sua avaliação ajuda a manter a comunidade segura e transparente. Quanto mais avaliações um prestador tiver, mais destaque ele ganha.'
  }
];

// Dados para os passos de prestadores
const providerSteps = [
  {
    icon: <UserCheck size={28} />,
    title: 'Cadastre-se como prestador',
    description: 'Informe seus dados e escolha as categorias que deseja atender (ex: hidráulica, reforma, elétrica). Você também pode adicionar uma descrição e fotos do seu trabalho.'
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'Receba solicitações de clientes da sua região',
    description: 'Assim que um cliente da sua área buscar por um serviço que você oferece, seu perfil será exibido. Ele poderá entrar em contato e solicitar um orçamento.'
  },
  {
    icon: <FileText size={28} />,
    title: 'Envie propostas e negocie diretamente',
    description: 'Você pode aceitar ou recusar as solicitações, enviar valores estimados e horários disponíveis.'
  },
  {
    icon: <Star size={28} />,
    title: 'Realize o serviço e ganhe visibilidade',
    description: 'Conforme for atendendo clientes, seu perfil ganhará avaliações e ficará mais bem ranqueado nas buscas.'
  }
];

const securityFeatures = [
  {
    icon: <Shield size={36} className="text-chamaai-blue" />,
    title: 'Verificação de Dados',
    description: 'Todos os prestadores passam por verificação de dados para garantir a segurança da plataforma.'
  },
  {
    icon: <Star size={36} className="text-chamaai-blue" />,
    title: 'Sistema de Avaliação',
    description: 'Clientes e prestadores se avaliam mutuamente ao final do serviço, garantindo qualidade.'
  },
  {
    icon: <CheckSquare size={36} className="text-chamaai-blue" />,
    title: 'Liberdade de Escolha',
    description: 'Você tem total liberdade para escolher com quem deseja trabalhar, sem intermediários.'
  }
];

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <motion.section 
      id="how-it-works"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-16 bg-gray-50"
    >
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
        <motion.p 
          variants={fadeIn}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Encontre o profissional certo nunca foi tão fácil. Com o ChamaAí, você está a apenas alguns cliques de resolver seu problema.
        </motion.p>

        <Tabs 
          defaultValue="clients" 
          className="mb-16"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="clients" className="text-base">
                Para Clientes
              </TabsTrigger>
              <TabsTrigger value="providers" className="text-base">
                Para Prestadores
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="clients">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clientSteps.map((step, index) => (
                <StepCard 
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={index * 0.1}
                  number={index + 1}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="providers">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {providerSteps.map((step, index) => (
                <StepCard 
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={index * 0.1}
                  number={index + 1}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Shield className="mr-2 text-chamaai-blue" />
            Segurança e Qualidade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-chamaai-blue text-white rounded-xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade ChamaAí e encontre os melhores profissionais para seus serviços 
            ou aumente sua rede de clientes como prestador.
          </p>
          <Link to="/cadastro">
            <Button size="lg" className="bg-white text-chamaai-blue hover:bg-gray-100">
              Cadastre-se gratuitamente agora
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
