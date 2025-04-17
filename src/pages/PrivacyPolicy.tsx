
import { Layout } from "@/components/Layout";
import { Shield, Database, Users, Share2, Lock, User, Cookie, FileText, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="space-y-12">
          <Section icon={<Shield />} title="1. Introdução">
            O ChamaAí valoriza a privacidade e a segurança dos dados dos seus usuários. Esta política explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
          </Section>

          <Section icon={<Database />} title="2. Quais dados coletamos?">
            <p>Coletamos dados fornecidos por você no momento do cadastro ou uso da plataforma, como:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>E-mail</li>
              <li>Telefone</li>
              <li>Cidade e estado</li>
              <li>Informações sobre os serviços solicitados ou oferecidos</li>
            </ul>
          </Section>

          <Section icon={<Users />} title="3. Como usamos seus dados?">
            <p>Seus dados são utilizados para:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Permitir o funcionamento da plataforma</li>
              <li>Conectar clientes a prestadores de serviço</li>
              <li>Enviar comunicações sobre atualizações ou atendimentos</li>
              <li>Melhorar a experiência dos usuários</li>
              <li>Prevenir fraudes e garantir segurança</li>
            </ul>
          </Section>

          <Section icon={<Share2 />} title="4. Compartilhamento de dados">
            Não vendemos nem compartilhamos seus dados com terceiros, exceto quando necessário para o funcionamento da plataforma (ex: envio de e-mail) ou exigido por lei.
          </Section>

          <Section icon={<Lock />} title="5. Segurança">
            Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, alterações ou vazamentos. A hospedagem é feita em ambiente seguro com parceiros confiáveis.
          </Section>

          <Section icon={<User />} title="6. Direitos do usuário">
            <p>Você pode, a qualquer momento:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Solicitar acesso aos seus dados</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Retirar consentimento sobre o uso de informações</li>
            </ul>
            <p className="mt-2">Basta entrar em contato conosco através da página de suporte ou e-mail.</p>
          </Section>

          <Section icon={<Cookie />} title="7. Uso de cookies">
            Utilizamos cookies para melhorar a navegação, armazenar preferências e entender como os usuários interagem com a plataforma. Você pode desativar os cookies no seu navegador a qualquer momento.
          </Section>

          <Section icon={<FileText />} title="8. Atualizações desta política">
            Esta política pode ser atualizada para refletir mudanças na legislação ou nos nossos serviços. Notificaremos os usuários em caso de alterações relevantes.
          </Section>

          <Section icon={<Mail />} title="9. Fale Conosco">
            Se tiver dúvidas sobre esta política ou sobre o uso de seus dados, entre em contato pelo e-mail: <a href="mailto:contato@chamaai.com" className="text-chamaai-blue hover:underline">contato@chamaai.com</a>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

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

export default PrivacyPolicy;
