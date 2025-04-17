
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  Search, 
  FileText, 
  MessageSquare, 
  Star,
  Briefcase,
  Bell,
  Send,
  CheckCircle,
  BarChart,
  Shield,
  Users,
  CheckSquare
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ComoFunciona = () => {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <Layout>
      <div className="bg-gradient-to-b from-chamaai-lightblue/10 to-white py-16">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-chamaai-blue">Como Funciona o ChamaAí</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conectamos clientes a prestadores de serviços de forma simples, segura e eficiente.
              Veja como nosso sistema funciona na prática.
            </p>
          </motion.div>

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

            {/* Conteúdo para Clientes */}
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

            {/* Conteúdo para Prestadores */}
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
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
      </div>
    </Layout>
  );
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
    icon: <Briefcase size={28} />,
    title: 'Cadastre-se como prestador',
    description: 'Informe seus dados e escolha as categorias que deseja atender (ex: hidráulica, reforma, elétrica). Você também pode adicionar uma descrição e fotos do seu trabalho.'
  },
  {
    icon: <Bell size={28} />,
    title: 'Receba solicitações de clientes da sua região',
    description: 'Assim que um cliente da sua área buscar por um serviço que você oferece, seu perfil será exibido. Ele poderá entrar em contato e solicitar um orçamento.'
  },
  {
    icon: <Send size={28} />,
    title: 'Envie propostas e negocie diretamente',
    description: 'Você pode aceitar ou recusar as solicitações, enviar valores estimados e horários disponíveis.'
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Realize o serviço e ganhe visibilidade',
    description: 'Conforme for atendendo clientes, seu perfil ganhará avaliações e ficará mais bem ranqueado nas buscas.'
  },
  {
    icon: <BarChart size={28} />,
    title: 'Gerencie seus atendimentos',
    description: 'Tenha acesso a um painel com suas solicitações, históricos e avaliações, tudo em um só lugar.'
  }
];

// Dados para recursos de segurança
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

// Dados para perguntas frequentes
const faqItems = [
  {
    question: 'O cadastro no ChamaAí é realmente gratuito?',
    answer: 'Sim, o cadastro na plataforma é 100% gratuito tanto para clientes quanto para prestadores de serviço. Não cobramos mensalidades ou taxas para utilizar o sistema básico.'
  },
  {
    question: 'Como sei que o prestador é confiável?',
    answer: 'Todos os prestadores passam por uma verificação de dados e possuem avaliações de outros clientes. Quanto mais avaliações positivas, mais confiável é o prestador. Além disso, você pode conversar diretamente com o prestador antes de fechar o serviço.'
  },
  {
    question: 'Como funciona o pagamento pelos serviços?',
    answer: 'O ChamaAí é uma plataforma de conexão entre clientes e prestadores. O pagamento é combinado diretamente entre vocês, sem nossa intermediação. Isso dá mais liberdade para ambas as partes negociarem valores e formas de pagamento.'
  },
  {
    question: 'Posso cancelar uma solicitação de serviço?',
    answer: 'Sim, você pode cancelar uma solicitação a qualquer momento antes de confirmar o serviço. Após a confirmação, recomendamos que entre em contato diretamente com o prestador para verificar a possibilidade de cancelamento.'
  },
  {
    question: 'Como prestador, preciso pagar alguma taxa por serviço?',
    answer: 'Não, o ChamaAí não cobra taxas por serviço ou comissões sobre o valor cobrado. Você recebe 100% do valor acordado diretamente com o cliente.'
  }
];

export default ComoFunciona;
