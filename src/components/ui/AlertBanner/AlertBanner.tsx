import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { alertBannerIconStyles, alertBannerStyles } from './AlertBanner.styles';
import warningSvg from '../../../assets/icons/warning.svg';

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerStyles> {
  icon?: React.ReactNode;
  /** Упрощённый вариант: текст баннера одним пропом (без <p> на странице). */
  text?: React.ReactNode;
}

export function AlertBanner({
  tone,
  icon = <img src={warningSvg} alt="" className="h-6 w-6 shrink-0" />,
  text,
  children,
  className,
  ...props
}: AlertBannerProps) {
  return (
    <div className={cn(alertBannerStyles({ tone }), className)} {...props}>
      <span className={alertBannerIconStyles({ tone })}>{icon}</span>
      <div className="min-w-0 flex-1">
        {text !== undefined ? <p className="m-0">{text}</p> : children}
      </div>
    </div>
  );
}
