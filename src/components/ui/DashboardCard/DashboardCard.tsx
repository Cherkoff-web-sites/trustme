import * as React from 'react';
import { SectionCard } from '../SectionCard';

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
    <SectionCard title={title} aside={aside} className={className}>
      {children}
    </SectionCard>
  );
}
