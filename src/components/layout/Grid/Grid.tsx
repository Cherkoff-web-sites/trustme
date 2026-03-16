import * as React from 'react';
import { cn } from '../../../lib/cn';
import { gridStyles } from './Grid.styles';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: 'dashboard' | 'settings' | 'tariff';
  columns?: string;
  gapClassName?: string;
}

export function Grid({ preset, columns, gapClassName, className, children, ...props }: GridProps) {
  const presetClass = preset ? gridStyles({ preset }) : gridStyles();
  const columnsClass = columns ? columns : '';
  const gapClass = gapClassName ? gapClassName : '';

  return (
    <div className={cn(presetClass, columnsClass, gapClass, className)} {...props}>
      {children}
    </div>
  );
}

