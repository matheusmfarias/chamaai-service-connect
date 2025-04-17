import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect } from "react";

const Footer = () => {
  const navigate = useNavigate();

  // Function to handle navigation and scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

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
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><Link to="/prestadores/limpeza" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Limpeza</Link></li>
              <li><Link to="/prestadores/eletrica" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Elétrica</Link></li>
              <li><Link to="/prestadores/pintura" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Pintura</Link></li>
              <li><Link to="/prestadores/hidraulica" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Hidráulica</Link></li>
              <li><Link to="/prestadores/jardinagem" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Jardinagem</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Como Funciona</Link></li>
              <li><Link to="/cadastro" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Seja um Prestador</Link></li>
              <li><Link to="/sobre" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Sobre Nós</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-chamaai-blue" onClick={() => window.scrollTo(0, 0)}>Perguntas Frequentes</Link></li>
              <li><span className="text-gray-400 cursor-not-allowed">Política de Privacidade</span></li>
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
