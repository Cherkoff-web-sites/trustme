import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { alertBannerIconStyles, alertBannerStyles } from './AlertBanner.styles';

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerStyles> {
  icon?: React.ReactNode;
}

export function AlertBanner({
  tone,
  icon = '!',
  children,
  className,
  ...props
}: AlertBannerProps) {
  return (
    <div className={cn(alertBannerStyles({ tone }), className)} {...props}>
      <span className={alertBannerIconStyles({ tone })}>{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
