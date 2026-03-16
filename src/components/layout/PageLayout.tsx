import { uiTokens, designTokens } from '../ui';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

function BackgroundDecor() {
  return (
    <>
      <div />
    </>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={uiTokens.page}>
      <BackgroundDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main
          className={[
            'relative',
            uiTokens.container,
            designTokens.spacing.padding.pageMain,
          ].join(' ')}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
