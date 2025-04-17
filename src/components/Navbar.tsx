
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with Supabase auth

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-chamaai-blue font-bold text-2xl">ChamaAí</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/como-funciona" className="text-gray-600 hover:text-chamaai-blue">
            Como Funciona
          </Link>
          <Link to="/categorias" className="text-gray-600 hover:text-chamaai-blue">
            Categorias
          </Link>
          <Link to="/prestadores" className="text-gray-600 hover:text-chamaai-blue">
            Prestadores
          </Link>
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="border-chamaai-blue text-chamaai-blue">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-chamaai-blue hover:bg-chamaai-lightblue">
                  Cadastre-se
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-chamaai-blue">
                <User size={20} />
                <span>Minha Conta</span>
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-chamaai-blue"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu} size="icon">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/como-funciona" 
              className="text-gray-600 hover:text-chamaai-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/categorias" 
              className="text-gray-600 hover:text-chamaai-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
            <Link 
              to="/prestadores" 
              className="text-gray-600 hover:text-chamaai-blue py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Prestadores
            </Link>
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 mt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-chamaai-blue text-chamaai-blue">
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-gray-600 hover:text-chamaai-blue py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Minha Conta</span>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-chamaai-blue py-2"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
