import { designTokens } from '../../ui';
import { cardInsetAccentHoverStyles } from '../../ui/Card/Card.styles';

export const historyRequestCardRootStyles = cardInsetAccentHoverStyles;

/** Заголовок карточки (название проверки) — mobile + desktop */
export const historyRequestCardTitleStyles =
  'text-[18px] leading-[1] font-semibold uppercase text-white lg:text-[24px]';

export const historyRequestCardHeaderStyles =
  'flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between';

export const historyRequestCardTypeChipStyles =
  [
    'inline-flex w-auto flex-none items-center justify-start rounded-full p-[15px]',
    'text-[14px] lg:text-[18px] leading-[1] text-[#FDFEFF]',
    designTokens.colors.background.input,
    'border-[0.5px] border-[rgba(253,254,255,0.5)]',
    'shadow-[inset_2px_2px_10px_rgba(14,184,210,0.3),inset_-2px_-2px_10px_rgba(253,254,255,0.2)]',
    'backdrop-blur-[5px]',
  ].join(' ');

export const historyRequestCardNameRowStyles = 'mt-4 flex items-center gap-2 lg:mt-[30px]';

export const historyRequestCardMetaGridStyles =
  [
    'grid gap-4 text-[16px] font-normal text-[#FDFEFF] lg:text-[18px]',
    'lg:flex lg:flex-wrap lg:items-start lg:gap-y-4 lg:gap-x-[60px] lg:mb-[30px]',
  ].join(' ');
