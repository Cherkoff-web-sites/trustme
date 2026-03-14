import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { filterTriggerStyles } from './FilterTrigger.styles';

export interface FilterTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterTriggerStyles> {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export function FilterTrigger({
  label,
  icon = <span className="text-white/35">▾</span>,
  active,
  minWidth,
  className,
  ...props
}: FilterTriggerProps) {
  return (
    <button className={cn(filterTriggerStyles({ active, minWidth }), className)} type="button" {...props}>
      <span>{label}</span>
      {icon}
    </button>
  );
}
