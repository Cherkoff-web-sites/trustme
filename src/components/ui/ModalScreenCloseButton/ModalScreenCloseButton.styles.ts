/**
 * Кнопка закрытия: фиксация к viewport (история отчёта и др.).
 * Моб: right 16, top 56. ПК: right 160, top 150, 50×50.
 */
export const modalScreenCloseButtonStyles =
  'fixed z-[110] inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-xl leading-none text-[#FDFEFF] transition hover:bg-[#FDFEFF]/10 right-4 top-14 lg:right-[160px] lg:top-[150px] lg:h-[50px] lg:w-[50px] lg:text-2xl';

/**
 * AuthModal: на мобилке кнопка в потоке — скроллится вместе с карточкой; с `lg` — как у `modalScreenCloseButtonStyles`.
 */
export const modalScreenCloseButtonScrollWithModalStyles =
  'relative z-[110] mb-[40px] inline-flex h-10 w-10 shrink-0 self-end items-center justify-center rounded-full border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-xl leading-none text-[#FDFEFF] transition hover:bg-[#FDFEFF]/10 lg:fixed lg:mb-0 lg:self-auto lg:right-[160px] lg:top-[13.89vh] lg:h-[50px] lg:w-[50px] lg:text-2xl';
