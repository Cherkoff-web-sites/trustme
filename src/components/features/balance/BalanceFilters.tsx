import { AppliedFiltersRow, type AppliedFilterItem, DateRangePanel, SingleChoicePanel } from '../filters';
import { Button, FilterTrigger } from '../../ui';
import {
  balanceFiltersResetIconStyles,
  balanceFiltersToolbarStyles,
} from './BalanceFilters.styles';

export type BalanceTypeFilter = 'all' | 'income' | 'expense';
export type BalanceSourceFilter = 'all' | 'telegram' | 'web';
export type BalanceFilterPanel = 'period' | 'type' | 'source' | null;

export interface BalanceFiltersProps {
  openPanel: BalanceFilterPanel;
  onTogglePanel: (panel: BalanceFilterPanel) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  typeFilter: BalanceTypeFilter;
  onTypeFilterChange: (value: BalanceTypeFilter) => void;
  sourceFilter: BalanceSourceFilter;
  onSourceFilterChange: (value: BalanceSourceFilter) => void;
  chips: AppliedFilterItem[];
  onReset: () => void;
}

export function BalanceFilters({
  openPanel,
  onTogglePanel,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  typeFilter,
  onTypeFilterChange,
  sourceFilter,
  onSourceFilterChange,
  chips,
  onReset,
}: BalanceFiltersProps) {
  return (
    <>
      <div className={balanceFiltersToolbarStyles}>
        <FilterTrigger minWidth="md" label="Период" active={openPanel === 'period'} onClick={() => onTogglePanel('period')} />
        <FilterTrigger minWidth="md" label="Тип операции" active={openPanel === 'type'} onClick={() => onTogglePanel('type')} />
        <FilterTrigger minWidth="md" label="Источник" active={openPanel === 'source'} onClick={() => onTogglePanel('source')} />

        {chips.length > 0 ? (
          <Button variant="ghost" className="text-sm font-medium text-white/85" onClick={onReset}>
            <span className={balanceFiltersResetIconStyles}>
              ×
            </span>
            Сбросить фильтры
          </Button>
        ) : null}
      </div>

      {openPanel === 'period' ? (
        <DateRangePanel
          title="Период"
          fromValue={dateFrom}
          toValue={dateTo}
          onFromChange={onDateFromChange}
          onToChange={onDateToChange}
        />
      ) : null}

      {openPanel === 'type' ? (
        <SingleChoicePanel
          title="Тип операции"
          value={typeFilter}
          options={[
            { value: 'income', label: 'Поступление' },
            { value: 'expense', label: 'Списание' },
            { value: 'all', label: 'Все' },
          ]}
          onChange={onTypeFilterChange}
        />
      ) : null}

      {openPanel === 'source' ? (
        <SingleChoicePanel
          title="Источник"
          value={sourceFilter}
          options={[
            { value: 'telegram', label: 'Telegram-бот' },
            { value: 'web', label: 'Веб-сервис' },
            { value: 'all', label: 'Все' },
          ]}
          onChange={onSourceFilterChange}
        />
      ) : null}

      <AppliedFiltersRow filters={chips} onReset={onReset} />
    </>
  );
}
