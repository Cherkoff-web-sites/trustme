import type * as React from 'react';
import { useId } from 'react';
import titleDecorMob from '../../../assets/title_decor_mob.svg';
import titleDecorPc from '../../../assets/title_decor_pc.svg';
import { cn } from '../../../lib/cn';
import {
  pageSectionContentOffsetStyles,
  pageSectionDescriptionStyles,
  pageSectionRootStyles,
  pageSectionTitleStyles,
  pageSectionTitleWrapStyles,
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
      <div className={pageSectionTitleWrapStyles}>
        <HeadingTag className={pageSectionTitleStyles}>{title}</HeadingTag>
        <img
          src={titleDecorMob}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[calc(100%+20px)] top-1/2 h-auto w-[76px] -translate-y-1/2 lg:hidden"
        />
        <img
          src={titleDecorMob}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[calc(100%+20px)] top-1/2 h-auto w-[76px] -translate-y-1/2 scale-x-[-1] lg:hidden"
        />
        <img
          src={titleDecorPc}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[calc(100%+30px)] top-1/2 hidden h-auto w-[267px] -translate-y-1/2 shrink-0 lg:block"
        />
      </div>
      {description ? <p className={pageSectionDescriptionStyles}>{description}</p> : null}
      {children ? <div className={pageSectionContentOffsetStyles}>{children}</div> : null}
    </section>
  );
}

