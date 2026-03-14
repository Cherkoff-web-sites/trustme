import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'inline-flex items-center justify-center outline-none transition disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'min-h-14 rounded-full bg-[#0A8EA7] px-6 py-4 text-lg font-semibold text-[#FDFEFF] duration-200 hover:-translate-y-px hover:bg-[#10A7C4] focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50',
        secondary:
          'min-h-14 rounded-full border border-white/55 px-6 py-4 text-lg font-semibold text-white hover:bg-white/5',
        ghost: 'text-sm text-white/80 hover:text-white',
        icon: 'rounded-full border border-white/20 text-white/85 hover:bg-white/5',
        pill: 'rounded-full border px-3 py-2 text-sm transition',
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
        className: 'border-white bg-white text-[#151515]',
      },
      {
        variant: 'pill',
        selected: false,
        className: 'border-white/35 bg-[#181818] text-white/85 hover:bg-[#1F1F1F]',
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
