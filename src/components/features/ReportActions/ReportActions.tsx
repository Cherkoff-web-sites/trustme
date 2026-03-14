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
}

export function ReportActions({
  onOpen,
  onDownload,
  onDelete,
  showDelete = false,
  openLabel = 'Открыть отчёт',
  downloadLabel = 'Скачать отчёт',
}: ReportActionsProps) {
  return (
    <div className={reportActionsWrapStyles}>
      <div className={reportActionsPrimaryStyles}>
        <Button className="min-w-[196px]" onClick={onOpen}>
          {openLabel}
        </Button>
        <Button className="min-w-[196px]" onClick={onDownload}>
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
