import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import eyeSvg from '../../../assets/icons/eye.svg';
import { cn } from '../../../lib/cn';
import { designTokens } from '../design-tokens';
import { inputStyles } from './Input.styles';

const inputErrorMessageClassName =
  'absolute left-0 right-0 top-full z-[1] mt-[5px] text-left text-[12px] leading-[18px]';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'>,
    VariantProps<typeof inputStyles> {
  /** Текст ошибки: красная рамка + строка под полем (`absolute`, не влияет на сетку). */
  error?: string;
  /** Элемент справа внутри поля (например кастомная иконка). Несовместимо с `passwordToggle`. */
  endAdornment?: React.ReactNode;
  /**
   * Кнопка с иконкой глаза для полей пароля; видимость пароля хранится внутри инстанса `Input`.
   * Задаётся вместе с `type="password"`.
   */
  passwordToggle?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      error,
      endAdornment,
      passwordToggle,
      disabled,
      id,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const hasError = Boolean(error?.trim());
    const reactId = React.useId();
    const errorMessageId = id ? `${id}-error` : `${reactId}-error`;

    const resolvedType =
      passwordToggle && type === 'password'
        ? passwordVisible
          ? 'text'
          : 'password'
        : type;

    const passwordToggleNode = passwordToggle ? (
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center text-[#FDFEFF] hover:opacity-90"
        onClick={() => setPasswordVisible((v) => !v)}
        aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
      >
        <img src={eyeSvg} alt="" width={24} height={24} className="h-6 w-6" />
      </button>
    ) : null;

    const resolvedAdornment = passwordToggle ? passwordToggleNode : endAdornment;
    const hasRightSlot = Boolean(resolvedAdornment);

    const inputClassName = cn(
      inputStyles({ variant }),
      hasError &&
        cn(
          designTokens.colors.border.inputError,
          'focus:border-[#EB4335]',
        ),
      hasRightSlot && 'pr-12',
      className,
    );

    const inputEl = (
      <input
        ref={ref}
        id={id}
        type={resolvedType}
        className={inputClassName}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorMessageId : undefined}
        {...props}
      />
    );

    return (
      <div className="relative w-full">
        {hasRightSlot ? (
          <>
            {inputEl}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center justify-center">
              <span className="pointer-events-auto">{resolvedAdornment}</span>
            </span>
          </>
        ) : (
          inputEl
        )}
        {hasError ? (
          <p
            id={errorMessageId}
            role="alert"
            aria-live="polite"
            className={cn(inputErrorMessageClassName, designTokens.colors.text.statusError)}
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
