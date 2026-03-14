import { FilterChip } from '../../ui';
import {
  appliedFiltersListStyles,
  appliedFiltersResetStyles,
  appliedFiltersRowStyles,
} from './FilterPanels.styles';

export interface AppliedFilterItem {
  id: string;
  label: string;
  clear: () => void;
}

export interface AppliedFiltersRowProps {
  filters: AppliedFilterItem[];
  onReset: () => void;
}

export function AppliedFiltersRow({
  filters,
  onReset,
}: AppliedFiltersRowProps) {
  if (!filters.length) return null;

  return (
    <div className={appliedFiltersRowStyles}>
      <div className={appliedFiltersListStyles}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.id}
            variant="applied"
            onClick={filter.clear}
            removeIcon={<span className="text-white/50">×</span>}
          >
            {filter.label}
          </FilterChip>
        ))}
      </div>
      <button type="button" className={appliedFiltersResetStyles} onClick={onReset}>
        Сбросить фильтры
      </button>
    </div>
  );
}
