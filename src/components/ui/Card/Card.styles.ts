import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

/** Внутренняя подсветка по периметру при hover (история запросов, карточки тарифов и т.п.). */
export const cardInsetAccentHoverStyles = [
  'transition-[box-shadow] duration-200 ease-out',
  'hover:[box-shadow:inset_-4px_-4px_20px_rgba(14,184,210,0.5),inset_4px_4px_20px_1px_rgba(14,184,210,0.5)]',
].join(' ');

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

export const cardHeaderStyles = 'flex items-start justify-between gap-4';
export const cardTitleStyles = designTokens.typography.cardTitle;
export const cardAsideStyles = designTokens.typography.body;

