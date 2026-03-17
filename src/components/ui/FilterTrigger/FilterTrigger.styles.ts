import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const filterTriggerStyles = cva(
  [
    'flex h-12 items-center justify-between gap-2',
    designTokens.borderRadius.input,
    `border ${designTokens.colors.border.input}`,
    designTokens.colors.background.control,
    'px-4',
    designTokens.typography.input,
    'font-normal',
    'transition',
  ].join(' '),
  {
    variants: {
      active: {
        true: designTokens.colors.text.primary,
        false: `${designTokens.colors.text.muted} hover:text-[#FDFEFF]`,
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
