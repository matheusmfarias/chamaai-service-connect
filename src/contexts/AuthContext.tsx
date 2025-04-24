
import React, { createContext, useContext, useEffect } from "react";
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
    navigate
  } = useAuthState();

  const { userProfile, setUserProfile, fetchUserProfile, updateProfile } = useProfile();
  const { 
    isServiceProvider, 
    setIsServiceProvider, 
    createServiceProvider, 
    checkIsServiceProvider 
  } = useServiceProvider();

  const { signUp, signIn } = useAuthActions(handleAuthChange, setIsLoading);

  useEffect(() => {
    // Initialize auth state when the app loads
    restoreSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, sessionData) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          handleAuthChange(sessionData);
        } else if (event === 'SIGNED_OUT') {
          handleAuthChange(null);
        }
      }
    );

    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [restoreSession, handleAuthChange]);

  // Fetch user profile when user changes
  useEffect(() => {
    const getUserProfile = async () => {
      if (user) {
        const profile = await fetchUserProfile(user.id);
        
        if (profile) {
          // Check if user is a service provider
          await checkIsServiceProvider();
          
          // Redirect based on user type
          if (profile.user_type === 'prestador' || profile.user_type === 'provider') {
            navigate("/dashboard/prestador");
          } else {
            navigate("/dashboard/cliente");
          }
        }
      }
    };
    
    if (user && !isLoading) {
      getUserProfile();
    }
  }, [user, isLoading, fetchUserProfile, checkIsServiceProvider, navigate]);

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
