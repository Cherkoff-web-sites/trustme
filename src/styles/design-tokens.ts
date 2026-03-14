/**
 * Design system tokens: colors, radii, typography.
 * Use these to build Tailwind class strings in components.
 */

export const colors = {
  cardBg: '#1A1A1A',
  border: '#FDFEFF',
  text: '#FDFEFF',
  buttonPrimary: '#057889',
  success: '#34A853',
  error: '#EB4335',
  warning: '#EBA535',
  inputBg: '#2A2A2A',
  inputBorderPlaceholder: 'rgba(253, 254, 255, 0.5)',
} as const;

export const radii = {
  button: '100px',
  input: '10px',
  card: '28px',
} as const;

export const typography = {
  body: 'text-base lg:text-[24px] font-normal',
  bodyLeading: 'leading-[1.45]',
  h1h2: 'text-[24px] lg:text-[48px] font-semibold',
  h3: 'text-[16px] lg:text-[24px] font-semibold',
  button: 'text-[14px] lg:text-[20px] font-semibold',
  cardBody: 'text-base lg:text-[18px] font-normal',
  cardTitle: 'text-[16px] lg:text-[24px] font-semibold',
} as const;

/** Tailwind-ready class strings built from design tokens */
export const designTokens = {
  cardBg: 'bg-[#1A1A1A]',
  cardBorder: 'border border-[#FDFEFF]',
  card: 'rounded-[28px] border border-[#FDFEFF] bg-[#1A1A1A]',
  text: 'text-[#FDFEFF]',
  buttonPrimaryBg: 'bg-[#057889]',
  buttonPrimaryHover: 'hover:bg-[#068a9c]',
  success: 'text-[#34A853]',
  successBg: 'bg-[#34A853]',
  error: 'text-[#EB4335]',
  errorBg: 'bg-[#EB4335]',
  warning: 'text-[#EBA535]',
  warningBg: 'bg-[#EBA535]',
  inputBg: 'bg-[#2A2A2A]',
  inputBorder: 'border border-[#FDFEFF]/50',
  inputPlaceholder: 'placeholder:text-[#FDFEFF]/50',
  radiusButton: 'rounded-[100px]',
  radiusInput: 'rounded-[10px]',
  radiusCard: 'rounded-[28px]',
  fontBody: 'text-base lg:text-[24px] font-normal',
  fontH1H2: 'text-[24px] lg:text-[48px] font-semibold',
  fontH3: 'text-[16px] lg:text-[24px] font-semibold',
  fontButton: 'text-[14px] lg:text-[20px] font-semibold',
  fontCardBody: 'text-base lg:text-[18px] font-normal',
  fontCardTitle: 'text-[16px] lg:text-[24px] font-semibold',
} as const;
