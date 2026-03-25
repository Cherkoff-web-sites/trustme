import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { useAuth } from '../../context/AuthContext';
import { useAuthModalUi } from '../../context/AuthModalUiContext';

export function LandingPage() {
  const [searchParams] = useSearchParams();
  const nextParam = searchParams.get('next');
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModalUi();

  useEffect(() => {
    if (isAuthenticated) return;
    if (nextParam) openAuthModal();
  }, [isAuthenticated, nextParam, openAuthModal]);

  return <PageLayout />;
}
