import { designTokens } from '../../styles/design-tokens';
import { combineStyles } from '../../lib/combineStyles';

export const uiTokens = {
  /** Контейнер страницы. */
  container: 'mx-auto w-full max-w-[1600px] px-[15px] lg:px-[30px]',

  /** Фон страницы. */
  page: combineStyles('relative min-h-screen overflow-hidden', designTokens.colors.background.page),

  /** Базовая карточка. */
  card: combineStyles(
    designTokens.borderRadius.card,
    designTokens.colors.border.primary,
    designTokens.colors.background.card,
    designTokens.typography.cardBody,
  ),

  /** Карточка модального окна. */
  modalCard: combineStyles(
    designTokens.borderRadius.card,
    designTokens.colors.border.primary,
    designTokens.colors.background.card,
    designTokens.typography.cardBody,
  ),

  /** Базовый инпут. */
  input: combineStyles(
    'h-14 w-full px-[18px] outline-none focus:border-[#FDFEFF]',
    designTokens.borderRadius.input,
    designTokens.colors.border.input,
    designTokens.colors.background.input,
    designTokens.typography.input,
    designTokens.colors.text.primary,
    designTokens.presets.input.default.split(' ').filter((c) => c.startsWith('placeholder:')).join(' '),
  ),

  /** Акцент для заголовков (использует основной акцентный фон). */
  titleAccent: designTokens.colors.accent.primaryBg,

  /** Основная кнопка. */
  primaryButton: combineStyles(
    designTokens.presets.button.primary,
    'outline-none transition duration-200 hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-[#057889]/50',
  ),

  /** Вторичная кнопка. */
  secondaryButton: combineStyles(
    designTokens.presets.button.secondary,
    'transition hover:bg-[#FDFEFF]/5',
  ),

  /** «Призрачная» текстовая кнопка. */
  ghostButton:
    'inline-flex items-center justify-center text-sm text-[#FDFEFF]/80 transition-colors hover:text-[#FDFEFF]',

  /** Кнопка‑иконка. */
  iconButton:
    'inline-flex items-center justify-center rounded-[100px] border border-[#FDFEFF]/20 text-[#FDFEFF]/85 transition hover:bg-[#FDFEFF]/5',

  /** Контрол фильтра (триггер). */
  filterControl: combineStyles(
    'flex h-12 items-center justify-between px-4 text-[#FDFEFF]/55',
    designTokens.borderRadius.input,
    designTokens.colors.border.input,
    designTokens.colors.background.control,
    designTokens.typography.button,
  ),

  /** Чип активного фильтра. */
  chip:
    'inline-flex items-center gap-2 rounded-[100px] border border-[#FDFEFF]/30 bg-[#1A1A1A] px-3 py-1 text-xs text-[#FDFEFF]/80 hover:bg-[#2A2A2A]',

  /** Лейбл формы. */
  formLabel: 'text-[15px] leading-[1.2] text-[#FDFEFF]/85',

  /** Текст внутри карточек. */
  cardBody: designTokens.typography.cardBody,

  /** Заголовок карточки. */
  cardTitle: designTokens.typography.cardTitle,

  /** Цветовые статусы. */
  success: designTokens.colors.text.statusSuccess,
  error: designTokens.colors.text.statusError,
  warning: designTokens.colors.text.statusWarning,
} as const;

export { designTokens };
