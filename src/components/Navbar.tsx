import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="font-bold text-2xl text-chamaai-blue">
            ChamaAí
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-chamaai-blue transition-colors">
              Início
            </Link>
            <Link to="/categorias" className="text-gray-600 hover:text-chamaai-blue transition-colors">
              Categorias
            </Link>
            <Link to="/como-funciona" className="text-gray-600 hover:text-chamaai-blue transition-colors">
              Como Funciona
            </Link>
            <Link to="/sobre" className="text-gray-600 hover:text-chamaai-blue transition-colors">
              Sobre Nós
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user && (
              searchOpen ? (
                <div className="relative">
                  <Input 
                    type="text"
                    placeholder="Pesquisar serviços..."
                    className="pr-8"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setSearchOpen(true)}>
                  <Search className="w-5 h-5 text-gray-600" />
                </Button>
              )
            )}
            
            {user ? (
              <AuthenticatedNavbar />
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button size="sm" className="bg-chamaai-blue hover:bg-chamaai-lightblue">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <Button variant="ghost" size="sm" onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="w-5 h-5 text-gray-600" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {searchOpen && user && (
          <div className="md:hidden pb-4">
            <Input 
              type="text"
              placeholder="Pesquisar serviços..."
              className="w-full"
              autoFocus
            />
          </div>
        )}

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
              Início
            </Link>
            <Link to="/categorias" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
              Categorias
            </Link>
            <Link to="/como-funciona" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
              Como Funciona
            </Link>
            <Link to="/sobre" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
              Sobre Nós
            </Link>
            
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
                    Dashboard
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start p-0 h-auto text-red-500 hover:text-red-600 hover:bg-transparent"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors">
                    Entrar
                  </Link>
                  <Link to="/cadastro">
                    <Button className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue">Cadastrar</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
