import { cva } from 'class-variance-authority';
import { designTokens } from '../design-tokens';

export const sectionHeaderRootStyles = cva('mb-6');

export const sectionHeaderTitleStyles = [
  designTokens.typography.h3,
  designTokens.colors.text.primary,
].join(' ');

export const sectionHeaderDescriptionStyles = [
  'mt-2',
  designTokens.typography.body,
  designTokens.colors.text.muted,
].join(' ');

