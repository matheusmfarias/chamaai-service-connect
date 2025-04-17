
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Settings, Home, Briefcase, Bell, HelpCircle, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AuthenticatedNavbar = () => {
  const { user, userProfile, signOut, isServiceProvider } = useAuth();

  if (!user) return null;

  const userInitials = userProfile?.full_name
    ? userProfile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full p-0 text-gray-600" asChild>
        <Link to="/notificacoes">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            2
          </span>
        </Link>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userProfile?.avatar_url || ""} />
              <AvatarFallback className="bg-chamaai-blue text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userProfile?.full_name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="flex w-full cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/minhas-solicitacoes" className="flex w-full cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Minhas Solicitações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/perfil" className="flex w-full cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            {isServiceProvider ? (
              <DropdownMenuItem asChild>
                <Link to={`/prestador/${user.id}`} className="flex w-full cursor-pointer">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Meu Perfil de Prestador</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/solicitar-servico" className="flex w-full cursor-pointer">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Solicitar Serviço</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/ajuda" className="flex w-full cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ajuda</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/configuracoes" className="flex w-full cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              onClick={() => signOut()}
              className="flex w-full cursor-pointer text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedNavbar;
