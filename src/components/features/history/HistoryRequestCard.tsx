import { ReportActions } from '../ReportActions';
import { Card, SourceBadge } from '../../ui';
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
    <Card as="article" className="" variant="history">
      <div className={historyRequestCardHeaderStyles}>
        {/* Mobile (смещение структуры под макет): type + иконки в одной обёртке, заголовок отдельной строкой */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className={historyRequestCardTypeChipStyles}>{item.type}</span>
            <div className="flex items-center gap-3">
              <SourceBadge source={item.source} />
              {item.success ? <SuccessStatusIcon /> : <ErrorStatusIcon />}
            </div>
          </div>

          <div className={`${historyRequestCardNameRowStyles} mt-[40px]`}>
            <h3 className="text-[24px] leading-[1.1] font-semibold uppercase text-white sm:text-[30px]">{item.name}</h3>
            <span className={`h-4 w-4 min-w-[16px] rounded-full ${item.dotColor}`} />
          </div>
        </div>

        {/* Desktop: оставить текущую структуру без изменений */}
        <div className="hidden sm:block">
          <span className={historyRequestCardTypeChipStyles}>{item.type}</span>
          <div className={historyRequestCardNameRowStyles}>
            <h3 className="text-[24px] leading-[1.1] font-semibold uppercase text-white sm:text-[30px]">{item.name}</h3>
            <span className={`h-4 w-4 min-w-[16px] rounded-full ${item.dotColor}`} />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 self-end sm:self-start">
          <SourceBadge source={item.source} />
          {item.success ? <SuccessStatusIcon /> : <ErrorStatusIcon />}
        </div>
      </div>

      <div className={historyRequestCardMetaGridStyles}>
        <div>
          <p className="mb-2 text-[#FDFEFF]">Документ</p>
          <p className="m-0">{item.document}</p>
        </div>
        {item.birthDate ? (
          <div>
            <p className="mb-2 text-[#FDFEFF]">Дата рождения</p>
            <p className="m-0">{item.birthDate}</p>
          </div>
        ) : null}
        <div>
          <p className="mb-2 text-[#FDFEFF]">Дата и время проверки</p>
          <p className="m-0">{item.checkedAt}</p>
        </div>
        <div>
          <p className="mb-2 text-[#FDFEFF]">Длительность проверки</p>
          <p className="m-0">{item.duration}</p>
        </div>
      </div>

      <ReportActions onOpen={onOpenReport} showDelete />
    </Card>
  );
}
