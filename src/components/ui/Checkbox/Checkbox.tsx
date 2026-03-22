import * as React from 'react';
import selectedSvg from '../../../assets/icons/selected.svg';
import { cn } from '../../../lib/cn';
import {
  checkboxCheckmarkClassName,
  checkboxErrorBoxClassName,
  checkboxLabelHoverClassName,
  checkboxVisualBoxClassName,
} from './Checkbox.styles';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Рамка ошибки (например «Обязательное поле»), пока чекбокс не отмечен */
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, 'aria-invalid': ariaInvalid, ...props }, ref) => (
    <div
      className={cn(
        'relative inline-flex h-[19px] w-[19px] shrink-0 self-start',
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        aria-invalid={error ? true : ariaInvalid}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden
        className={cn(
          checkboxVisualBoxClassName,
          !error && checkboxLabelHoverClassName,
          error && checkboxErrorBoxClassName,
        )}
      >
        <img src={selectedSvg} alt="" className={checkboxCheckmarkClassName} />
      </span>
    </div>
  ),
);

Checkbox.displayName = 'Checkbox';
