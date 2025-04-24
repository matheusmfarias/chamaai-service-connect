
import { createContext, useContext, useEffect } from "react";
import { AuthContextType } from "./types/auth";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthActions } from "./hooks/useAuthActions";
import { useProfile } from "./hooks/useProfile";
import { useServiceProvider } from "./hooks/useServiceProvider";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    user,
    session,
    isLoading,
    setIsLoading,
    handleAuth,
    handleSignOut,
    navigate
  } = useAuthState();

  const { userProfile, setUserProfile, fetchUserProfile, updateProfile } = useProfile();
  const { 
    isServiceProvider, 
    setIsServiceProvider, 
    createServiceProvider, 
    checkIsServiceProvider 
  } = useServiceProvider();

  const { signUp, signIn, signOut } = useAuthActions(handleAuth, handleSignOut, setIsLoading);

  useEffect(() => {
    // Simulate initial auth check - no auto login in development
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    userProfile,
    isServiceProvider,
    signUp,
    signIn,
    signOut,
    updateProfile,
    createServiceProvider,
    checkIsServiceProvider
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

