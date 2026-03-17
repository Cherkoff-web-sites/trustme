import { designTokens } from '../../ui';

export const pageSectionRootStyles = '';

export const pageSectionTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
  'text-center lg:text-left',
  designTokens.spacing.margin.pageStructureTitleToDescription,
].join(' ');

export const pageSectionDescriptionStyles = [
  designTokens.typography.body,
  'text-center lg:text-left',
].join(' ');

export const pageSectionContentOffsetStyles =
  (designTokens.spacing.margin as unknown as Record<string, string>).pageStructureHeaderToContent ??
  'mt-[40px] lg:mt-[60px]';

