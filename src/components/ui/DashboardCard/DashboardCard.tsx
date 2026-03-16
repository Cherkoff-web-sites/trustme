import { Card, type CardProps } from '../Card/Card';

export type DashboardCardProps = Omit<CardProps, 'variant'>;

export function DashboardCard(props: DashboardCardProps) {
  return <Card variant="dashboard" {...props} />;
}
