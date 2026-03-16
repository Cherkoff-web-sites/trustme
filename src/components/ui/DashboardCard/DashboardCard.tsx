import * as React from 'react';
import { SectionCard } from '../SectionCard';
import { cn } from '../../../lib/cn';

export interface DashboardCardProps {
  title: string;
  aside?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  aside,
  children,
  className,
}: DashboardCardProps) {
  return (
    <SectionCard title={title} aside={aside} className={cn('w-full', className)}>
      {children}
    </SectionCard>
  );
}
