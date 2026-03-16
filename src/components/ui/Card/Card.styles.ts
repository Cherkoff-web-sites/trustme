import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const cardRootStyles = cva(
  [
    designTokens.presets.card.default,
    designTokens.spacing.padding.cardVertical,
    designTokens.spacing.padding.cardHorizontal,
    designTokens.typography.cardBody,
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        dashboard: '',
        tariff: '',
        history: '',
        settings: '',
        alert: '',
        compact: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const cardHeaderStyles = 'mb-4 flex items-center justify-between gap-4';
export const cardTitleStyles = designTokens.typography.cardTitle;
export const cardAsideStyles = designTokens.typography.body;
export const cardDividerStyles = 'mb-4 h-px w-full bg-[#FDFEFF]/15';

