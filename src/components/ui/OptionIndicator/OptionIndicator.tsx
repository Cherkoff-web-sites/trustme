import type { VariantProps } from 'class-variance-authority';
import { optionIndicatorDotStyles, optionIndicatorStyles } from './OptionIndicator.styles';
import { cn } from '../../../lib/cn';
import selectedSvg from '../../../assets/icons/selected.svg';

export interface OptionIndicatorProps extends VariantProps<typeof optionIndicatorStyles> {
  className?: string;
  mode?: 'default' | 'settings';
}

export function OptionIndicator({
  type,
  checked,
  className,
  mode = 'default',
}: OptionIndicatorProps) {
  const isChecked = !!checked;

  return (
    <span className={cn(optionIndicatorStyles({ type, checked: isChecked, mode }), className)}>
      {type === 'radio' && mode === 'default' && isChecked ? (
        <img src={selectedSvg} alt="" className="h-[9px] w-[13px]" aria-hidden />
      ) : null}
      {type === 'radio' && mode === 'settings' ? (
        <span className={optionIndicatorDotStyles({ visible: isChecked })} />
      ) : null}
      {type === 'toggleMarker' ? <span className={optionIndicatorDotStyles({ visible: isChecked })} /> : null}
    </span>
  );
}
