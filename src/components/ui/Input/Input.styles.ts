import { cva } from 'class-variance-authority';

export const inputStyles = cva(
  'w-full rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] px-[18px] text-base font-normal text-[#FDFEFF] outline-none placeholder:text-[#FDFEFF]/50 focus:border-[#FDFEFF] lg:text-[18px]',
  {
    variants: {
      variant: {
        default: 'h-14',
        compact: 'h-10 bg-[#2A2A2A]',
        centered: 'h-11 text-center',
        date: 'h-10 bg-[#2A2A2A]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
