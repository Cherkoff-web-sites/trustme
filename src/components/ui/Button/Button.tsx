import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import { buttonStyles } from './Button.styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

export function Button({
  asChild = false,
  className,
  variant,
  size,
  fullWidth,
  selected,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonStyles({ variant, size, fullWidth, selected }), className)}
      type={asChild ? undefined : type}
      {...props}
    />
  );
}
