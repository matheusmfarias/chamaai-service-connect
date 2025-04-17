
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/LoginModal';

interface LoginModalContextType {
  showLoginModal: (providerId: string) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
};

interface LoginModalProviderProps {
  children: ReactNode;
}

export const LoginModalProvider = ({ children }: LoginModalProviderProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  
  const showLoginModal = (providerId: string) => {
    setSelectedProviderId(providerId);
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setSelectedProviderId(null);
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleSignUp = () => {
    navigate('/cadastro');
  };
  
  return (
    <LoginModalContext.Provider value={{ showLoginModal }}>
      {children}
      {isOpen && (
        <LoginModal
          isOpen={isOpen}
          onClose={handleClose}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      )}
    </LoginModalContext.Provider>
  );
};
