import { ReportActions } from '../ReportActions';
import { SourceBadge, uiTokens } from '../../ui';
import { SuccessStatusIcon, ErrorStatusIcon } from '../../../shared/icons';
import type { HistoryItem } from '../../../shared/ReportContent';
import {
  historyRequestCardHeaderStyles,
  historyRequestCardMetaGridStyles,
  historyRequestCardNameRowStyles,
  historyRequestCardTypeChipStyles,
} from './HistoryRequestCard.styles';

export interface HistoryRequestCardProps {
  item: HistoryItem;
  onOpenReport?: () => void;
}

export function HistoryRequestCard({
  item,
  onOpenReport,
}: HistoryRequestCardProps) {
  return (
    <article className={`${uiTokens.card} p-4 sm:p-5`}>
      <div className={historyRequestCardHeaderStyles}>
        <div>
          <span className={historyRequestCardTypeChipStyles}>{item.type}</span>
          <div className={historyRequestCardNameRowStyles}>
            <h3 className="text-[24px] leading-[1.1] font-semibold uppercase text-white sm:text-[30px]">{item.name}</h3>
            <span className={`h-2.5 w-2.5 rounded-full ${item.dotColor}`} />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-start">
          <SourceBadge source={item.source} />
          {item.success ? <SuccessStatusIcon /> : <ErrorStatusIcon />}
        </div>
      </div>

      <div className={historyRequestCardMetaGridStyles}>
        <div>
          <p className="mb-2 text-white/45">Документ</p>
          <p className="m-0">{item.document}</p>
        </div>
        {item.birthDate ? (
          <div>
            <p className="mb-2 text-white/45">Дата рождения</p>
            <p className="m-0">{item.birthDate}</p>
          </div>
        ) : null}
        <div>
          <p className="mb-2 text-white/45">Дата и время проверки</p>
          <p className="m-0">{item.checkedAt}</p>
        </div>
        <div>
          <p className="mb-2 text-white/45">Длительность проверки</p>
          <p className="m-0">{item.duration}</p>
        </div>
      </div>

      <ReportActions onOpen={onOpenReport} showDelete />
    </article>
  );
}
