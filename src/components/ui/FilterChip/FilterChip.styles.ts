import { cva } from 'class-variance-authority';

export const filterChipStyles = cva(
  'inline-flex items-center gap-2 border text-sm transition',
  {
    variants: {
      variant: {
        selectable: 'rounded-[10px] px-3 py-2',
        applied: 'rounded-full border-white/30 bg-[#181818] px-3 py-1 text-xs text-white/80 hover:bg-[#222222]',
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
        className: 'border-white bg-white text-[#151515]',
      },
      {
        variant: 'selectable',
        selected: false,
        className: 'border-white/35 bg-[#181818] text-white/85 hover:bg-[#1F1F1F]',
      },
    ],
    defaultVariants: {
      variant: 'selectable',
      selected: false,
    },
  },
);
