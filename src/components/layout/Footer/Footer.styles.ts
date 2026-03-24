/**
 * Общие классы футера — один источник для типографики и повторяющихся блоков.
 */

/** Подпись под контактом («Запросите тестовый доступ…»). */
export const footerContactCaptionClassName =
  'text-[16px] leading-[100%] text-[#FDFEFF] lg:text-[18px]';

/** Ссылка с иконкой (почта, Telegram). Без цвета — добавляйте `designTokens.colors.text.primary` через `combineStyles`. */
export const footerContactLinkClassName =
  'footer__contact__link inline-flex items-center gap-[11px] text-[16px] font-semibold leading-[100%] mb-5 lg:mb-5 lg:text-[18px] transition-colors';

/** Заголовок колонки ссылок (Информация, Служба поддержки, …): линия снизу только с `lg`. */
export const footerNavColumnTitleClassName =
  'mb-[30px] inline-block border-b-0 pb-0 text-[16px] font-semibold normal-case text-[#FDFEFF] whitespace-nowrap lg:border-b lg:border-[#FDFEFF] lg:pb-[15px] lg:text-[18px]';

export const footerNavListClassName = 'flex flex-col gap-[15px] text-[16px] lg:text-[18px]';

/** К ссылкам в колонках добавляется цвет из токенов. */
export const footerNavLinkClassName = 'transition hover:underline active:underline';

export const footerLegalListClassName =
  'flex flex-col gap-[3px] text-[16px] text-[#FDFEFF] lg:text-[18px]';

export const footerScrollTopButtonClassName =
  'hidden h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[100px] text-[#FDFEFF] transition md:flex';

/** Обёртка полосы-декора над логотипом; внутри — `<img>`, не background. */
export const footerDecorStripClassName =
  'pointer-events-none absolute top-0 left-0 right-0 flex h-[11px] w-full items-center justify-center overflow-hidden';

export const footerDecorImgClassName = 'h-[11px] w-full max-w-none object-contain object-center';

export const footerBrandRowClassName =
  'mb-10 flex flex-col justify-between gap-5 lg:mb-[60px] lg:flex-row lg:items-center md:mb-10 md:items-start';

export const footerLogoImgClassName = 'h-auto w-[92px] lg:w-[184px]';

export const footerSupportHoursButtonClassName =
  'inline-flex items-center gap-2.5 rounded-[100px] border border-[#FDFEFF] px-[15px] py-[15px] text-[16px] font-semibold leading-[100%] text-[#FDFEFF] transition lg:text-[18px] md:items-start md:text-left md:leading-[120%]';

export const footerDescriptionClassName =
  'text-[16px] leading-[1.45] text-[#FDFEFF] lg:text-[18px]';
