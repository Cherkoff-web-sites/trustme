import { cva } from 'class-variance-authority';

export const toggleSwitchStyles = cva(
  'relative inline-flex h-8 w-14 items-center rounded-full border transition',
  {
    variants: {
      checked: {
        true: 'border-[#0EB8D2] bg-[#0EB8D2]',
        false: 'border-white/20 bg-white/10',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export const toggleSwitchThumbStyles = cva(
  'inline-block h-6 w-6 rounded-full bg-white transition-transform',
  {
    variants: {
      checked: {
        true: 'translate-x-7',
        false: 'translate-x-1',
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);
