import { cva } from 'class-variance-authority';

export const alertBannerStyles = cva(
  'flex items-center gap-3 rounded-[28px] px-4 py-4 text-sm sm:px-6',
  {
    variants: {
      tone: {
        warning: 'border border-white/85 bg-[#151515]/95 text-white/90',
        info: 'border border-[#0EB8D2]/50 bg-[#151515]/95 text-white/90',
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);

export const alertBannerIconStyles = cva(
  'inline-flex h-6 w-6 items-center justify-center rounded-md text-[#151515]',
  {
    variants: {
      tone: {
        warning: 'bg-[#D89B1D]',
        info: 'bg-[#0EB8D2]',
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);
