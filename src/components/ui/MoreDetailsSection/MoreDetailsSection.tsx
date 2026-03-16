import { useState, type ReactNode } from 'react';
import { Button } from '..';
import chevronSvg from '../../../assets/icons/chevron.svg';

export interface MoreDetailsSectionProps {
  buttonText?: string;
  className?: string;
  children: ReactNode;
}

export function MoreDetailsSection({ buttonText = 'Подробнее', className, children }: MoreDetailsSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="gap-2 text-base text-white/85"
        onClick={() => setOpen((prev) => !prev)}
      >
        {buttonText}
        <img
          src={chevronSvg}
          alt=""
          className={`h-[10px] w-[17px] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </Button>

      {open ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

