import * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  dashboardGridMiddleColumnStackStyles,
  dashboardGridRootStyles,
} from './DashboardGrid.styles';

/** Сетка страницы «Управление»: статистика справа на всю высоту, Telegram во второй строке на 2 колонки (отдельно от дашборда). */
export interface ManageAccountsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  newCheck: React.ReactNode;
  balance: React.ReactNode;
  tariff: React.ReactNode;
  telegram: React.ReactNode;
  stats: React.ReactNode;
}

export function ManageAccountsGrid({
  newCheck,
  balance,
  tariff,
  telegram,
  stats,
  className,
  ...props
}: ManageAccountsGridProps) {
  return (
    <div className={cn(dashboardGridRootStyles, className)} {...props}>
      <div className="min-w-0 lg:col-start-1 lg:row-start-1">{newCheck}</div>

      <div
        className={cn(dashboardGridMiddleColumnStackStyles, 'min-w-0 lg:col-start-2 lg:row-start-1')}
      >
        {balance}
        {tariff}
      </div>

      <div className="min-w-0 lg:col-start-1 lg:col-span-2 lg:row-start-2">{telegram}</div>

      <div className="flex min-h-0 min-w-0 flex-col lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:h-full">
        {stats}
      </div>
    </div>
  );
}
