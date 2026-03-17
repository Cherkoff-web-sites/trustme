import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const alertBannerStyles = cva(
  [
    // spacing
    'mb-[20px] lg:mb-[30px]',
    // card tokens (border/bg/rounded + paddings)
    designTokens.presets.card.default,
    designTokens.spacing.padding.cardVertical,
    designTokens.spacing.padding.cardHorizontal,
    // banner layout/typography
    'flex items-center gap-3',
    'text-base font-normal lg:text-[18px]',
  ].join(' '),
  {
    variants: {
      tone: {
        warning: designTokens.colors.text.primary,
        info: `border border-[#057889]/50 ${designTokens.colors.text.primary}`,
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);

export const alertBannerIconStyles = cva(
  'inline-flex h-6 w-6 items-center justify-center',
  {
    variants: {
      tone: {
        warning: '',
        info: '',
      },
    },
    defaultVariants: {
      tone: 'warning',
    },
  },
);
