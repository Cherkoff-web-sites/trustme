import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModalUi } from '../../context/AuthModalUiContext';
import { AuthModal } from '../features/AuthModal';
import { uiTokens, designTokens } from '../ui';
import { PageSectionHeadingProvider } from './PageSection';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import bgDecorLeft from '../../assets/bg_decor_left.webp';
import bgDecorRight from '../../assets/bg_decor_right.webp';
import bgDecorMob from '../../assets/bg_decor_mob.webp';

const DESKTOP_MIN_WIDTH_PX = 992;

/** Высота одной картинки (ядро 800 + размытие = 1300). */
const BLUR_BASE_WIDTH_PX = 1920;
const pxToVw = (px: number) => (px / BLUR_BASE_WIDTH_PX) * 100;

const BLUR_IMAGE_HEIGHT_VW = pxToVw(1300);
/** Первая картинка (правая): ядро 800 на top -200 → top картинки = -200 - 250 = -450. */
const BLUR_FIRST_TOP_VW = pxToVw(-450);
const BLUR_OVERLAP_VW = pxToVw(200);
/** Нахлёст 200 → шаг между началами = 1100. */
const BLUR_STEP_VW = BLUR_IMAGE_HEIGHT_VW - BLUR_OVERLAP_VW;
/** На 1920px ширина картинок 850px → 850/1920*100 ≈ 44.27vw. */
const BLUR_WIDTH_VW = (850 / 1920) * 100;

/** Сколько блоков нужно, чтобы последний закрывал высоту pageHeight (desktop). */
function blurBlockCountDesktop(pageHeight: number, viewportWidth: number): number {
  if (!viewportWidth) return 1;
  const vwPx = viewportWidth / 100;
  const firstBottomPx = (BLUR_FIRST_TOP_VW + BLUR_IMAGE_HEIGHT_VW) * vwPx;
  const stepPx = BLUR_STEP_VW * vwPx;
  if (pageHeight <= 0) return 1;
  return Math.max(1, Math.ceil((pageHeight - firstBottomPx) / stepPx) + 1);
}

// Mobile decor (<= 992px)
const MOB_BASE_VIEWPORT_PX = 390;
const MOB_IMAGE_PX = 894;
const MOB_CORE_PX = 550;
const MOB_CORE_TO_CORE_GAP_PX = 600; // расстояние между ядрами по макету
const MOB_EXTRA_GAP_PX = MOB_CORE_TO_CORE_GAP_PX - (MOB_IMAGE_PX - MOB_CORE_PX); // 600 - 344 = 256
const MOB_FIRST_TOP_PX = 128; // 300 - (894-550)/2 = 128

function mobileScale(viewportWidth: number): number {
  if (!viewportWidth) return 1;
  return Math.min(1, viewportWidth / MOB_BASE_VIEWPORT_PX);
}

function blurBlockCountMobile(pageHeight: number, viewportWidth: number): number {
  const scale = mobileScale(viewportWidth);
  const imagePx = MOB_IMAGE_PX * scale;
  const stepPx = (MOB_IMAGE_PX + MOB_EXTRA_GAP_PX) * scale;
  const firstTopPx = MOB_FIRST_TOP_PX * scale;
  const firstBottomPx = firstTopPx + imagePx;
  if (pageHeight <= 0) return 1;
  return Math.max(1, Math.ceil((pageHeight - firstBottomPx) / stepPx) + 1);
}

/** Декоративные webp-картинки (скрываются при открытии модалки авторизации). */
function BackgroundDecorImages({ pageHeight, viewportWidth }: { pageHeight: number; viewportWidth: number }) {
  const isMobile = viewportWidth > 0 && viewportWidth < DESKTOP_MIN_WIDTH_PX;

  const desktopCount = blurBlockCountDesktop(pageHeight, viewportWidth);
  const desktopPositions = Array.from({ length: desktopCount }, (_, i) => BLUR_FIRST_TOP_VW + i * BLUR_STEP_VW);

  const mobileCount = blurBlockCountMobile(pageHeight, viewportWidth);
  const mobileScaleFactor = mobileScale(viewportWidth);
  const mobileImagePx = MOB_IMAGE_PX * mobileScaleFactor;
  const mobileStepPx = (MOB_IMAGE_PX + MOB_EXTRA_GAP_PX) * mobileScaleFactor;
  const mobileFirstTopPx = MOB_FIRST_TOP_PX * mobileScaleFactor;
  const mobilePositions = Array.from({ length: mobileCount }, (_, i) => mobileFirstTopPx + i * mobileStepPx);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {!isMobile && desktopPositions.map((topVw, i) => {
        const isRight = i % 2 === 0;
        const src = isRight ? bgDecorRight : bgDecorLeft;
        return (
          <div
            key={`d-${i}`}
            className="absolute bg-no-repeat"
            style={{
              height: `${BLUR_IMAGE_HEIGHT_VW}vw`,
              width: `${BLUR_WIDTH_VW}vw`,
              top: `${topVw}vw`,
              backgroundSize: '100% 100%',
              ...(isRight
                ? { right: 0, backgroundImage: `url(${src})`, backgroundPosition: 'right top' }
                : { left: 0, backgroundImage: `url(${src})`, backgroundPosition: 'left top' }),
            }}
          />
        );
      })}

      {isMobile &&
        mobilePositions.map((topPx, i) => (
          <div
            key={`m-${i}`}
            className="absolute left-1/2 -translate-x-1/2 bg-no-repeat"
            style={{
              width: `${mobileImagePx}px`,
              height: `${mobileImagePx}px`,
              top: `${topPx}px`,
              backgroundImage: `url(${bgDecorMob})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center top',
            }}
          />
        ))}
    </div>
  );
}

/** Сетка на фоне страницы — остаётся видимой при модалке авторизации. */
function PageGridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(253,254,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(253,254,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"
      aria-hidden
    />
  );
}

export function PageLayout({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { authModalOpen, closeAuthModal } = useAuthModalUi();
  const hideChromeForAuthModal = authModalOpen && !isAuthenticated;

  const contentRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setPageHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className={uiTokens.page}>
      {!hideChromeForAuthModal ? (
        <BackgroundDecorImages pageHeight={pageHeight} viewportWidth={viewportWidth} />
      ) : null}
      <PageGridPattern />
      {!hideChromeForAuthModal ? (
        <div ref={contentRef} className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main
            className={[
              'relative',
              uiTokens.container,
              designTokens.spacing.padding.pageMain,
              '[&>*:not(:first-child)]:pt-[20px] lg:[&>*:not(:first-child)]:pt-[60px]',
              '[&>*:not(:last-child)]:mb-[60px] lg:[&>*:not(:last-child)]:mb-[180px]',
            ].join(' ')}
          >
            <PageSectionHeadingProvider>{children}</PageSectionHeadingProvider>
          </main>
          <Footer />
        </div>
      ) : (
        <div ref={contentRef} className="relative z-10 min-h-0 min-w-0 flex-1" aria-hidden />
      )}
      {!isAuthenticated ? (
        <AuthModal open={authModalOpen} onClose={closeAuthModal} />
      ) : null}
    </div>
  );
}
