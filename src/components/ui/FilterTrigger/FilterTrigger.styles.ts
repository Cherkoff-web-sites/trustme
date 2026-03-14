import { cva } from 'class-variance-authority';

export const filterTriggerStyles = cva(
  'flex h-12 items-center justify-between gap-2 rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] px-4 text-base font-semibold transition',
  {
    variants: {
      active: {
        true: 'text-[#FDFEFF]',
        false: 'text-[#FDFEFF]/55 hover:text-[#FDFEFF]/80',
      },
      minWidth: {
        none: '',
        md: 'min-w-[170px]',
      },
    },
    defaultVariants: {
      active: false,
      minWidth: 'none',
    },
  },
);
