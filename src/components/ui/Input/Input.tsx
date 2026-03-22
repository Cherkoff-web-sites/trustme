import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import eyeSvg from '../../../assets/icons/eye.svg';
import eyeOpenSvg from '../../../assets/icons/eye_open.svg';
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
      value,
      defaultValue,
      onChange,
      onInput,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    /** `lg:hover` в Tailwind v4 нельзя надёжно склеить с `:not(:focus)` в одном классе — отключаем hover-стили по фокусу через состояние. */
    const [focused, setFocused] = React.useState(false);
    const isControlled = value !== undefined;
    const [uncontrolledFilled, setUncontrolledFilled] = React.useState(
      () => defaultValue != null && String(defaultValue).length > 0,
    );

    const filled = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledFilled;

    const hasError = Boolean(error?.trim());
    const reactId = React.useId();
    const errorMessageId = id ? `${id}-error` : `${reactId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledFilled(e.target.value.length > 0);
      }
      onChange?.(e);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledFilled(e.currentTarget.value.length > 0);
      }
      /** React 19 типизирует `onInput` как `InputEvent`; `FormEvent` совместим по рантайму. */
      onInput?.(e as unknown as Parameters<NonNullable<typeof onInput>>[0]);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const resolvedType =
      passwordToggle && type === 'password'
        ? passwordVisible
          ? 'text'
          : 'password'
        : type;

    /** Иконка глаза: правый край 24×24 на отступе 21px от правого края поля; поле `pr-[45px]` = 21 + 24. */
    const passwordToggleNode = passwordToggle ? (
      <button
        type="button"
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center leading-none text-[#FDFEFF] hover:opacity-90"
        onClick={() => setPasswordVisible((v) => !v)}
        aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
      >
        <img
          src={passwordVisible ? eyeOpenSvg : eyeSvg}
          alt=""
          width={24}
          height={24}
          className="block h-6 w-6 shrink-0"
        />
      </button>
    ) : null;

    const resolvedAdornment = passwordToggle ? passwordToggleNode : endAdornment;
    const hasRightSlot = Boolean(resolvedAdornment);

    const inputClassName = cn(
      inputStyles({ variant }),
      !disabled &&
        !hasError &&
        cn(
          /** Акцент 2 (#0EB8D2) — как `designTokens.colors.accent.secondaryBorder` */
          'focus:border-[#0EB8D2] focus-visible:border-[#0EB8D2]',
          !focused &&
            (filled
              ? 'lg:hover:border-[#0EB8D2]'
              : 'lg:hover:bg-[#393939] lg:hover:border-[#FDFEFF]/50'),
        ),
      !disabled &&
        hasError &&
        cn(
          designTokens.colors.border.inputError,
          'focus:border-[#EB4335] focus-visible:border-[#EB4335]',
          !focused && 'lg:hover:border-[#EB4335]',
        ),
      hasRightSlot && 'pr-[45px]',
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
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    return (
      <div className="relative w-full">
        {hasRightSlot ? (
          <>
            {inputEl}
            <span className="pointer-events-none absolute top-1/2 right-[21px] -translate-y-1/2">
              <span className="pointer-events-auto flex items-center justify-center">{resolvedAdornment}</span>
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
