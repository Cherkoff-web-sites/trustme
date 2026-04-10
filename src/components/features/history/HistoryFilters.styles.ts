import { designTokens } from '../../ui';

export const historyFiltersToolbarStyles =
  'mb-4 flex flex-wrap items-start gap-3 lg:mb-[30px] lg:flex-nowrap lg:gap-[20px]';

/** Стили единого поля «Поиск» (`Input` + `startAdornment`), без внешней flex-обёртки. */
export const historyFiltersSearchInputClassName =
  [
    'h-[59px] min-w-[140px] text-[16px] font-normal',
    'rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A]',
    'transition-[background-color,border-color,box-shadow] duration-150',
    'lg:hover:bg-[#393939]',
  ].join(' ');

export const historyFiltersDropdownPanelStyles =
  [
    'absolute left-0 top-full z-10 min-w-full rounded-[10px] border border-[#FDFEFF]/50 p-4 shadow-lg',
    'mt-[15px]',
    designTokens.colors.background.input,
  ].join(' ');

/**
 * Два `type="date"` в одну строку: две равные колонки `1fr`, средняя — только тире (`auto`),
 * на `lg` промежуток между колонками 30px (между полем — тире — полем).
 */
export const dateRangePairRowStyles =
  'grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 lg:gap-[30px]';

/** Ячейка под поле даты в паре — тянется на всю ширину колонки сетки. */
export const dateRangePairFieldWrapStyles = 'min-w-0 w-full';

/** Два поля даты с подписями «с» / «по» в две равные колонки; на `lg` промежуток 30px. */
export const dateRangeLabeledPairGridStyles =
  'grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-[30px]';

