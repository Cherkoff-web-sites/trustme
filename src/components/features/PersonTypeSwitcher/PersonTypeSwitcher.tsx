import { OptionIndicator } from '../../ui';
import {
  personTypeSwitcherOptionStyles,
  personTypeSwitcherWrapStyles,
} from './PersonTypeSwitcher.styles';

export interface PersonTypeOption<T extends string> {
  value: T;
  label: string;
}

export interface PersonTypeSwitcherProps<T extends string> {
  value: T;
  options: Array<PersonTypeOption<T>>;
  onChange: (value: T) => void;
  className?: string;
  indicatorMode?: 'default' | 'settings';
}

export function PersonTypeSwitcher<T extends string>({
  value,
  options,
  onChange,
  className,
  indicatorMode = 'default',
}: PersonTypeSwitcherProps<T>) {
  return (
    <div className={`${personTypeSwitcherWrapStyles} ${className ?? ''}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={personTypeSwitcherOptionStyles}
          onClick={() => onChange(option.value)}
        >
          <OptionIndicator type="radio" checked={value === option.value} mode={indicatorMode} />
          {option.label}
        </button>
      ))}
    </div>
  );
}
