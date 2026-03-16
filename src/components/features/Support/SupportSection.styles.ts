import { designTokens } from '../../ui';

export const supportSectionWrapStyles = ['pt-10 sm:pt-16', designTokens.spacing.margin.horizontal].join(' ');

export const supportSectionCardStyles = [
  designTokens.presets.card.default,
  designTokens.spacing.padding.cardVertical,
  designTokens.spacing.padding.cardHorizontal,
].join(' ');

export const supportSectionTitleStyles = [
  'mb-5',
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
].join(' ');

export const supportSectionLeadStyles = [
  'mb-5',
  designTokens.typography.cardTitle,
  designTokens.colors.text.primary,
].join(' ');

export const supportSectionTextStyles = [
  'max-w-[980px]',
  designTokens.typography.body,
  designTokens.colors.text.primary,
].join(' ');

export const supportSectionActionsStyles = [
  'mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row',
].join(' ');

