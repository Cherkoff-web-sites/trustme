import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type AuthModalUiContextValue = {
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

const AuthModalUiContext = createContext<AuthModalUiContextValue | null>(null);

export function AuthModalUiProvider({ children }: { children: React.ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const value = useMemo(
    () => ({ authModalOpen, openAuthModal, closeAuthModal }),
    [authModalOpen, openAuthModal, closeAuthModal],
  );

  return <AuthModalUiContext.Provider value={value}>{children}</AuthModalUiContext.Provider>;
}

export function useAuthModalUi() {
  const ctx = useContext(AuthModalUiContext);
  if (!ctx) {
    throw new Error('useAuthModalUi must be used within AuthModalUiProvider');
  }
  return ctx;
}
