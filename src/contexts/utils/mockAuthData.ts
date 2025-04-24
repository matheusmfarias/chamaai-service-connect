
import { User, Session } from "../types/auth";

// Mock users for development - one client and one provider
export const mockUsers: Record<string, User> = {
  "client-user": {
    id: "client-user",
    email: "client@example.com",
    user_metadata: {
      full_name: "Cliente Exemplo"
    },
    app_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString()
  },
  "provider-user": {
    id: "provider-user",
    email: "provider@example.com",
    user_metadata: {
      full_name: "Prestador Exemplo"
    },
    app_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString()
  }
};

// Mock sessions for development
export const mockSessions: Record<string, Session> = {
  "client-user": {
    access_token: "mock-token-client",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "mock-refresh-token-client",
    user: mockUsers["client-user"]
  },
  "provider-user": {
    access_token: "mock-token-provider",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "mock-refresh-token-provider",
    user: mockUsers["provider-user"]
  }
};

