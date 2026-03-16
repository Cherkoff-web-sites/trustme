import type * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  pageStructureDescriptionStyles,
  pageStructureRootStyles,
  pageStructureTitleStyles,
} from './PageStructure.styles';

export interface PageStructureProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export function PageStructure({ title, description, children, className, ...props }: PageStructureProps) {
  return (
    <section className={cn(pageStructureRootStyles, className)} {...props}>
      <header>
        <h1 className={pageStructureTitleStyles}>{title}</h1>
        {description ? <p className={pageStructureDescriptionStyles}>{description}</p> : null}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

