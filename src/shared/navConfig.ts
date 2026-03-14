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
  { label: 'support@trstme.com', href: 'mailto:support@trstme.com' },
  { label: 't.me/trstme_support', href: 'https://t.me/trstme_support' },
  { label: '@trustme_supportbot', href: 'https://t.me/trustme_supportbot' },
] as const;

export const FOOTER_EXTRA_LINKS = [
  { label: 'Политика возврата средств', href: 'https://trstme.com/docs/refund.pdf', external: true },
  { label: 'Публичная оферта', href: 'https://trstme.com/docs/offer.pdf', external: true },
  { label: 'Политика конфиденциальности', href: 'https://trstme.com/docs/confidentiality.pdf', external: true },
] as const;
