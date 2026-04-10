import { cva } from 'class-variance-authority';
import { designTokens } from '../../../styles/design-tokens';

export const inputStyles = cva(
  [
    'w-full rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] px-[18px] text-[#FDFEFF] outline-none',
    /** Скрыть нативный крестик очистки у `type="search"` (Chrome, Safari, Edge). */
    '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden',
    'placeholder:text-[#FDFEFF]/50 placeholder:font-normal placeholder:text-[14px] lg:placeholder:text-[16px]',
    designTokens.typography.input,
    /** Состояния hover / focus / error задаются в `Input.tsx`. */
    'transition-[border-color,background-color] duration-150',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'h-[60px]',
        compact: 'h-[60px] bg-[#2A2A2A]',
        centered: 'h-[60px] text-center',
        date: 'h-[60px] bg-[#2A2A2A]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
