import { designTokens } from '../../ui';

export const supportSectionWrapStyles = '';

export const supportSectionCardStyles = [
  'lg:p-[60px]',
  'bg-[linear-gradient(117.04deg,rgba(26,26,26,0.2)0.57%,rgba(14,184,210,0.2)48.85%,rgba(28,56,73,0.2)100%),rgba(5,120,137,0.1)]',
].join(' ');

export const supportSectionTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
  designTokens.spacing.margin.pageStructureTitleToDescription,
].join(' ');

export const supportSectionLeadStyles = [
  designTokens.typography.body,
  designTokens.colors.text.primary,
  'font-semibold',
  'mb-[15px]',
].join(' ');

export const supportSectionTextStyles = [
  designTokens.typography.body,
  designTokens.colors.text.primary,
].join(' ');

export const supportSectionActionsStyles = [
  'mt-[40px] lg:mt-[60px]',
  'flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-[30px]',
].join(' ');

