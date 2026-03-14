import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { inputStyles } from './Input.styles';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return <input ref={ref} className={cn(inputStyles({ variant }), className)} {...props} />;
  },
);

Input.displayName = 'Input';
