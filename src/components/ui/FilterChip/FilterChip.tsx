import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { filterChipStyles } from './FilterChip.styles';

export interface FilterChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterChipStyles> {
  removeIcon?: React.ReactNode;
}

export function FilterChip({
  variant,
  selected,
  className,
  children,
  removeIcon,
  ...props
}: FilterChipProps) {
  return (
    <button className={cn(filterChipStyles({ variant, selected }), className)} type="button" {...props}>
      <span className="min-w-0 max-w-full text-center leading-tight">{children}</span>
      {removeIcon}
    </button>
  );
}
