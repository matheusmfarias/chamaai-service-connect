
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Home, User, Bell, LogOut, FileText, Settings, HelpCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  // Verificar se estamos em uma rota de dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  const publicLinks = [
    { name: "Início", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Categorias", path: "/categorias", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Como Funciona", path: "/como-funciona", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
    { name: "Sobre Nós", path: "/sobre", icon: <User className="w-4 h-4 mr-2" /> },
  ];
  
  const authenticatedLinks = [
    { name: "Minhas Solicitações", path: "/dashboard", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Buscar Serviços", path: "/busca", icon: <Search className="w-4 h-4 mr-2" /> },
    { name: "Notificações", path: "/notificacoes", icon: <Bell className="w-4 h-4 mr-2" /> },
    { name: "Configurações", path: "/configuracoes", icon: <Settings className="w-4 h-4 mr-2" /> },
  ];

  // Escolha quais links exibir com base no status de autenticação
  const linksToShow = user ? authenticatedLinks : publicLinks;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link to={user ? "/dashboard" : "/"} className="font-bold text-2xl text-chamaai-blue">
            ChamaAí
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {linksToShow.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-gray-600 hover:text-chamaai-blue transition-colors flex items-center"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
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
                  <Button size="sm" className="bg-chamaai-blue hover:bg-chamaai-lightblue">Entrar</Button>
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
            {linksToShow.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="flex items-center py-2 text-gray-600 hover:text-chamaai-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/perfil" 
                    className="flex items-center py-2 text-gray-600 hover:text-chamaai-blue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start p-0 h-auto text-red-500 hover:text-red-600 hover:bg-transparent flex items-center"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="block py-2 text-gray-600 hover:text-chamaai-blue transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue">Entrar</Button>
                  </Link>
                  <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>
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
