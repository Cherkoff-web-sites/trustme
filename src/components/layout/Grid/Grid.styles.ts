import { cva } from 'class-variance-authority';
import { designTokens } from '../../ui';

export const gridStyles = cva(
  [
    'grid w-full',
    // базовый gap берём из токенов (карточные отступы)
    designTokens.spacing.gap.cardHorizontal.replace('gap-x', 'gap'),
    designTokens.spacing.gap.cardVertical.replace('gap-y', 'gap'),
  ].join(' '),
  {
    variants: {
      preset: {
        dashboard: designTokens.layout.grid.dashboard,
        settings: designTokens.layout.grid.settings,
        tariff: designTokens.layout.grid.tariffPlans,
      },
    },
  },
);

