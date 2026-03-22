import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/cn';
import {
  modalCloseButtonStyles,
  modalOverlayInnerStyles,
  modalOverlayOuterStyles,
  modalPanelStyles,
} from './ModalShell.styles';

export interface ModalShellProps extends VariantProps<typeof modalPanelStyles> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeButton?: boolean;
  panelClassName?: string;
}

export function ModalShell({
  open,
  onClose,
  children,
  size,
  className,
  panelClassName,
  closeButton = true,
}: ModalShellProps) {
  if (!open) return null;

  return (
    <div className={cn(modalOverlayOuterStyles, className)} onClick={onClose}>
      <div className={modalOverlayInnerStyles}>
        <div className={cn(modalPanelStyles({ size }), panelClassName)} onClick={(event) => event.stopPropagation()}>
          {closeButton ? (
            <button type="button" aria-label="Закрыть" className={modalCloseButtonStyles} onClick={onClose}>
              ×
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
