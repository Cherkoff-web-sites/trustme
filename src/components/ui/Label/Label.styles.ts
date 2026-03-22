import { cva } from 'class-variance-authority';
import { combineStyles } from '../../../lib/combineStyles';

/**
 * Текст подписи у чекбокса (`Label` inline / inlineStart): моб / ПК.
 */
export const labelCheckboxTextClass =
  'text-[14px] leading-[17px] text-[#FDFEFF] lg:text-[16px] lg:leading-[19px]';

/**
 * Подписи к полям: текст 16px на всех брейкпоинтах.
 * `field` — над полем, отступ снизу 15px до поля.
 * `stack` — колонка: подпись + поле, gap 15px.
 */
export const labelStyles = cva('', {
  variants: {
    variant: {
      /** Подпись над полем (sibling к Input): отступ снизу 15px до поля */
      field: 'mb-[15px] block text-[16px] text-[#FDFEFF]',
      /** Обёртка: подпись + контрол в колонку, gap 15px */
      stack: 'flex w-full flex-col gap-[15px]',
      /** Чекбокс в строке: квадратик и текст по верху (`group` — hover `Checkbox`). */
      inline: combineStyles(
        'group flex cursor-pointer items-start gap-2',
        labelCheckboxTextClass,
      ),
      /** Чекбокс + многострочный текст, выравнивание по верху */
      inlineStart: combineStyles(
        'group flex cursor-pointer items-start gap-2',
        labelCheckboxTextClass,
      ),
    },
  },
  defaultVariants: {
    variant: 'field',
  },
});
