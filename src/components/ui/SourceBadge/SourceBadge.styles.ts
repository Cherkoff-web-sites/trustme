import { cva } from 'class-variance-authority';

export const sourceBadgeStyles = cva('inline-flex items-center gap-2.5', {
  variants: {
    size: {
      default: '',
      sm: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const sourceBadgeFallbackStyles = cva(
  'inline-flex items-center justify-center rounded-full bg-[#FDFEFF] font-semibold text-[#1A1A1A]',
  {
    variants: {
      size: {
        default: 'h-10 w-10 text-xs',
        sm: 'h-5 w-5 text-[9px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
