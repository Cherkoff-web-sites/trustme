import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { authLogin } from '../api/auth';

const LEGACY_AUTH_FLAG = 'trstme_auth';
const ACCESS_TOKEN_KEY = 'trstme_access_token';

export type AuthContextValue = {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readInitialAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    if (localStorage.getItem(LEGACY_AUTH_FLAG) === '1') {
      localStorage.removeItem(LEGACY_AUTH_FLAG);
    }
    return token;
  }
  if (localStorage.getItem(LEGACY_AUTH_FLAG) === '1') {
    localStorage.removeItem(LEGACY_AUTH_FLAG);
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => readInitialAccessToken());

  const login = useCallback(async (email: string, password: string) => {
    const { access_token: nextToken } = await authLogin(email, password);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LEGACY_AUTH_FLAG);
      localStorage.setItem(ACCESS_TOKEN_KEY, nextToken);
    }
    setAccessToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(LEGACY_AUTH_FLAG);
    }
    setAccessToken(null);
  }, []);

  const isAuthenticated = Boolean(accessToken);

  const value = useMemo(
    () => ({ isAuthenticated, accessToken, login, logout }),
    [isAuthenticated, accessToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
