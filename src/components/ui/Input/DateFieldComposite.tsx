import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { isoDateToDdMmYyyy, parseDdMmYyyyToIso } from '../../../lib/dateDisplayFormat';
import { designTokens } from '../design-tokens';
import { inputStyles } from './Input.styles';

const inputErrorMessageClassName =
  'absolute left-0 right-0 top-full z-[1] mt-[5px] text-left text-[12px] leading-[18px]';

const DATE_TEXT_PLACEHOLDER = 'ДД/ММ/ГГГГ';

const dateFieldTextClass =
  'min-w-0 flex-1 border-0 bg-transparent py-0 text-[14px] leading-normal text-[#FDFEFF]/50 outline-none placeholder:text-[#FDFEFF]/50 lg:text-[14px]';

function DateInputCalendarGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 17"
      width="20"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.4987 2.83398H13.457C13.8466 2.83398 14.1654 3.15273 14.1654 3.54232V13.459C14.1654 13.8486 13.8466 14.1673 13.457 14.1673H3.54036C3.15078 14.1673 2.83203 13.8486 2.83203 13.459V3.54232C2.83203 3.15273 3.15078 2.83398 3.54036 2.83398H8.4987Z"
        stroke="currentColor"
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.54297 3.54102H13.4596V5.66602H3.54297V3.54102Z" fill="currentColor" />
      <path
        d="M4.95703 2.83268V1.41602M12.0404 2.83268V1.41602"
        stroke="currentColor"
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.95703 7.79102H12.0404"
        stroke="currentColor"
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.95703 10.625H9.91536"
        stroke="currentColor"
        strokeWidth="1.41667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export interface DateFieldCompositeProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'type' | 'size' | 'defaultValue' | 'value' | 'children'
    >,
    VariantProps<typeof inputStyles> {
  error?: string;
  value?: string;
  defaultValue?: string;
}

export const DateFieldComposite = React.forwardRef<HTMLInputElement, DateFieldCompositeProps>(
  (
    {
      className,
      variant,
      error,
      disabled,
      id,
      value: valueProp,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      name,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalIso, setInternalIso] = React.useState(() =>
      defaultValue != null ? String(defaultValue) : '',
    );

    const iso = isControlled ? String(valueProp ?? '') : internalIso;
    const filled = Boolean(iso.trim());

    const [textFocused, setTextFocused] = React.useState(false);
    const [textDraft, setTextDraft] = React.useState('');

    const hiddenPickerRef = React.useRef<HTMLInputElement>(null);
    const textRef = React.useRef<HTMLInputElement>(null);

    const [focused, setFocused] = React.useState(false);
    const hasError = Boolean(error?.trim());
    const reactId = React.useId();
    const errorMessageId = id ? `${id}-error` : `${reactId}-error`;

    React.useEffect(() => {
      if (!textFocused) {
        setTextDraft(iso.trim() ? isoDateToDdMmYyyy(iso) : '');
      }
    }, [iso, textFocused]);

    const emitIso = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setInternalIso(next);
        }
        if (!onChange) return;
        const synthetic = {
          target: { value: next, name: name ?? '' } as HTMLInputElement,
          currentTarget: { value: next, name: name ?? '' } as HTMLInputElement,
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(synthetic);
      },
      [isControlled, onChange, name],
    );

    const commitDraft = React.useCallback(() => {
      const raw = textDraft.trim();
      if (!raw) {
        emitIso('');
        return;
      }
      const parsed = parseDdMmYyyyToIso(raw);
      if (parsed) {
        emitIso(parsed);
      } else {
        setTextDraft(iso.trim() ? isoDateToDdMmYyyy(iso) : '');
      }
    }, [textDraft, emitIso, iso]);

    const openPicker = () => {
      const el = hiddenPickerRef.current;
      if (!el || disabled) return;
      try {
        el.showPicker?.();
      } catch {
        /* cross-origin / unsupported */
      }
    };

    const displayValue = textFocused ? textDraft : iso.trim() ? isoDateToDdMmYyyy(iso) : '';

    /** Без горизонтального `padding` на оболочке: текст с `pr-0`, календарь в flex‑хвосте с `pr-2`. */
    const wrapperClass = cn(
      'flex w-full min-w-0 items-center gap-2 rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] pr-2 font-normal transition-[border-color,background-color] duration-150',
      !disabled &&
        !hasError &&
        cn(
          'focus-within:border-[#0EB8D2]',
          !focused &&
            (filled
              ? 'lg:hover:border-[#0EB8D2]'
              : 'lg:hover:bg-[#393939] lg:hover:border-[#FDFEFF]/50'),
        ),
      !disabled &&
        hasError &&
        cn(
          designTokens.colors.border.inputError,
          'focus-within:border-[#EB4335]',
          !focused && 'lg:hover:border-[#EB4335]',
        ),
      className,
    );

    return (
      <div className="relative w-full">
        <div className={wrapperClass}>
          <input
            {...rest}
            ref={mergeRefs(ref, textRef)}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            disabled={disabled}
            placeholder={DATE_TEXT_PLACEHOLDER}
            maxLength={10}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorMessageId : undefined}
            value={displayValue}
            name={undefined}
            className={cn(dateFieldTextClass, 'pl-[15px] pr-0')}
            onChange={(e) => {
              setTextDraft(e.target.value);
            }}
            onFocus={(e) => {
              setTextFocused(true);
              setTextDraft(iso.trim() ? isoDateToDdMmYyyy(iso) : '');
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setTextFocused(false);
              setFocused(false);
              commitDraft();
              onBlur?.(e);
            }}
          />
          <input
            ref={hiddenPickerRef}
            type="date"
            tabIndex={-1}
            className="sr-only"
            value={iso || ''}
            disabled={disabled}
            name={name}
            onChange={(e) => {
              emitIso(e.target.value);
              setTextDraft(e.target.value ? isoDateToDdMmYyyy(e.target.value) : '');
            }}
          />
          <button
            type="button"
            className={cn(
              'inline-flex h-5 w-5 shrink-0 items-center justify-center transition-[color,opacity] duration-150 hover:opacity-90',
              filled ? 'text-[#0EB8D2]' : 'text-[#FDFEFF]/50',
            )}
            disabled={disabled}
            onMouseDown={(ev) => {
              ev.preventDefault();
            }}
            onClick={(ev) => {
              ev.preventDefault();
              openPicker();
            }}
            aria-label="Открыть календарь"
            tabIndex={-1}
          >
            <DateInputCalendarGlyph className="h-5 w-5" />
          </button>
        </div>
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

DateFieldComposite.displayName = 'DateFieldComposite';
