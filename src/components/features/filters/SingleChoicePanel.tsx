import { FilterChip, SectionCard } from '../../ui';
import { filterPanelGroupStyles, filterPanelTitleStyles } from './FilterPanels.styles';

export interface SingleChoiceOption<T extends string> {
  value: T;
  label: string;
}

export interface SingleChoicePanelProps<T extends string> {
  title: string;
  value: T;
  options: Array<SingleChoiceOption<T>>;
  onChange: (value: T) => void;
}

export function SingleChoicePanel<T extends string>({
  title,
  value,
  options,
  onChange,
}: SingleChoicePanelProps<T>) {
  return (
    <SectionCard variant="compact" className="mb-5">
      <p className={filterPanelTitleStyles}>{title}</p>
      <div className={filterPanelGroupStyles}>
        {options.map((option) => (
          <FilterChip
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </FilterChip>
        ))}
      </div>
    </SectionCard>
  );
}
