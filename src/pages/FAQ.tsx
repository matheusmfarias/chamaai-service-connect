import { ChevronDown, User, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import FAQQuestionForm from "@/components/FAQQuestionForm";

const FAQ = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h1>
        
        {/* Clients Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Para Clientes</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Como encontro um prestador de serviço?
              </AccordionTrigger>
              <AccordionContent>
                Você pode buscar por categoria ou digitar o que precisa na barra de busca. 
                Mostraremos os profissionais mais próximos da sua região, com base na sua localização.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Preciso pagar para usar a plataforma?
              </AccordionTrigger>
              <AccordionContent>
                Não. O uso do ChamaAí é gratuito para clientes. Você só paga pelo serviço contratado diretamente ao prestador.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Como funciona o agendamento do serviço?
              </AccordionTrigger>
              <AccordionContent>
                Após encontrar um prestador e enviar a solicitação, vocês podem combinar o melhor dia e horário diretamente pela plataforma.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Posso confiar nos prestadores?
              </AccordionTrigger>
              <AccordionContent>
                Sim. Todos os prestadores passam por uma verificação inicial. 
                Além disso, você pode consultar avaliações feitas por outros clientes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                O que acontece se o prestador não comparecer?
              </AccordionTrigger>
              <AccordionContent>
                Você pode registrar uma reclamação pelo nosso suporte. 
                Isso impacta diretamente na reputação do prestador na plataforma.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Service Providers Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Para Prestadores de Serviço</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="p1" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Como me cadastro como prestador?
              </AccordionTrigger>
              <AccordionContent>
                Basta criar uma conta, selecionar a opção "Sou Prestador de Serviço" e 
                preencher seus dados e categorias de atuação.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="p2" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                A plataforma cobra comissão?
              </AccordionTrigger>
              <AccordionContent>
                Atualmente, o cadastro e o recebimento de solicitações são gratuitos. 
                Futuramente, poderá haver planos com benefícios extras.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="p3" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Como recebo pelas tarefas realizadas?
              </AccordionTrigger>
              <AccordionContent>
                O pagamento é combinado diretamente entre você e o cliente. 
                A plataforma ainda não intermedia os pagamentos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="p4" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Posso recusar uma solicitação de serviço?
              </AccordionTrigger>
              <AccordionContent>
                Sim. Você tem liberdade para aceitar ou recusar solicitações, 
                de acordo com sua disponibilidade.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="p5" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                Como consigo mais visibilidade no ChamaAí?
              </AccordionTrigger>
              <AccordionContent>
                Mantenha seu perfil completo, responda com rapidez e ofereça um bom atendimento. 
                Avaliações positivas aumentam seu destaque nas buscas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <FAQQuestionForm />
      </div>
    </Layout>
  );
};

export default FAQ;
