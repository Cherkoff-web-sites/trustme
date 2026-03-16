import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { cardAsideStyles, cardDividerStyles, cardHeaderStyles, cardRootStyles, cardTitleStyles } from './Card.styles';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof cardRootStyles> {
  title?: React.ReactNode;
  aside?: React.ReactNode;
  divider?: boolean;
  as?: React.ElementType;
}

export function Card({
  title,
  aside,
  divider = !!title,
  className,
  children,
  variant,
  as: Comp = 'section',
  ...props
}: CardProps) {
  return (
    <Comp className={cn(cardRootStyles({ variant }), className)} {...props}>
      {title || aside ? (
        <>
          <div className={cardHeaderStyles}>
            {title ? <h3 className={cardTitleStyles}>{title}</h3> : <div />}
            {aside ? <span className={cardAsideStyles}>{aside}</span> : null}
          </div>
          {divider ? <div className={cardDividerStyles} /> : null}
        </>
      ) : null}
      {children}
    </Comp>
  );
}

