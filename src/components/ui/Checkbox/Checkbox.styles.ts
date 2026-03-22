import { combineStyles } from '../../../lib/combineStyles';
import { designTokens } from '../../../styles/design-tokens';

/**
 * Базовый квадрат чекбокса (без hover по label — см. `checkboxLabelHoverClassName`).
 */
export const checkboxVisualBoxClassName = combineStyles(
  'pointer-events-none flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] border border-[#FDFEFF]/35',
  designTokens.colors.background.input,
  'peer-checked:border-[#057889] peer-checked:bg-[#057889]',
  'peer-focus-visible:ring-2 peer-focus-visible:ring-[#057889]',
  'peer-disabled:opacity-50',
  'peer-checked:[&_img]:opacity-100',
);

/** Hover по `Label` с `group`: акцент 2, пока `peer` не выбран. */
export const checkboxLabelHoverClassName = designTokens.colors.accent.secondaryCheckboxHoverUnchecked;

/** Как на дашборде: `selected.svg` */
export const checkboxCheckmarkClassName =
  'h-[9px] w-[13px] opacity-0 transition-opacity';

/** Ошибка валидации: красная рамка, пока не отмечено */
export const checkboxErrorBoxClassName =
  'border-[#EB4335] peer-checked:border-[#057889] peer-checked:bg-[#057889]';

/** @deprecated используйте `checkboxVisualBoxClassName` */
export const checkboxBaseClassName = checkboxVisualBoxClassName;

/** @deprecated используйте `checkboxErrorBoxClassName` */
export const checkboxErrorClassName = checkboxErrorBoxClassName;
