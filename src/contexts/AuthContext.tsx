
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "./types/auth";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthActions } from "./hooks/useAuthActions";
import { useProfile } from "./hooks/useProfile";
import { useServiceProvider } from "./hooks/useServiceProvider";
import { supabase } from "@/integrations/supabase";

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
  const {
    user,
    session,
    isLoading,
    setIsLoading,
    handleAuthChange,
    handleSignOut,
    restoreSession,
    navigate,
    toast
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
            await fetchUserProfile(sessionData.user.id);
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
  }, [restoreSession, handleAuthChange, fetchUserProfile, setUserProfile, setIsServiceProvider]);

  // Handle user redirection after authentication
  useEffect(() => {
    const handleRedirection = async () => {
      if (user && userProfile && !isLoading && isAuthReady) {
        console.log("Handle redirection with userProfile:", userProfile);
        
        // Check if user is a service provider
        const isProvider = await checkIsServiceProvider();
        
        // Get the current path
        const currentPath = window.location.pathname;
        
        // Only redirect if on certain pages
        const shouldRedirect = ["/", "/login", "/cadastro", "/verificar-email"].includes(currentPath);
        
        if (shouldRedirect) {
          // Determine redirect path based on user type
          const redirectPath = userProfile.user_type === 'prestador' || userProfile.user_type === 'provider' 
            ? "/dashboard" 
            : "/dashboard";
          
          console.log(`Redirecting user (${userProfile.user_type}) to ${redirectPath}`);
          navigate(redirectPath);
        }
      }
    };
    
    handleRedirection();
  }, [user, userProfile, isLoading, isAuthReady, navigate, checkIsServiceProvider]);

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
