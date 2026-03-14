import { AppliedFiltersRow, type AppliedFilterItem, DateRangePanel, SingleChoicePanel } from '../filters';
import { FilterTrigger, Input } from '../../ui';
import {
  historyFiltersPeriodPanelStyles,
  historyFiltersSearchStyles,
  historyFiltersToolbarStyles,
} from './HistoryFilters.styles';

export type HistoryCategoryFilter = 'all' | 'legal' | 'individual';
export type HistorySourceFilter = 'all' | 'telegram' | 'web';
export type HistoryStatusFilter = 'all' | 'success' | 'error';
export type HistorySortOrder = 'new' | 'old';
export type HistoryFilterPanel = 'period' | 'category' | 'source' | 'status' | null;

export interface HistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  categoryFilter: HistoryCategoryFilter;
  onCategoryFilterChange: (value: HistoryCategoryFilter) => void;
  sourceFilter: HistorySourceFilter;
  onSourceFilterChange: (value: HistorySourceFilter) => void;
  statusFilter: HistoryStatusFilter;
  onStatusFilterChange: (value: HistoryStatusFilter) => void;
  sortOrder: HistorySortOrder;
  onSortOrderChange: (value: HistorySortOrder) => void;
  openPanel: HistoryFilterPanel;
  onTogglePanel: (panel: HistoryFilterPanel) => void;
  activeChips: AppliedFilterItem[];
  onReset: () => void;
}

export function HistoryFilters({
  searchQuery,
  onSearchChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  categoryFilter,
  onCategoryFilterChange,
  sourceFilter,
  onSourceFilterChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  openPanel,
  onTogglePanel,
  activeChips,
  onReset,
}: HistoryFiltersProps) {
  return (
    <>
      <div className={historyFiltersToolbarStyles}>
        <label className={historyFiltersSearchStyles}>
          <span className="text-white/35">⌕</span>
          <Input
            className="h-auto border-0 bg-transparent px-0 text-sm"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <FilterTrigger label="Период" active={openPanel === 'period'} onClick={() => onTogglePanel('period')} />
        <FilterTrigger label="Категория" active={openPanel === 'category'} onClick={() => onTogglePanel('category')} />
        <FilterTrigger label="Источник" active={openPanel === 'source'} onClick={() => onTogglePanel('source')} />
        <FilterTrigger label="Статус" active={openPanel === 'status'} onClick={() => onTogglePanel('status')} />
      </div>

      {openPanel === 'period' ? (
        <div className={historyFiltersPeriodPanelStyles}>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <DateRangePanel
              title="Период"
              fromValue={dateFrom}
              toValue={dateTo}
              onFromChange={onDateFromChange}
              onToChange={onDateToChange}
            />

            <SingleChoicePanel
              title="Сортировка"
              value={sortOrder}
              options={[
                { value: 'new', label: 'Сначала новые' },
                { value: 'old', label: 'Сначала старые' },
              ]}
              onChange={onSortOrderChange}
            />
          </div>
        </div>
      ) : null}

      {openPanel === 'category' ? (
        <SingleChoicePanel
          title="Категория"
          value={categoryFilter}
          options={[
            { value: 'legal', label: 'Юридическое лицо' },
            { value: 'individual', label: 'Физическое лицо' },
            { value: 'all', label: 'Все' },
          ]}
          onChange={onCategoryFilterChange}
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

      {openPanel === 'status' ? (
        <SingleChoicePanel
          title="Статус"
          value={statusFilter}
          options={[
            { value: 'success', label: 'Успешно' },
            { value: 'error', label: 'Ошибка' },
            { value: 'all', label: 'Все' },
          ]}
          onChange={onStatusFilterChange}
        />
      ) : null}

      <AppliedFiltersRow filters={activeChips} onReset={onReset} />
    </>
  );
}
