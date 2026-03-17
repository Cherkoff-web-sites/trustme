import { cva } from 'class-variance-authority';

export const sectionCardStyles = cva('rounded-[28px] border border-[#FDFEFF] bg-[#1A1A1A] text-base font-normal lg:text-[18px]', {
  variants: {
    variant: {
      default: 'p-5 sm:p-6',
      compact: 'p-4 sm:p-5',
      interactive: 'p-5 sm:p-6 transition hover:border-[#FDFEFF]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const sectionCardHeaderStyles = 'mb-4 flex items-center justify-between gap-4';
export const sectionCardTitleStyles = 'text-[16px] lg:text-[24px] leading-none font-semibold text-[#FDFEFF]';
export const sectionCardAsideStyles = 'text-base text-[#FDFEFF] lg:text-[18px]';
export const sectionCardDividerStyles = 'mb-4 h-px w-full bg-[#FDFEFF]/15';
