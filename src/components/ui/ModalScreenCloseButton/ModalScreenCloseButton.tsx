import * as React from 'react';
import { cn } from '../../../lib/cn';
import { modalScreenCloseButtonStyles } from './ModalScreenCloseButton.styles';

export interface ModalScreenCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Алиас для onClick (удобно передавать onClose из модалки) */
  onClose?: () => void;
}

export function ModalScreenCloseButton({
  className,
  onClick,
  onClose,
  type = 'button',
  ...props
}: ModalScreenCloseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.();
    onClick?.(e);
  };

  return (
    <button
      type={type}
      aria-label="Закрыть"
      className={cn(modalScreenCloseButtonStyles, className)}
      onClick={handleClick}
      {...props}
    >
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" rx="25" fill="#057889"/>
        <path d="M26.4284 24.9991L32.8048 18.6328C32.9954 18.4422 33.1025 18.1837 33.1025 17.9142C33.1025 17.6447 32.9954 17.3862 32.8048 17.1956C32.6142 17.005 32.3557 16.8979 32.0862 16.8979C31.8167 16.8979 31.5582 17.005 31.3676 17.1956L25.0013 23.572L18.635 17.1956C18.4445 17.005 18.186 16.8979 17.9164 16.8979C17.6469 16.8979 17.3884 17.005 17.1978 17.1956C17.0072 17.3862 16.9002 17.6447 16.9002 17.9142C16.9002 18.1837 17.0072 18.4422 17.1978 18.6328L23.5742 24.9991L17.1978 31.3654C17.103 31.4595 17.0277 31.5714 16.9763 31.6947C16.9249 31.8181 16.8984 31.9504 16.8984 32.084C16.8984 32.2176 16.9249 32.3499 16.9763 32.4732C17.0277 32.5966 17.103 32.7085 17.1978 32.8026C17.2919 32.8974 17.4039 32.9727 17.5272 33.0241C17.6505 33.0755 17.7828 33.102 17.9164 33.102C18.05 33.102 18.1823 33.0755 18.3057 33.0241C18.429 32.9727 18.541 32.8974 18.635 32.8026L25.0013 26.4262L31.3676 32.8026C31.4617 32.8974 31.5736 32.9727 31.6969 33.0241C31.8203 33.0755 31.9526 33.102 32.0862 33.102C32.2198 33.102 32.3521 33.0755 32.4754 33.0241C32.5988 32.9727 32.7107 32.8974 32.8048 32.8026C32.8997 32.7085 32.975 32.5966 33.0263 32.4732C33.0777 32.3499 33.1042 32.2176 33.1042 32.084C33.1042 31.9504 33.0777 31.8181 33.0263 31.6947C32.975 31.5714 32.8997 31.4595 32.8048 31.3654L26.4284 24.9991Z" fill="#FDFEFF"/>
      </svg>
    </button>
  );
}
