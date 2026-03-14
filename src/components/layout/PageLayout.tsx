import { uiTokens } from '../ui';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[-20%] h-[55%] rounded-full bg-[#0EB8D2]/45 blur-[120px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[32%] bg-[linear-gradient(270deg,rgba(14,184,210,0.16),transparent_75%)]" />
    </>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={uiTokens.page}>
      <BackgroundDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
