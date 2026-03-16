import { useEffect, useRef, useState } from 'react';
import { uiTokens, designTokens } from '../ui';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import bgDecorLeft from '../../assets/bg_decor_left.webp';
import bgDecorRight from '../../assets/bg_decor_right.webp';

/** Высота одной картинки (ядро 800 + размытие = 1300). */
const BLUR_IMAGE_HEIGHT_PX = 1300;
/** Первая картинка (правая): ядро 800 на top -200 → top картинки = -200 - 250 = -450. */
const BLUR_FIRST_TOP_PX = -450;
/** Низ первой картинки: -450 + 1300 = 850. Нужно столько блоков, чтобы последний перекрывал pageHeight. */
const BLUR_FIRST_BOTTOM_PX = BLUR_FIRST_TOP_PX + BLUR_IMAGE_HEIGHT_PX; // 850
/** Нахлёст 200 → шаг между началами = 1100. */
const BLUR_STEP_PX = BLUR_IMAGE_HEIGHT_PX - 200;
/** На 1920px ширина картинок 850px → 850/1920*100 ≈ 44.27vw. */
const BLUR_WIDTH_VW = (850 / 1920) * 100;

/** Сколько блоков нужно, чтобы последний закрывал высоту pageHeight. */
function blurBlockCount(pageHeight: number): number {
  if (pageHeight <= 0) return 1;
  return Math.max(1, Math.ceil((pageHeight - BLUR_FIRST_BOTTOM_PX) / BLUR_STEP_PX) + 1);
}

function BackgroundDecor({ pageHeight }: { pageHeight: number }) {
  const count = blurBlockCount(pageHeight);
  const positions = Array.from({ length: count }, (_, i) => BLUR_FIRST_TOP_PX + i * BLUR_STEP_PX);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {positions.map((topPx, i) => {
          const isRight = i % 2 === 0;
          const src = isRight ? bgDecorRight : bgDecorLeft;
          return (
            <div
              key={i}
              className="absolute bg-no-repeat"
              style={{
                height: `${BLUR_IMAGE_HEIGHT_PX}px`,
                width: `${BLUR_WIDTH_VW}vw`,
                top: `${topPx}px`,
                backgroundSize: '100% 100%',
                ...(isRight ? { right: 0, backgroundImage: `url(${src})`, backgroundPosition: 'right top' } : { left: 0, backgroundImage: `url(${src})`, backgroundPosition: 'left top' }),
              }}
            />
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(253,254,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(253,254,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]"
      />
    </>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setPageHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={uiTokens.page}>
      <BackgroundDecor pageHeight={pageHeight} />
      <div ref={contentRef} className="relative z-10 flex min-h-screen flex-col">
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
