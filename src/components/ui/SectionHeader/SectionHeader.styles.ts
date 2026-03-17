import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const sectionHeaderRootStyles = cva('mb-6');

export const sectionHeaderTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
  designTokens.spacing.margin.pageStructureTitleToDescription,
].join(' ');

export const sectionHeaderDescriptionStyles = [
  // отступ задаём нижним margin у заголовка (как в PageStructure)
  designTokens.typography.body,
  designTokens.colors.text.muted,
].join(' ');

