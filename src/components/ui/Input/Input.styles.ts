import { cva } from 'class-variance-authority';

export const inputStyles = cva(
  'w-full rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-[18px] text-base text-[#FDFEFF] outline-none placeholder:text-white/35 focus:border-[#0EB8D2]',
  {
    variants: {
      variant: {
        default: 'h-14',
        compact: 'h-10 bg-[#181818]',
        centered: 'h-11 text-center',
        date: 'h-10 bg-[#181818]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
