import { designTokens } from '../../ui';

export const pageSectionRootStyles = '';

export const pageSectionTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
  // Mobile: centered + fit-content; also force-reset horizontal spacing in passed ReactNode children.
  'inline text-center px-0',
  '[&_*]:mx-0 [&_*]:px-0',
  'lg:text-left',
].join(' ');

export const pageSectionTitleWrapStyles = [
  'relative mx-auto w-fit max-w-[265px] text-center lg:mx-0 lg:max-w-none lg:text-left',
  designTokens.spacing.margin.pageStructureTitleToDescription,
].join(' ');

export const pageSectionDescriptionStyles = [
  designTokens.typography.body,
  'text-center lg:text-left',
].join(' ');

export const pageSectionContentOffsetStyles =
  (designTokens.spacing.margin as unknown as Record<string, string>).pageStructureHeaderToContent ??
  'mt-[40px] lg:mt-[60px]';

