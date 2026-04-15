import { Button } from '../../ui';
import { cn } from '../../../lib/cn';
import {
  reportActionsDeleteStyles,
  reportActionsPrimaryStyles,
  reportActionsWrapBaseStyles,
} from './ReportActions.styles';

export interface ReportActionsProps {
  onOpen?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
  openLabel?: string;
  downloadLabel?: string;
  fullWidthMobile?: boolean;
  /** С `lg`: две кнопки делят ряд поровну (`flex-1`), без фиксированного `min-w`. */
  equalSplitLg?: boolean;
  /** Принудительно оставляет кнопки столбцом (и на `sm+`). */
  stacked?: boolean;
}

export function ReportActions({
  onOpen,
  onDownload,
  onDelete,
  showDelete = false,
  openLabel = 'Открыть отчёт',
  downloadLabel = 'Скачать отчёт',
  fullWidthMobile = false,
  equalSplitLg = false,
  stacked = false,
}: ReportActionsProps) {
  const buttonClassName = cn(
    fullWidthMobile && 'w-full min-w-0',
    equalSplitLg && 'lg:flex-1 lg:min-w-0',
    'lg:px-[60px]',
  );

  const wrapClass = cn(
    reportActionsWrapBaseStyles,
    stacked && 'sm:flex-col',
    showDelete ? 'sm:justify-between' : 'sm:justify-center',
  );

  return (
    <div className={wrapClass}>
      <div
        className={cn(
          reportActionsPrimaryStyles,
          stacked && 'sm:flex-col sm:gap-[20px]',
          equalSplitLg && 'w-full lg:max-w-full',
        )}
      >
        <Button className={buttonClassName} onClick={onOpen}>
          {openLabel}
        </Button>
        <Button className={buttonClassName} onClick={onDownload}>
          {downloadLabel}
        </Button>
      </div>

      {showDelete ? (
        <button className={reportActionsDeleteStyles} type="button" onClick={onDelete}>
          Удалить
        </button>
      ) : null}
    </div>
  );
}
