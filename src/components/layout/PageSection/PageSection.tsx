import type * as React from 'react';
import { useId } from 'react';
import { cn } from '../../../lib/cn';
import {
  pageSectionContentOffsetStyles,
  pageSectionDescriptionStyles,
  pageSectionRootStyles,
  pageSectionTitleStyles,
} from './PageSection.styles';
import { useAutoHeading } from './heading-context';

export type PageSectionHeading = 'auto' | 'h1' | 'h2';

export interface PageSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  heading?: PageSectionHeading;
}

export function PageSection({
  title,
  description,
  heading = 'auto',
  children,
  className,
  ...props
}: PageSectionProps) {
  const reactId = useId();
  const autoHeading = useAutoHeading(reactId);
  const HeadingTag = heading === 'auto' ? autoHeading : heading;

  return (
    <section className={cn(pageSectionRootStyles, className)} {...props}>
      <HeadingTag className={pageSectionTitleStyles}>{title}</HeadingTag>
      {description ? <p className={pageSectionDescriptionStyles}>{description}</p> : null}
      {children ? <div className={pageSectionContentOffsetStyles}>{children}</div> : null}
    </section>
  );
}

