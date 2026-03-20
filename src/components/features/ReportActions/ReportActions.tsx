import { Button } from '../../ui';
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
}

export function ReportActions({
  onOpen,
  onDownload,
  onDelete,
  showDelete = false,
  openLabel = 'Открыть отчёт',
  downloadLabel = 'Скачать отчёт',
  fullWidthMobile = false,
}: ReportActionsProps) {
  const buttonClassName = fullWidthMobile ? 'w-full min-w-0 sm:min-w-[196px]' : 'min-w-[196px]';

  return (
    <div className={reportActionsWrapStyles}>
      <div className={reportActionsPrimaryStyles}>
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
