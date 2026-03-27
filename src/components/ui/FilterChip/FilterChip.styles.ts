import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const filterChipStyles = cva(
  'inline-flex items-center gap-3 border transition',
  {
    variants: {
      variant: {
        selectable: 'rounded-[10px] px-3 py-2',
        applied: [
          'rounded-[100px]',
          designTokens.colors.border.input,
          designTokens.colors.background.input,
          designTokens.typography.input,
          // text color like input border token (same 50% white)
          designTokens.colors.text.muted,
          'p-[15px] hover:bg-[#393939]',
        ].join(' '),
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
