import { cva } from 'class-variance-authority';

export const alertBannerStyles = cva(
  'flex items-center gap-3 rounded-[28px] px-4 py-4 text-base font-normal sm:px-6 lg:text-[18px]',
  {
    variants: {
      tone: {
        warning: 'border border-[#FDFEFF] bg-[#1A1A1A] text-[#FDFEFF]/90',
        info: 'border border-[#057889]/50 bg-[#1A1A1A] text-[#FDFEFF]/90',
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);

export const alertBannerIconStyles = cva(
  'inline-flex h-6 w-6 items-center justify-center rounded-md text-[#1A1A1A]',
  {
    variants: {
      tone: {
        warning: 'bg-[#EBA535]',
        info: 'bg-[#057889]',
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);
