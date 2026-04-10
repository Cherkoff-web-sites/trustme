import { cva } from 'class-variance-authority';

/**
 * Скролл только на оверлее (затемнение); сама карточка модалки по высоте не режется.
 * Подложка: #1A1A1A @ 80%.
 */
export const modalOverlayOuterStyles =
  'fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-[rgba(26,26,26,0.8)]';

export const modalOverlayInnerStyles =
  'flex min-h-full w-full items-start justify-center px-4 py-6 sm:px-6 sm:py-10';

export const modalPanelStyles = cva(
  'relative w-full rounded-[28px] border border-[#FDFEFF] bg-[#1A1A1A] text-base font-normal text-[#FDFEFF] shadow-[0_0_0_1px_rgba(253,254,255,0.15)] lg:text-[18px]',
  {
    variants: {
      size: {
        sm: 'max-w-[430px] border-[#FDFEFF] px-5 py-5 sm:px-6 sm:py-6',
        md: 'max-w-[460px] border-[#FDFEFF] px-5 py-6 sm:px-7 sm:py-7',
        lg: 'max-w-[720px] border-[#FDFEFF] p-4 sm:p-5',
        xl: 'max-w-[1155px] border-[#FDFEFF] p-4 sm:p-5',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export const modalCloseButtonStyles =
  'absolute right-4 top-4 text-lg text-[#FDFEFF] transition hover:text-[#FDFEFF]';
