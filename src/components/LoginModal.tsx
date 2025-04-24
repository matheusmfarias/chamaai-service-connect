
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin, onSignUp }: LoginModalProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
    onClose();
  };

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    } else {
      navigate('/cadastro');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-chamaai-blue" />
          </div>
          <DialogTitle className="text-2xl">Acesse para ver mais!</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Visualize avaliações completas, fotos, contatos e agende com segurança.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button 
            onClick={handleLogin} 
            className="bg-chamaai-blue hover:bg-chamaai-lightblue sm:min-w-[150px]"
          >
            Já tenho conta
          </Button>
          <Button 
            onClick={handleSignUp} 
            className="bg-chamaai-blue hover:bg-chamaai-lightblue sm:min-w-[150px]"
          >
            Quero me cadastrar
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <button 
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-chamaai-blue hover:underline"
          >
            Prefiro continuar navegando
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
