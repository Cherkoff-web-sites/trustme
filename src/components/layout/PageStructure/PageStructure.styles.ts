import { cva } from 'class-variance-authority';
import { designTokens } from '../../ui';

export const pageStructureRootStyles = cva(
  ['pt-10 sm:pt-16 pb-10 sm:pb-14'].join(' '),
);

export const pageStructureTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
  designTokens.spacing.margin.pageStructureTitleToDescription,
].join(' ');

export const pageStructureDescriptionStyles = [
  designTokens.typography.body,
  designTokens.colors.text.muted,
].join(' ');

export const pageStructureTitlenSubStyles =
  (designTokens.spacing.margin as unknown as Record<string, string>).pageStructureHeaderToContent ??
  'mt-[40px] lg:mt-[60px]';

