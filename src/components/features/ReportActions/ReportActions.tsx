import { Button } from '../../ui';
import { cn } from '../../../lib/cn';
import {
  reportActionsDeleteStyles,
  reportActionsPrimaryStyles,
  reportActionsWrapStyles,
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
}: ReportActionsProps) {
  const buttonClassName = cn(
    fullWidthMobile && 'w-full min-w-0',
    !fullWidthMobile && !equalSplitLg && 'min-w-[196px]',
    equalSplitLg && 'lg:flex-1 lg:min-w-0',
  );

  return (
    <div className={reportActionsWrapStyles}>
      <div className={cn(reportActionsPrimaryStyles, equalSplitLg && 'w-full lg:max-w-full')}>
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
