import { Input, Label, LabelCaption, SectionCard } from '../../ui';
import { dateRangeLabeledPairGridStyles } from '../history/HistoryFilters.styles';
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
      <div className={dateRangeLabeledPairGridStyles}>
        <Label variant="stack" className="min-w-0">
          <LabelCaption>{fromLabel}</LabelCaption>
          <Input
            type="date"
            variant="date"
            className="w-full min-w-0"
            value={fromValue}
            onChange={(event) => onFromChange(event.target.value)}
          />
        </Label>
        <Label variant="stack" className="min-w-0">
          <LabelCaption>{toLabel}</LabelCaption>
          <Input
            type="date"
            variant="date"
            className="w-full min-w-0"
            value={toValue}
            onChange={(event) => onToChange(event.target.value)}
          />
        </Label>
      </div>
    </SectionCard>
  );
}
