import { ModalShell } from '../../ui';
import { ReportContent, type HistoryItem } from '../../../shared/ReportContent';
import {
  historyReportModalCloseButtonStyles,
  historyReportModalPanelStyles,
} from './HistoryReportModal.styles';

export interface HistoryReportModalProps {
  item: HistoryItem | null;
  onClose: () => void;
}

export function HistoryReportModal({
  item,
  onClose,
}: HistoryReportModalProps) {
  return (
    <ModalShell
      open={!!item}
      onClose={onClose}
      size="xl"
      panelClassName={historyReportModalPanelStyles}
    >
      <button
        type="button"
        aria-label="Закрыть"
        className={historyReportModalCloseButtonStyles}
        onClick={onClose}
      >
        ×
      </button>
      {item ? (
        <div className="flex-1 overflow-y-auto">
          <ReportContent item={item} />
        </div>
      ) : null}
    </ModalShell>
  );
}
