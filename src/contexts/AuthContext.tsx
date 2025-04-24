
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "./types/auth";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthActions } from "./hooks/useAuthActions";
import { useProfile } from "./hooks/useProfile";
import { useServiceProvider } from "./hooks/useServiceProvider";
import { supabase } from "@/integrations/supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const {
    user,
    session,
    isLoading,
    setIsLoading,
    handleAuthChange,
    handleSignOut,
    restoreSession,
  } = useAuthState();

  const { userProfile, setUserProfile, fetchUserProfile, updateProfile } = useProfile();
  const { 
    isServiceProvider, 
    setIsServiceProvider, 
    createServiceProvider, 
    checkIsServiceProvider 
  } = useServiceProvider();
  
  const [isAuthReady, setIsAuthReady] = useState(false);

  const { signUp, signIn } = useAuthActions(handleAuthChange, setIsLoading);

  // Initialize auth state when the app loads
  useEffect(() => {
    const initAuth = async () => {
      await restoreSession();
      setIsAuthReady(true);
    };
    
    initAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        console.log("Auth state change:", event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Type assertion to manage the incompatible types
          handleAuthChange(sessionData as any);
          
          if (sessionData?.user) {
            const profile = await fetchUserProfile(sessionData.user.id);
            
            // Redirect based on user type
            const redirectPath = profile?.user_type === 'prestador' 
              ? '/dashboard/prestador' 
              : '/dashboard/cliente';
            
            navigate(redirectPath);
          }
        } else if (event === 'SIGNED_OUT') {
          handleAuthChange(null);
          setUserProfile(null);
          setIsServiceProvider(false);
        }
      }
    );

    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [restoreSession, handleAuthChange, fetchUserProfile, setUserProfile, setIsServiceProvider, navigate]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    userProfile,
    isServiceProvider,
    signUp,
    signIn,
    signOut: handleSignOut,
    updateProfile,
    createServiceProvider,
    checkIsServiceProvider
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
