import { cva } from 'class-variance-authority';

export const filterTriggerStyles = cva(
  'flex h-12 items-center justify-between rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-4 text-sm transition',
  {
    variants: {
      active: {
        true: 'text-white',
        false: 'text-white/55 hover:text-white/80',
      },
      minWidth: {
        none: '',
        md: 'min-w-[170px]',
      },
    },
    defaultVariants: {
      active: false,
      minWidth: 'none',
    },
  },
);
