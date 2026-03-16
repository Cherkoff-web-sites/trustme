import type * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  sectionHeaderDescriptionStyles,
  sectionHeaderRootStyles,
  sectionHeaderTitleStyles,
} from './SectionHeader.styles';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export function SectionHeader({ title, description, className, ...props }: SectionHeaderProps) {
  return (
    <header className={cn(sectionHeaderRootStyles, className)} {...props}>
      <h2 className={sectionHeaderTitleStyles}>{title}</h2>
      {description ? <p className={sectionHeaderDescriptionStyles}>{description}</p> : null}
    </header>
  );
}

