import { designTokens } from '../../ui';

export const historyFiltersToolbarStyles =
  'mb-4 flex flex-wrap items-start gap-3 lg:mb-[30px] lg:flex-nowrap lg:gap-[20px]';

export const historyFiltersSearchStyles =
  'flex h-[59px] min-w-[140px] items-center gap-3 rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] px-[20px] text-[16px] font-normal text-[#FDFEFF] placeholder:text-[#FDFEFF]/50';

export const historyFiltersDropdownPanelStyles =
  [
    'absolute left-0 top-full z-10 min-w-full rounded-[10px] border border-[#FDFEFF]/50 p-4 shadow-lg',
    'mt-[15px]',
    designTokens.colors.background.input,
  ].join(' ');

