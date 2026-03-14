import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  sectionCardAsideStyles,
  sectionCardDividerStyles,
  sectionCardHeaderStyles,
  sectionCardStyles,
  sectionCardTitleStyles,
} from './SectionCard.styles';

export interface SectionCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof sectionCardStyles> {
  title?: React.ReactNode;
  aside?: React.ReactNode;
  divider?: boolean;
  as?: React.ElementType;
}

export function SectionCard({
  title,
  aside,
  divider = !!title,
  className,
  children,
  variant,
  as: Comp = 'section',
  ...props
}: SectionCardProps) {
  return (
    <Comp className={cn(sectionCardStyles({ variant }), className)} {...props}>
      {title || aside ? (
        <>
          <div className={sectionCardHeaderStyles}>
            {title ? <h3 className={sectionCardTitleStyles}>{title}</h3> : <div />}
            {aside ? <span className={sectionCardAsideStyles}>{aside}</span> : null}
          </div>
          {divider ? <div className={sectionCardDividerStyles} /> : null}
        </>
      ) : null}
      {children}
    </Comp>
  );
}
