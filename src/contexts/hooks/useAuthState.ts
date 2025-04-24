
import { useState } from "react";
import { User, Session, UserProfile } from "../types/auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { mockUsers, mockSessions } from "../utils/mockAuthData";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = (userId: string) => {
    setUser(mockUsers[userId]);
    setSession(mockSessions[userId]);
  };

  const handleSignOut = () => {
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    isLoading,
    setIsLoading,
    handleAuth,
    handleSignOut,
    toast,
    navigate
  };
};

