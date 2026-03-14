import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'inline-flex items-center justify-center outline-none transition disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'min-h-14 rounded-[100px] bg-[#057889] px-6 py-4 text-[14px] lg:text-[20px] font-semibold text-[#FDFEFF] duration-200 hover:-translate-y-px hover:bg-[#068a9c] focus-visible:ring-2 focus-visible:ring-[#057889]/50',
        secondary:
          'min-h-14 rounded-[100px] border border-[#FDFEFF]/55 px-6 py-4 text-[14px] lg:text-[20px] font-semibold text-[#FDFEFF] hover:bg-[#FDFEFF]/5',
        ghost: 'text-sm text-[#FDFEFF]/80 hover:text-[#FDFEFF]',
        icon: 'rounded-[100px] border border-[#FDFEFF]/20 text-[#FDFEFF]/85 hover:bg-[#FDFEFF]/5',
        pill: 'rounded-[100px] border px-3 py-2 text-sm transition',
      },
      size: {
        default: '',
        sm: 'min-h-10 px-4 py-2 text-sm',
        icon: 'h-11 w-11 p-0 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'pill',
        selected: true,
        className: 'border-[#FDFEFF] bg-[#FDFEFF] text-[#1A1A1A]',
      },
      {
        variant: 'pill',
        selected: false,
        className: 'border-[#FDFEFF]/35 bg-[#1A1A1A] text-[#FDFEFF]/85 hover:bg-[#2A2A2A]',
      },
      {
        variant: 'icon',
        size: 'icon',
        className: '',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
      selected: false,
    },
  },
);
