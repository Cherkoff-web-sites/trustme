import { cva } from 'class-variance-authority';

export const modalOverlayStyles =
  'fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6 sm:py-10';

export const modalPanelStyles = cva(
  'relative w-full rounded-[28px] border bg-[#151515] text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  {
    variants: {
      size: {
        sm: 'max-w-[430px] border-white/70 px-5 py-5 sm:px-6 sm:py-6',
        md: 'max-w-[460px] border-white/65 px-5 py-6 sm:px-7 sm:py-7',
        lg: 'max-w-[720px] border-white/80 p-4 sm:p-5',
        xl: 'max-w-5xl overflow-hidden border-white/70',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export const modalCloseButtonStyles =
  'absolute right-4 top-4 text-lg text-white/65 transition hover:text-white';
