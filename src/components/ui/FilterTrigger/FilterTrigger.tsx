import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import chevronSvg from '../../../assets/icons/chevron.svg';
import { filterTriggerStyles } from './FilterTrigger.styles';

export interface FilterTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filterTriggerStyles> {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export function FilterTrigger({
  label,
  icon = <img src={chevronSvg} alt="" className="h-auto w-[12px]" aria-hidden />,
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
