import { SUPPORT_TELEGRAM_URL } from './supportLinks';

/**
 * Единый источник ссылок для шапки и подвала.
 * Изменения здесь автоматически применяются в Header и Footer.
 */
export const MAIN_NAV_ITEMS = [
  ['Личный кабинет', '/cabinet'],
  ['История запросов', '/history'],
  ['Новая проверка', '/new-check'],
  ['Тариф', '/tariff'],
  ['Баланс', '/balance'],
  ['Настройки', '/settings'],
] as const;

export const FOOTER_SUPPORT_LINKS = [
  { label: 't.me/trstme_support', href: SUPPORT_TELEGRAM_URL },
  { label: '@trstme_support', href: SUPPORT_TELEGRAM_URL },
  { label: '@trustme_supportbot', href: SUPPORT_TELEGRAM_URL },
] as const;

export const FOOTER_EXTRA_LINKS = [
  { label: 'Политика возврата средств', href: 'https://trstme.com/docs/refund.pdf', external: true },
  { label: 'Публичная оферта', href: 'https://trstme.com/docs/offer.pdf', external: true },
  { label: 'Политика конфиденциальности', href: 'https://trstme.com/docs/confidentiality.pdf', external: true },
] as const;
