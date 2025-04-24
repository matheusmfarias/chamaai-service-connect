
import { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
  app_metadata: Record<string, any>;
  aud: string;
  created_at: string;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  created_at: string;
  updated_at: string;
  avatar_url?: string | null;
  user_type?: string;
}

export interface UserSignUpData {
  full_name: string;
  phone?: string;
  city?: string;
  state?: string;
  user_type?: string;
  category?: string;
  description?: string;
  rate_per_hour?: number;
}

export interface ServiceProviderData {
  category: string;
  description: string;
  rate_per_hour: number;
  service_radius?: number;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userProfile: UserProfile | null;
  isServiceProvider: boolean;
  signUp: (email: string, password: string, userData: UserSignUpData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | null>;
  createServiceProvider: (data: ServiceProviderData) => Promise<void>;
  checkIsServiceProvider: () => Promise<boolean>;
}
