import { Input, SectionCard } from '../../ui';
import { filterPanelTitleStyles } from './FilterPanels.styles';

export interface DateRangePanelProps {
  title: string;
  fromLabel?: string;
  toLabel?: string;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function DateRangePanel({
  title,
  fromLabel = 'c',
  toLabel = 'по',
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: DateRangePanelProps) {
  return (
    <SectionCard variant="compact" className="mb-5">
      <p className={filterPanelTitleStyles}>{title}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-xs text-[#FDFEFF]">
          <span className="text-[#FDFEFF]">{fromLabel}</span>
          <Input type="date" variant="date" value={fromValue} onChange={(event) => onFromChange(event.target.value)} />
        </label>
        <label className="space-y-2 text-xs text-[#FDFEFF]">
          <span className="text-[#FDFEFF]">{toLabel}</span>
          <Input type="date" variant="date" value={toValue} onChange={(event) => onToChange(event.target.value)} />
        </label>
      </div>
    </SectionCard>
  );
}
