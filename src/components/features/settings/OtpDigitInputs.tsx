import { useCallback, useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '../../../lib/cn';

const otpInputClassName = cn(
  'h-[53px] w-[53px] shrink-0 rounded-[10px] border border-[#FDFEFF]/30 bg-[#2A2A2A] text-center text-[22px] font-normal tabular-nums text-[#FDFEFF]',
  'outline-none transition-[border-color,background-color] duration-150',
  'focus:border-[#0EB8D2] focus-visible:border-[#0EB8D2]',
  'lg:hover:border-[#FDFEFF]/50',
);

const otpInputCompactClassName = cn(
  'h-[48px] w-[48px] shrink-0 rounded-[10px] border border-[#FDFEFF]/30 bg-[#2A2A2A] text-center text-[18px] font-normal tabular-nums text-[#FDFEFF] sm:h-[50px] sm:w-[50px] sm:text-[20px]',
  'outline-none transition-[border-color,background-color] duration-150',
  'focus:border-[#0EB8D2] focus-visible:border-[#0EB8D2]',
  'lg:hover:border-[#FDFEFF]/50',
);

/** Ячейки без заливки — только рамка на фоне карточки. */
const otpInputCompactTransparentClassName = cn(
  'h-[48px] w-[48px] shrink-0 rounded-[10px] border border-[#FDFEFF]/30 bg-transparent text-center text-[18px] font-normal tabular-nums text-[#FDFEFF] sm:h-[50px] sm:w-[50px] sm:text-[20px]',
  'outline-none transition-[border-color] duration-150',
  'focus:border-[#0EB8D2] focus-visible:border-[#0EB8D2]',
  'lg:hover:border-[#FDFEFF]/50',
);

export interface OtpDigitInputsProps {
  length: number;
  value: string;
  onChange: (next: string) => void;
  idPrefix: string;
  /** id элемента `Label` для группы (каждое поле получит aria-labelledby на него). */
  ariaLabelledBy?: string;
  /** Компактные ячейки (для длинных кодов, например 8 цифр). */
  compact?: boolean;
  /** Без фоновой заливки у ячеек (только обводка). */
  transparentCells?: boolean;
  className?: string;
}

export function OtpDigitInputs({
  length,
  value,
  onChange,
  idPrefix,
  ariaLabelledBy,
  compact = false,
  transparentCells = false,
  className,
}: OtpDigitInputsProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setRefs = useCallback((el: HTMLInputElement | null, index: number) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      refs.current[0]?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const digitsOnly = value.replace(/\D/g, '').slice(0, length);

  const focusAt = (index: number) => {
    const i = Math.max(0, Math.min(index, length - 1));
    refs.current[i]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned === '') {
      const next = digitsOnly.slice(0, index) + digitsOnly.slice(index + 1);
      onChange(next);
      return;
    }

    const char = cleaned.slice(-1);
    const next = (digitsOnly.slice(0, index) + char + digitsOnly.slice(index + 1)).slice(0, length);
    onChange(next);
    if (index < length - 1) {
      focusAt(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digitsOnly[index]) {
        return;
      }
      e.preventDefault();
      if (index > 0) {
        const next = digitsOnly.slice(0, index - 1) + digitsOnly.slice(index);
        onChange(next);
        focusAt(index - 1);
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusAt(index - 1);
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    const nextFocus = Math.min(pasted.length, length - 1);
    window.requestAnimationFrame(() => focusAt(nextFocus));
  };

  const boxClass = compact
    ? transparentCells
      ? otpInputCompactTransparentClassName
      : otpInputCompactClassName
    : otpInputClassName;

  return (
    <div className={cn('flex flex-wrap items-center gap-[10px] sm:gap-3', className)} role="group" aria-labelledby={ariaLabelledBy}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={`${idPrefix}-${index}`}
          ref={(el) => setRefs(el, index)}
          id={`${idPrefix}-${index}`}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          pattern="[0-9]*"
          aria-label={`Цифра ${index + 1} из ${length}`}
          className={boxClass}
          value={digitsOnly[index] ?? ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
