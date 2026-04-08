import { uiFlags } from '../../../config/uiFlags';
import { ModalScreenCloseButton, ModalShell } from '../../ui';
import { ReportContent, type HistoryItem } from '../../../shared/ReportContent';
import { historyReportModalPanelStyles } from './HistoryReportModal.styles';

export interface HistoryReportModalProps {
  item: HistoryItem | null;
  onClose: () => void;
}

export function HistoryReportModal({
  item,
  onClose,
}: HistoryReportModalProps) {
  if (!uiFlags.reportViewsEnabled) {
    return null;
  }

  return (
    <ModalShell
      open={!!item}
      onClose={onClose}
      size="xl"
      closeButton={false}
      panelClassName={historyReportModalPanelStyles}
    >
      <ModalScreenCloseButton onClose={onClose} />
      {item ? (
        <div className="flex-1 overflow-y-auto text-[#FDFEFF]">
          <ReportContent item={item} />
        </div>
      ) : null}
    </ModalShell>
  );
}
