import { cva } from 'class-variance-authority';

export const optionIndicatorStyles = cva('shrink-0 border', {
  variants: {
    type: {
      radio: 'h-4 w-4 rounded-full',
      checkbox: 'h-4 w-4 rounded-[4px]',
      toggleMarker:
        'inline-flex h-4 w-4 items-center justify-center rounded-full border',
    },
    checked: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      type: 'radio',
      checked: true,
      className: 'border-[#FDFEFF] bg-[#FDFEFF]/15',
    },
    {
      type: 'radio',
      checked: false,
      className: 'border-[#FDFEFF]/35 bg-transparent',
    },
    {
      type: 'checkbox',
      checked: true,
      className: 'border-[#057889] bg-[#057889]',
    },
    {
      type: 'checkbox',
      checked: false,
      className: 'border-[#FDFEFF]/35 bg-transparent',
    },
    {
      type: 'toggleMarker',
      checked: true,
      className: 'border-[#057889]',
    },
    {
      type: 'toggleMarker',
      checked: false,
      className: 'border-[#FDFEFF]/35 bg-transparent',
    },
  ],
  defaultVariants: {
    type: 'radio',
    checked: false,
  },
});

export const optionIndicatorDotStyles = cva('rounded-full', {
  variants: {
    visible: {
      true: 'h-2 w-2 bg-[#057889]',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: false,
  },
});
