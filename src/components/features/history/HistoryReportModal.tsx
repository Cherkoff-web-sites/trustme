import { uiFlags } from '../../../config/uiFlags';
import { ModalScreenCloseButton, ModalShell } from '../../ui';
import type { HistoryItem } from '../../../shared/ReportContent';
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
        <div className="flex-1 px-4 py-6 text-[#FDFEFF] sm:px-6 sm:py-8">
          <div className="text-[18px] font-semibold leading-[1.1] lg:text-[24px]">
            Показ отчета...
          </div>
        </div>
      ) : null}
    </ModalShell>
  );
}
