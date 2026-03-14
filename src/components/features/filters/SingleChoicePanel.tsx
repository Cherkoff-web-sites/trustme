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
  compact?: boolean;
}

export function SingleChoicePanel<T extends string>({
  title,
  value,
  options,
  onChange,
  compact = false,
}: SingleChoicePanelProps<T>) {
  const content = (
    <>
      {title ? (
        <p className={compact ? 'mb-2 text-base text-[#FDFEFF]/85' : filterPanelTitleStyles}>{title}</p>
      ) : null}
      <div className={compact ? 'flex flex-wrap gap-2 text-base text-[#FDFEFF]/85' : filterPanelGroupStyles}>
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
    </>
  );

  if (compact) {
    return <div className="text-base">{content}</div>;
  }

  return (
    <SectionCard variant="compact" className="mb-5">
      {content}
    </SectionCard>
  );
}
