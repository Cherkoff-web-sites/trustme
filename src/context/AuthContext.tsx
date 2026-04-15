import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthApiError, authLogin, fetchCurrentUser } from '../api/auth';
import {
  readAccountSessions,
  removeAccountSession,
  upsertAccountSession,
  writeAccountSessions,
} from '../lib/accountSessions';
import type { UserResponse } from '../types/api';

/** Устаревший флаг — только удаляем из storage, на авторизацию не влияет. */
const LEGACY_AUTH_FLAG = 'trstme_auth';
const ACCESS_TOKEN_KEY = 'trstme_access_token';

function readInitialAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  localStorage.removeItem(LEGACY_AUTH_FLAG);
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export type AuthContextValue = {
  user: UserResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** ID пользователя после регистрации, до подтверждения email. */
  pendingUserId: number | null;
  setPendingUserId: (id: number | null) => void;
  /** Email-ы сохранённых сессий в этом браузере; активный — первый (текущий `user`). */
  accountEmails: string[];
  /** Переключение на другой сохранённый аккаунт (тот же токен из списка). */
  switchAccount: (email: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => readInitialAccessToken());
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(readInitialAccessToken()));
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);
  const [accountSessions, setAccountSessions] = useState(() =>
    typeof window !== 'undefined' ? readAccountSessions() : [],
  );

  const clearSession = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        const pruned = readAccountSessions().filter((s) => s.accessToken !== token);
        writeAccountSessions(pruned);
        setAccountSessions(pruned);
      }
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(LEGACY_AUTH_FLAG);
    }
    setAccessToken(null);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    const email = user?.email?.trim();
    setPendingUserId(null);
    if (!email || typeof window === 'undefined') {
      writeAccountSessions([]);
      setAccountSessions([]);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(LEGACY_AUTH_FLAG);
      setAccessToken(null);
      setUser(null);
      return;
    }

    const nextSlots = removeAccountSession(readAccountSessions(), email);
    writeAccountSessions(nextSlots);
    setAccountSessions(nextSlots);

    if (nextSlots.length === 0) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(LEGACY_AUTH_FLAG);
      setAccessToken(null);
      setUser(null);
      return;
    }

    const slot = nextSlots[0];
    localStorage.setItem(ACCESS_TOKEN_KEY, slot.accessToken);
    setAccessToken(slot.accessToken);
    try {
      const u = await fetchCurrentUser(slot.accessToken);
      setUser(u);
      const merged = upsertAccountSession(nextSlots, u.email, slot.accessToken);
      writeAccountSessions(merged);
      setAccountSessions(merged);
    } catch {
      writeAccountSessions([]);
      setAccountSessions([]);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setAccessToken(null);
      setUser(null);
    }
  }, [user?.email]);

  useEffect(() => {
    let cancelled = false;
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    localStorage.removeItem(LEGACY_AUTH_FLAG);
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const u = await fetchCurrentUser(token);
        if (!cancelled) {
          setAccessToken(token);
          setUser(u);
          const merged = upsertAccountSession(readAccountSessions(), u.email, token);
          writeAccountSessions(merged);
          setAccountSessions(merged);
        }
      } catch (e) {
        if (cancelled) return;
        if (e instanceof AuthApiError && e.status === 401) {
          clearSession();
        } else {
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const { access_token } = await authLogin(email.trim(), password);
        if (typeof window !== 'undefined') {
          localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
        }
        setAccessToken(access_token);
        try {
          const u = await fetchCurrentUser(access_token);
          setUser(u);
          if (typeof window !== 'undefined') {
            const merged = upsertAccountSession(readAccountSessions(), u.email, access_token);
            writeAccountSessions(merged);
            setAccountSessions(merged);
          }
        } catch (profileErr) {
          clearSession();
          throw profileErr;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [clearSession],
  );

  const switchAccount = useCallback(
    async (email: string) => {
      const trimmed = email.trim();
      if (!trimmed) return;
      if (user && user.email.trim().toLowerCase() === trimmed.toLowerCase()) return;

      const slots = readAccountSessions();
      const slot = slots.find((s) => s.email.trim().toLowerCase() === trimmed.toLowerCase());
      if (!slot) return;

      setIsLoading(true);
      try {
        localStorage.setItem(ACCESS_TOKEN_KEY, slot.accessToken);
        setAccessToken(slot.accessToken);
        const u = await fetchCurrentUser(slot.accessToken);
        setUser(u);
        const merged = upsertAccountSession(slots, u.email, slot.accessToken);
        writeAccountSessions(merged);
        setAccountSessions(merged);
      } catch {
        const next = removeAccountSession(slots, trimmed);
        writeAccountSessions(next);
        setAccountSessions(next);
        if (next.length > 0) {
          const fallback = next[0];
          try {
            localStorage.setItem(ACCESS_TOKEN_KEY, fallback.accessToken);
            setAccessToken(fallback.accessToken);
            const u2 = await fetchCurrentUser(fallback.accessToken);
            setUser(u2);
            const merged2 = upsertAccountSession(next, u2.email, fallback.accessToken);
            writeAccountSessions(merged2);
            setAccountSessions(merged2);
          } catch {
            writeAccountSessions([]);
            setAccountSessions([]);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            setAccessToken(null);
            setUser(null);
          }
        } else {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user],
  );

  const accountEmails = useMemo(() => {
    const emails = accountSessions.map((s) => s.email);
    if (!user) return emails;
    const active = user.email.trim().toLowerCase();
    return [user.email, ...emails.filter((e) => e.trim().toLowerCase() !== active)];
  }, [accountSessions, user]);

  const isAuthenticated = user !== null;

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      pendingUserId,
      setPendingUserId,
      accountEmails,
      switchAccount,
      login,
      logout,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      pendingUserId,
      accountEmails,
      switchAccount,
      login,
      logout,
    ],
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
