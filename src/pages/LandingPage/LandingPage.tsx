import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { AuthModal } from '../../components/features/AuthModal';
import { Button } from '../../components/ui';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <PageLayout>
      {/* Центральная кнопка Войти */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center pb-10 sm:pb-14">
        <Button className="min-w-[200px]" onClick={openAuthModal}>
          Войти
        </Button>
      </section>
      <AuthModal open={showAuthModal} onClose={closeAuthModal} />
    </PageLayout>
  );
}
