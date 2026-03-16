import * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  dashboardGridMiddleColumnStackStyles,
  dashboardGridRootStyles,
  dashboardGridSecondRowLeftStyles,
} from './DashboardGrid.styles';

export interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  newCheck: React.ReactNode;
  balance: React.ReactNode;
  tariff: React.ReactNode;
  telegram: React.ReactNode;
  recentRequests: React.ReactNode;
  stats: React.ReactNode;
}

export function DashboardGrid({
  newCheck,
  balance,
  tariff,
  telegram,
  recentRequests,
  stats,
  className,
  ...props
}: DashboardGridProps) {
  return (
    <div className={cn(dashboardGridRootStyles, className)} {...props}>
      {newCheck}

      <div className={dashboardGridMiddleColumnStackStyles}>
        {balance}
        {tariff}
      </div>

      {telegram}

      <div className={dashboardGridSecondRowLeftStyles}>{recentRequests}</div>

      {stats}
    </div>
  );
}

