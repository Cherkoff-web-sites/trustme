import { cn } from '../../../lib/cn';
import { toggleSwitchStyles, toggleSwitchThumbStyles } from './ToggleSwitch.styles';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  className,
}: ToggleSwitchProps) {
  return (
    <button
      aria-pressed={checked}
      className={cn(toggleSwitchStyles({ checked }), className)}
      onClick={onChange}
      type="button"
      disabled={disabled}
    >
      <span className={toggleSwitchThumbStyles({ checked })} />
    </button>
  );
}
