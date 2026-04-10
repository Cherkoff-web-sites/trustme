import * as React from 'react';
import { cn } from '../../../lib/cn';

export interface CardHeaderDecorDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Декор под заголовком карточки: фиксированный круг 5×5 и горизонтальная линия с градиентом
 * (#FFF → #1A1A1A), растягивается только линия.
 */
export function CardHeaderDecorDivider({ className, ...props }: CardHeaderDecorDividerProps) {
  return (
    <div
      className={cn('relative h-[5px] w-full', className)}
      aria-hidden
      {...props}
    >
      <span className="pointer-events-none absolute left-0 top-1/2 z-[1] block h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#FFF]" />
      <span className="pointer-events-none absolute top-1/2 right-0 left-[2.5px] h-px -translate-y-1/2 bg-[linear-gradient(90deg,#FFF_0%,#1A1A1A_100%)]" />
    </div>
  );
}
