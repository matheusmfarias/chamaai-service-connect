
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-chamaai-blue">ChamaAí</h3>
            <p className="text-gray-600">
              Conectamos você aos melhores profissionais para realizar os serviços que você precisa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-chamaai-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-chamaai-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-chamaai-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><Link to="/servicos/limpeza" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Limpeza</Link></li>
              <li><Link to="/servicos/eletrica" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Elétrica</Link></li>
              <li><Link to="/servicos/pintura" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Pintura</Link></li>
              <li><Link to="/servicos/hidraulica" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Hidráulica</Link></li>
              <li><Link to="/servicos/jardinagem" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Jardinagem</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Como Funciona</Link></li>
              <li><Link to="/sobre" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Sobre Nós</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Perguntas Frequentes</Link></li>
              <li><Link to="/privacidade" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Política de Privacidade</Link></li>
              <li><Link to="/termos" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Termos de Uso</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">contato@chamaai.com</li>
              <li className="text-gray-600">(11) 9999-9999</li>
              <li className="text-gray-600">São Paulo, Brasil</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ChamaAí. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
