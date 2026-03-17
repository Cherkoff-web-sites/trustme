import { cva } from 'class-variance-authority';

export const filterChipStyles = cva(
  'inline-flex items-center gap-2 border text-[14px] lg:text-[20px] font-semibold transition',
  {
    variants: {
      variant: {
        selectable: 'rounded-[10px] px-3 py-2',
        applied: 'rounded-[100px] border-[#FDFEFF]/30 bg-[#1A1A1A] px-3 py-1 text-xs text-[#FDFEFF] hover:bg-[#2A2A2A]',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'selectable',
        selected: true,
        className: 'border-[#FDFEFF] bg-[#FDFEFF] text-[#1A1A1A]',
      },
      {
        variant: 'selectable',
        selected: false,
        className: 'border-[#FDFEFF]/35 bg-[#1A1A1A] text-[#FDFEFF] hover:bg-[#2A2A2A]',
      },
    ],
    defaultVariants: {
      variant: 'selectable',
      selected: false,
    },
  },
);
