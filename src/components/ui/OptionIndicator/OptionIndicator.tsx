import type { VariantProps } from 'class-variance-authority';
import { optionIndicatorDotStyles, optionIndicatorStyles } from './OptionIndicator.styles';
import { cn } from '../../../lib/cn';

export interface OptionIndicatorProps extends VariantProps<typeof optionIndicatorStyles> {
  className?: string;
}

export function OptionIndicator({
  type,
  checked,
  className,
}: OptionIndicatorProps) {
  return (
    <span className={cn(optionIndicatorStyles({ type, checked }), className)}>
      {type === 'toggleMarker' ? <span className={optionIndicatorDotStyles({ visible: !!checked })} /> : null}
    </span>
  );
}
