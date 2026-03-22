/**
 * Самостоятельная оболочка окна входа/регистрации (не использует ModalShell).
 */
/**
 * Внешняя оболочка: скролл по вертикали, чтобы высокая карточка не «уезжала» вверх
 * (flex items-center без scroll обрезает верх при контенте > viewport).
 */
export const authModalOverlayOuterStyles =
  'fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-transparent';

/** Внутренний блок: горизонтально по центру, сверху отступ — моб 136px, ПК 150px (вровень с крестом по top). */
export const authModalOverlayInnerStyles =
  'flex min-h-full w-full items-start justify-center px-4 pt-[136px] pb-6 sm:px-6 sm:pb-10 lg:pt-[150px]';

/**
 * Слой с декоративными webp: `fixed` к нижнему краю viewport — не уезжает при прокрутке модалки.
 */
export const authModalBgLayerStyles =
  'pointer-events-none fixed inset-x-0 bottom-0 z-[1] flex flex-col items-center justify-end overflow-x-hidden';

/** Моб: фиксированная ширина 1222px, обрезка по краям экрана. */
export const authModalBgLayerMobStyles =
  'lg:hidden h-auto w-[1222px] max-w-none shrink-0 object-bottom';

/** ПК: на всю ширину контейнера, не шире 1629px. */
export const authModalBgLayerPcWrapStyles =
  'hidden lg:flex w-full max-w-[1629px] shrink-0 justify-center px-4';

export const authModalBgLayerPcImgStyles = 'h-auto w-full max-w-[1629px] object-bottom';

/** Только раскладка модалки; визуал карточки — из `Card` (токены + preset). */
export const authModalCardClassName =
  'relative z-10 w-full max-w-[624px] py-[40px] lg:p-[60px]';

/**
 * Только для внутренней колонки `Card` (между лого+текст / форма / подвал).
 * Внутри форм остаётся стандартный `cardInternal` 30px.
 */
export const authModalStackGapStyles = 'gap-[40px] lg:gap-[60px]';

/** Информационный блок (письмо отправлено, смена пароля) — рамка teal/cyan. */
export const authModalEmailInfoBoxStyles =
  'rounded-[10px] border border-[#0EB8D2] px-4 py-4 text-[#FDFEFF]';
