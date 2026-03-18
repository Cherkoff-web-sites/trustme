import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const optionIndicatorStyles = cva('shrink-0 border', {
  variants: {
    type: {
      radio: 'inline-flex h-6 w-6 items-center justify-center rounded-full border-[0.5px]',
      checkbox: 'h-4 w-4 rounded-[4px]',
      toggleMarker:
        'inline-flex h-4 w-4 items-center justify-center rounded-full border',
    },
    checked: {
      true: '',
      false: '',
    },
    mode: {
      default: '',
      settings: '',
    },
  },
  compoundVariants: [
    // Обычная радиокнопка
    {
      type: 'radio',
      checked: false,
      mode: 'default',
      className: [
        designTokens.colors.background.input,
        designTokens.colors.border.input,
      ].join(' '),
    },
    {
      type: 'radio',
      checked: true,
      mode: 'default',
      className: [
        'border-[#057889]',
        designTokens.colors.accent.primaryBg,
      ].join(' '),
    },
    // Вариант для настроек аккаунта: фон как у инпута всегда, бордер и внутренняя точка зелёные при выборе
    {
      type: 'radio',
      checked: false,
      mode: 'settings',
      className: [
        designTokens.colors.background.input,
        designTokens.colors.border.input,
      ].join(' '),
    },
    {
      type: 'radio',
      checked: true,
      mode: 'settings',
      className: [
        'border-[#057889]',
        designTokens.colors.background.input,
      ].join(' '),
    },
    // Чекбокс (используем существующие цвета, привязанные к токенам)
    {
      type: 'checkbox',
      checked: true,
      mode: 'default',
      className: 'border-[#057889] bg-[#057889]',
    },
    {
      type: 'checkbox',
      checked: false,
      mode: 'default',
      className: 'border-[#FDFEFF]/35 bg-transparent',
    },
    // Маркер тоггла
    {
      type: 'toggleMarker',
      checked: true,
      mode: 'default',
      className: 'border-[#057889]',
    },
    {
      type: 'toggleMarker',
      checked: false,
      mode: 'default',
      className: 'border-[#FDFEFF]/35 bg-transparent',
    },
  ],
  defaultVariants: {
    type: 'radio',
    checked: false,
    mode: 'default',
  },
});

export const optionIndicatorDotStyles = cva('rounded-full', {
  variants: {
    visible: {
      true: 'h-[10px] w-[10px] bg-[#057889]',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: false,
  },
});
