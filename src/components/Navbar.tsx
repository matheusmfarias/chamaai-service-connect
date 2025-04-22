import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (user && location.pathname === "/") {
      signOut();
    }
  }, [user, location.pathname, signOut]);

  const handleSectionScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    // Se não estiver na página inicial, navegue para ela primeiro
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    // Se já estiver na página inicial, apenas faça o scroll
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const publicLinks = [
    { name: "Início", path: "/" },
    { 
      name: "Categorias", 
      path: "/#categories", 
      onClick: (e: React.MouseEvent) => handleSectionScroll(e, 'categories') 
    },
    { 
      name: "Como Funciona", 
      path: "/#how-it-works", 
      onClick: (e: React.MouseEvent) => handleSectionScroll(e, 'how-it-works') 
    },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link to={user ? "/dashboard" : "/"} className="font-bold text-2xl text-chamaai-blue">
            ChamaAí
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {!user && publicLinks.map((link) => (
              <a 
                key={link.path}
                href={link.path}
                onClick={link.onClick} 
                className="text-gray-600 hover:text-chamaai-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
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
              <AuthenticatedNavbar />
            )}
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {!user && publicLinks.map((link) => (
              <a 
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  link.onClick && link.onClick(e);
                }}
                className="flex items-center py-2 text-gray-600 hover:text-chamaai-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {!user && (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue">Entrar</Button>
                  </Link>
                  <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-chamaai-blue hover:bg-chamaai-lightblue">Cadastrar</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
