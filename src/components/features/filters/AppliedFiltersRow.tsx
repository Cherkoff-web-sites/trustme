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
            removeIcon={
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path
                  d="M2.92969 2.05078L14.0676 13.1887M2.92969 13.1887L14.0676 2.05078"
                  stroke="#939494"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {filter.label}
          </FilterChip>
        ))}
      </div>
      <button type="button" className={appliedFiltersResetStyles} onClick={onReset}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#FDFEFF" strokeWidth="1.5" />
          <path
            d="M8 8L16 16M8 16L16 8"
            stroke="#FDFEFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Сбросить фильтры</span>
      </button>
    </div>
  );
}
