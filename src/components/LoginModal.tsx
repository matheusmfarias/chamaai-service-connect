
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin, onSignUp }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-chamaai-blue" />
          </div>
          <DialogTitle className="text-2xl">Acesse para ver mais!</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Crie sua conta gratuitamente ou faça login para visualizar o perfil completo e entrar em contato com este profissional.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button 
            onClick={onLogin} 
            className="bg-chamaai-blue hover:bg-chamaai-lightblue sm:min-w-[120px]"
          >
            Entrar
          </Button>
          <Button 
            onClick={onSignUp} 
            className="bg-chamaai-blue hover:bg-chamaai-lightblue sm:min-w-[120px]"
          >
            Cadastrar-se
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
