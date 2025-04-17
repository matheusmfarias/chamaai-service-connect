
import Layout from "@/components/Layout";
import { FileText, Users, Shield, BookOpen, UserCheck, Star, AlertTriangle, PenLine, Mail } from "lucide-react";

const Section = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-chamaai-blue">{icon}</div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
};

const TermosDeUso = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="space-y-12">
          <Section icon={<Shield />} title="1. Aceitação dos Termos">
            Ao acessar ou utilizar o ChamaAí, você concorda com estes Termos de Uso. Caso não concorde com qualquer parte, não utilize a plataforma.
          </Section>

          <Section icon={<BookOpen />} title="2. Descrição do Serviço">
            <p>
              O ChamaAí é uma plataforma que conecta pessoas que precisam de serviços cotidianos (como faxina, pintura, elétrica, etc.) com prestadores de serviço autônomos. A plataforma atua como intermediadora da conexão, mas <strong>não executa os serviços</strong> e <strong>não é responsável pela relação contratual direta entre as partes</strong>.
            </p>
          </Section>

          <Section icon={<Users />} title="3. Cadastro de Usuário">
            <p>Para utilizar a plataforma, o usuário deve se cadastrar fornecendo dados reais e atualizados. O usuário é responsável pela veracidade das informações fornecidas.</p>
            <p className="mt-4">Existem dois tipos de contas:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Cliente:</strong> pessoa que contrata os serviços</li>
              <li><strong>Prestador de Serviço:</strong> pessoa que oferece os serviços</li>
            </ul>
            <p className="mt-4">O ChamaAí se reserva o direito de suspender ou excluir contas que apresentem comportamento inadequado, fraudulento ou violem estes termos.</p>
          </Section>

          <Section icon={<UserCheck />} title="4. Responsabilidades das Partes">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Clientes:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Informar corretamente suas necessidades ao solicitar serviços</li>
                  <li>Tratar os prestadores com respeito e cordialidade</li>
                  <li>Efetuar pagamentos conforme acordado com o prestador</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Prestadores:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Cumprir os serviços com qualidade e no prazo acordado</li>
                  <li>Manter uma comunicação clara com os clientes</li>
                  <li>Ser transparente quanto ao valor cobrado e serviços prestados</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ChamaAí:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Facilitar a conexão entre cliente e prestador</li>
                  <li>Garantir um ambiente digital seguro e funcional</li>
                  <li>Zelar pelo cumprimento das boas práticas e diretrizes da plataforma</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section icon={<Star />} title="5. Avaliações e Comentários">
            Usuários podem avaliar uns aos outros após a realização do serviço. O ChamaAí se reserva o direito de remover comentários ofensivos, discriminatórios ou falsos.
          </Section>

          <Section icon={<AlertTriangle />} title="6. Uso Indevido">
            É proibido utilizar a plataforma para fins ilícitos, assédio, fraudes ou qualquer prática que viole leis, regulamentos ou direitos de terceiros.
          </Section>

          <Section icon={<PenLine />} title="7. Alterações nos Termos">
            O ChamaAí poderá atualizar estes Termos de Uso a qualquer momento. Recomendamos a leitura periódica. Mudanças relevantes serão comunicadas aos usuários.
          </Section>

          <Section icon={<Shield />} title="8. Cancelamento de Conta">
            O usuário pode, a qualquer momento, solicitar o cancelamento de sua conta por meio do e-mail de contato da plataforma.
          </Section>

          <Section icon={<Mail />} title="9. Contato">
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail: <a href="mailto:contato@chamaai.com" className="text-chamaai-blue hover:underline">contato@chamaai.com</a>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default TermosDeUso;
