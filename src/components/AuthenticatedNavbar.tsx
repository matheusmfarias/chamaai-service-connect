
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
import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AuthenticatedNavbar = () => {
  const { user, userProfile, signOut } = useAuth();

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
    <div className="flex items-center space-x-6">
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/busca" className="text-gray-600 hover:text-chamaai-blue transition-colors">
          Buscar Serviços
        </Link>
        <Link to="/minhas-solicitacoes" className="text-gray-600 hover:text-chamaai-blue transition-colors">
          Solicitações
        </Link>
      </div>
      
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
              <Link to="/perfil" className="flex w-full cursor-pointer">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/minhas-solicitacoes" className="flex w-full cursor-pointer">
                Solicitações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/ajuda" className="flex w-full cursor-pointer">
                Ajuda
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/configuracoes" className="flex w-full cursor-pointer">
                Configurações
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              onClick={() => signOut()}
              className="flex w-full cursor-pointer text-red-500"
            >
              Sair
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedNavbar;
