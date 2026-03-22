import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { labelStyles } from './Label.styles';

/** Классы текста подписи к полю (16px) — для использования внутри `variant="stack"` и др. */
export const labelFieldTextClass = 'text-[16px] text-[#FDFEFF]';

export interface LabelProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof labelStyles> {
  /** Только для `variant="inline"` и `inlineStart"` (чекбоксы). */
  htmlFor?: string;
}

function useNativeLabelElement(
  variant: LabelProps['variant'],
): variant is 'inline' | 'inlineStart' {
  return variant === 'inline' || variant === 'inlineStart';
}

export const Label = React.forwardRef<HTMLLabelElement | HTMLDivElement, LabelProps>(
  ({ className, variant, htmlFor, ...props }, ref) => {
    const classes = cn(labelStyles({ variant }), className);

    if (useNativeLabelElement(variant)) {
      return (
        <label
          ref={ref as React.Ref<HTMLLabelElement>}
          className={classes}
          htmlFor={htmlFor}
          {...(props as React.LabelHTMLAttributes<HTMLLabelElement>)}
        />
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  },
);
Label.displayName = 'Label';

/** Текст подписи внутри `Label variant="stack"` или кастомных групп полей */
export function LabelCaption({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span className={cn(labelFieldTextClass, className)} {...props} />;
}
