
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

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
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><Link to="/categorias/limpeza" className="text-gray-600 hover:text-chamaai-blue">Limpeza</Link></li>
              <li><Link to="/categorias/eletrica" className="text-gray-600 hover:text-chamaai-blue">Elétrica</Link></li>
              <li><Link to="/categorias/pintura" className="text-gray-600 hover:text-chamaai-blue">Pintura</Link></li>
              <li><Link to="/categorias/hidraulica" className="text-gray-600 hover:text-chamaai-blue">Hidráulica</Link></li>
              <li><Link to="/categorias/jardinagem" className="text-gray-600 hover:text-chamaai-blue">Jardinagem</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-chamaai-blue">Como Funciona</Link></li>
              <li><Link to="/seja-um-prestador" className="text-gray-600 hover:text-chamaai-blue">Seja um Prestador</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-chamaai-blue">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-chamaai-blue">Perguntas Frequentes</Link></li>
              <li><Link to="/politica-privacidade" className="text-gray-600 hover:text-chamaai-blue">Política de Privacidade</Link></li>
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
