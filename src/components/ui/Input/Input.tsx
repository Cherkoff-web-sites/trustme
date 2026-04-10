import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import eyeSvg from '../../../assets/icons/eye.svg';
import eyeOpenSvg from '../../../assets/icons/eye_open.svg';
import { cn } from '../../../lib/cn';
import { designTokens } from '../design-tokens';
import { inputStyles } from './Input.styles';

const inputErrorMessageClassName =
  'absolute left-0 right-0 top-full z-[1] mt-[5px] text-left text-[12px] leading-[18px]';

/** Максимальная длина значения `type="date"` в формате yyyy-mm-dd. */
const DATE_INPUT_VALUE_MAX_LEN = 10;

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const r of refs) {
      if (typeof r === 'function') {
        r(node);
      } else if (r && typeof r === 'object' && 'current' in r) {
        (r as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

/** Отступ слева для текста при `startAdornment` (иконка 20px + зазор от `left-[20px]`). */
const INPUT_START_ADORNMENT_PL = 'pl-[52px]';
const INPUT_START_ADORNMENT_LEFT = 'left-[20px]';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'>,
    VariantProps<typeof inputStyles> {
  /** Текст ошибки: красная рамка + строка под полем (`absolute`, не влияет на сетку). */
  error?: string;
  /** Иконка слева внутри поля (например поиск). `pointer-events: none`, клики проходят в input. */
  startAdornment?: React.ReactNode;
  /** Слой поверх области ввода (автодополнение); не перехватывает события. */
  inputOverlay?: React.ReactNode;
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
      startAdornment,
      inputOverlay,
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
      maxLength,
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

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const filled = isControlled
      ? String(value ?? '').length > 0
      : uncontrolledFilled;

    const hasError = Boolean(error?.trim());
    const reactId = React.useId();
    const errorMessageId = id ? `${id}-error` : `${reactId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const el = e.target;
      let next = el.value;
      if (type === 'date' && next.length > DATE_INPUT_VALUE_MAX_LEN) {
        next = next.slice(0, DATE_INPUT_VALUE_MAX_LEN);
        Object.assign(el, { value: next });
      }
      if (!isControlled) {
        setUncontrolledFilled(next.length > 0);
      }
      onChange?.(e);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const el = e.currentTarget;
      if (type === 'date' && el.value.length > DATE_INPUT_VALUE_MAX_LEN) {
        const next = el.value.slice(0, DATE_INPUT_VALUE_MAX_LEN);
        Object.assign(el, { value: next });
      }
      if (!isControlled) {
        setUncontrolledFilled(el.value.length > 0);
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

    const isDatePickerAdornment =
      resolvedType === 'date' && Boolean(endAdornment) && !passwordToggle;

    const openDatePicker = () => {
      const el = inputRef.current;
      if (!el || type !== 'date') return;
      try {
        el.showPicker?.();
      } catch {
        /* небезопасный контекст или браузер без showPicker */
      }
    };

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

    const datePickerAdornmentTrigger = isDatePickerAdornment ? (
      <button
        type="button"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#FDFEFF] hover:opacity-90"
        onMouseDown={(ev) => {
          ev.preventDefault();
        }}
        onClick={(ev) => {
          ev.preventDefault();
          openDatePicker();
        }}
        aria-label="Открыть календарь"
        tabIndex={-1}
      >
        {endAdornment}
      </button>
    ) : null;

    const resolvedAdornment = passwordToggle
      ? passwordToggleNode
      : datePickerAdornmentTrigger ?? endAdornment;
    const hasRightSlot = Boolean(resolvedAdornment);
    const hasLeftSlot = Boolean(startAdornment);

    const adornmentRightClass = passwordToggle ? 'right-[21px]' : isDatePickerAdornment ? 'right-[10px]' : 'right-[21px]';

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
      hasLeftSlot && INPUT_START_ADORNMENT_PL,
      hasLeftSlot && !hasRightSlot && 'pr-[18px]',
      hasRightSlot && !isDatePickerAdornment && 'pr-[45px]',
      className,
    );

    const resolvedMaxLength = type === 'date' ? DATE_INPUT_VALUE_MAX_LEN : maxLength;

    const inputEl = (
      <input
        ref={mergeRefs(ref, inputRef)}
        id={id}
        type={resolvedType}
        className={inputClassName}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorMessageId : undefined}
        maxLength={resolvedMaxLength}
        {...props}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const overlayRightClass =
      hasRightSlot && !isDatePickerAdornment ? 'right-[45px]' : 'right-[18px]';

    return (
      <div className="relative w-full">
        {hasLeftSlot ? (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 z-[1] -translate-y-1/2',
              INPUT_START_ADORNMENT_LEFT,
            )}
          >
            <span className="flex h-5 w-5 items-center justify-center">{startAdornment}</span>
          </span>
        ) : null}
        {inputEl}
        {inputOverlay ? (
          <div
            className={cn(
              'pointer-events-none absolute top-1/2 z-[2] flex min-h-0 min-w-0 -translate-y-1/2 items-center overflow-hidden text-left',
              hasLeftSlot ? cn('left-[52px]', overlayRightClass) : cn('left-[18px]', overlayRightClass),
            )}
            aria-hidden
          >
            {inputOverlay}
          </div>
        ) : null}
        {hasRightSlot ? (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 z-[3] -translate-y-1/2',
              adornmentRightClass,
            )}
          >
            <span className="pointer-events-auto flex items-center justify-center">{resolvedAdornment}</span>
          </span>
        ) : null}
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
