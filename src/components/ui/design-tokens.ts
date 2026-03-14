import { designTokens } from '../../styles/design-tokens';

export const uiTokens = {
  container: 'mx-auto w-full max-w-[1600px] px-[15px] lg:px-[30px]',
  page: `relative min-h-screen overflow-hidden ${designTokens.cardBg}`,
  card: `${designTokens.radiusCard} ${designTokens.cardBorder} ${designTokens.cardBg} ${designTokens.fontCardBody}`,
  modalCard: `${designTokens.radiusCard} border border-[#FDFEFF] ${designTokens.cardBg} ${designTokens.text}`,
  input: `h-14 w-full ${designTokens.radiusInput} ${designTokens.inputBorder} ${designTokens.inputBg} px-[18px] ${designTokens.text} outline-none ${designTokens.inputPlaceholder} focus:border-[#FDFEFF]`,
  titleAccent: designTokens.buttonPrimaryBg,
  primaryButton: `inline-flex min-h-14 items-center justify-center ${designTokens.radiusButton} ${designTokens.buttonPrimaryBg} px-6 py-4 ${designTokens.fontButton} ${designTokens.text} outline-none transition duration-200 hover:-translate-y-px ${designTokens.buttonPrimaryHover} focus-visible:ring-2 focus-visible:ring-[#057889]/50`,
  secondaryButton: `inline-flex min-h-14 items-center justify-center ${designTokens.radiusButton} border border-[#FDFEFF]/55 px-6 py-4 ${designTokens.fontButton} text-[#FDFEFF] transition hover:bg-[#FDFEFF]/5`,
  ghostButton: 'inline-flex items-center justify-center text-sm text-[#FDFEFF]/80 transition-colors hover:text-[#FDFEFF]',
  iconButton: `inline-flex items-center justify-center ${designTokens.radiusButton} border border-[#FDFEFF]/20 text-[#FDFEFF]/85 transition hover:bg-[#FDFEFF]/5`,
  filterControl: `flex h-12 items-center justify-between ${designTokens.radiusInput} ${designTokens.inputBorder} ${designTokens.inputBg} px-4 ${designTokens.fontButton} text-[#FDFEFF]/55`,
  chip: `inline-flex items-center gap-2 ${designTokens.radiusButton} border border-[#FDFEFF]/30 bg-[#1A1A1A] px-3 py-1 text-xs text-[#FDFEFF]/80 hover:bg-[#2A2A2A]`,
  formLabel: 'text-[15px] leading-[1.2] text-[#FDFEFF]/85',
  cardBody: designTokens.fontCardBody,
  cardTitle: designTokens.fontCardTitle,
  success: designTokens.success,
  error: designTokens.error,
  warning: designTokens.warning,
} as const;

export { designTokens };
