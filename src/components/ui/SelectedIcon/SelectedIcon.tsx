import { cn } from '../../../lib/cn';

export interface SelectedIconProps {
  className?: string;
}

/** Checkmark icon from selected.svg; use text-* or text-[#hex] to set color (currentColor). */
export function SelectedIcon({ className }: SelectedIconProps) {
  return (
    <svg
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path
        d="M4.22286 7.00688L10.9902 0.239552C11.1499 0.0798507 11.3362 0 11.5492 0C11.7621 0 11.9484 0.0798507 12.1081 0.239552C12.2678 0.399253 12.3477 0.589031 12.3477 0.808886C12.3477 1.02874 12.2678 1.21825 12.1081 1.37742L4.78182 8.72367C4.62212 8.88337 4.4358 8.96322 4.22286 8.96322C4.00993 8.96322 3.82361 8.88337 3.66391 8.72367L0.230338 5.2901C0.0706371 5.1304 -0.0060195 4.94088 0.000368541 4.72156C0.00675658 4.50224 0.0900671 4.31246 0.2503 4.15223C0.410534 3.99199 0.600312 3.91214 0.819635 3.91268C1.03896 3.91321 1.22847 3.99306 1.38817 4.15223L4.22286 7.00688Z"
        fill="currentColor"
      />
    </svg>
  );
}
