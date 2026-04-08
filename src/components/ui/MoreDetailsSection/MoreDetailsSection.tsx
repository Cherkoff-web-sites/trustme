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
        className="h-auto min-h-0 justify-start gap-2 p-0 text-[16px] font-normal leading-normal text-[#FDFEFF] hover:text-[#FDFEFF] lg:text-[20px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {buttonText}
        <img
          src={chevronSvg}
          alt=""
          className={`h-[10px] w-[17px] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </Button>

      {open ? (
        <div className="mt-[15px] flex flex-col gap-[15px] text-[16px] font-normal leading-normal text-[#FDFEFF] lg:text-[20px]">
          {children}
        </div>
      ) : null}
    </div>
  );
}

