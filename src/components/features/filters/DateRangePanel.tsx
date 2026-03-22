import { Input, Label, LabelCaption, SectionCard } from '../../ui';
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
        <Label variant="stack">
          <LabelCaption>{fromLabel}</LabelCaption>
          <Input type="date" variant="date" value={fromValue} onChange={(event) => onFromChange(event.target.value)} />
        </Label>
        <Label variant="stack">
          <LabelCaption>{toLabel}</LabelCaption>
          <Input type="date" variant="date" value={toValue} onChange={(event) => onToChange(event.target.value)} />
        </Label>
      </div>
    </SectionCard>
  );
}
