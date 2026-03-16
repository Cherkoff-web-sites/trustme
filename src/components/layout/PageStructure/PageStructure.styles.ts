import { cva } from 'class-variance-authority';
import { designTokens, uiTokens } from '../../ui';

export const pageStructureRootStyles = cva(
  ['pt-10 sm:pt-16 pb-10 sm:pb-14', uiTokens.container].join(' '),
);

export const pageStructureTitleStyles = [
  designTokens.typography.h1h2,
  designTokens.colors.text.primary,
].join(' ');

export const pageStructureDescriptionStyles = [
  'mt-4',
  designTokens.typography.body,
  designTokens.colors.text.muted,
].join(' ');

