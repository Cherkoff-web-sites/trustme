import { cva } from 'class-variance-authority';

export const sectionCardStyles = cva('rounded-[28px] border border-white/85 bg-[#151515]/95', {
  variants: {
    variant: {
      default: 'p-5 sm:p-6',
      compact: 'p-4 sm:p-5',
      interactive: 'p-5 sm:p-6 transition hover:border-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const sectionCardHeaderStyles = 'mb-4 flex items-center justify-between gap-4';
export const sectionCardTitleStyles = 'text-[20px] leading-none font-medium text-white';
export const sectionCardAsideStyles = 'text-sm text-white/85';
export const sectionCardDividerStyles = 'mb-4 h-px w-full bg-white/15';
