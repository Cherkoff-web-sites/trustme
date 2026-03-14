import { AppliedFiltersRow, type AppliedFilterItem } from '../filters';
import { FilterTrigger, Input, OptionIndicator } from '../../ui';
import searchSvg from '../../../assets/icons/search.svg';
import chevronSvg from '../../../assets/icons/chevron.svg';
import {
  historyFiltersDropdownPanelStyles,
  historyFiltersSearchStyles,
  historyFiltersToolbarStyles,
} from './HistoryFilters.styles';

export type HistoryCategoryFilter = 'all' | 'legal' | 'individual';
export type HistorySourceFilter = 'all' | 'telegram' | 'web';
export type HistoryStatusFilter = 'all' | 'success' | 'error';
export type HistorySortOrder = 'new' | 'old';
export type HistoryFilterPanel = 'search' | 'period' | 'category' | 'source' | 'status' | null;

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
  const searchSuggestions = [
    { id: 'search-1', label: 'Текст', value: 'Значение' },
    { id: 'search-2', label: 'Текст', value: 'Значение' },
    { id: 'search-3', label: 'Текст', value: 'Значение' },
  ];

  const renderTriggerIcon = (active: boolean) => (
    <img
      src={chevronSvg}
      alt=""
      className={`h-4 w-4 shrink-0 opacity-70 transition-transform ${active ? 'rotate-180' : ''}`}
      aria-hidden
    />
  );

  const renderChoicePanel = <T extends string>(
    title: string,
    value: T,
    options: Array<{ value: T; label: string }>,
    onChange: (nextValue: T) => void,
  ) => (
    <div className={`${historyFiltersDropdownPanelStyles} min-w-[150px] p-3`}>
      <div className="space-y-3">
        {title ? <p className="text-base text-[#FDFEFF]/85">{title}</p> : null}
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className="flex w-full items-center gap-2.5 text-left text-base text-[#FDFEFF]/90 transition hover:text-[#FDFEFF]"
            >
              <OptionIndicator type="checkbox" checked={value === option.value} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={historyFiltersToolbarStyles}>
        <div className="relative min-w-[250px] flex-1 sm:max-w-[250px]">
          <label
            className={historyFiltersSearchStyles}
            onClick={() => {
              if (openPanel !== 'search') onTogglePanel('search');
            }}
          >
            <img src={searchSvg} alt="" className="h-5 w-5 shrink-0 text-[#FDFEFF]/55" aria-hidden />
            <Input
              className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0 text-base"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={() => {
                if (openPanel !== 'search') onTogglePanel('search');
              }}
            />
          </label>
          {openPanel === 'search' ? (
            <div className={`${historyFiltersDropdownPanelStyles} max-h-[102px] overflow-y-auto p-0`}>
              {searchSuggestions.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-base ${
                    index !== searchSuggestions.length - 1 ? 'border-b border-[#FDFEFF]/15' : ''
                  }`}
                >
                  <span className="text-[#FDFEFF]/85">{item.label}</span>
                  <span className="text-[#0EB8D2]">{item.value}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative min-w-[160px] flex-1 sm:max-w-[160px]">
          <FilterTrigger
            label="Период"
            active={openPanel === 'period'}
            onClick={() => onTogglePanel('period')}
            icon={renderTriggerIcon(openPanel === 'period')}
            className="w-full"
          />
          {openPanel === 'period' ? (
            <div className={`${historyFiltersDropdownPanelStyles} min-w-[260px] p-3`}>
              <div className="grid gap-3">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-base">
                  <Input
                    type="date"
                    variant="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    className="text-base"
                  />
                  <span className="text-[#FDFEFF]/60">–</span>
                  <Input
                    type="date"
                    variant="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                    className="text-base"
                  />
                </div>
                <div className="border-t border-[#FDFEFF]/15 pt-3">
                  <p className="mb-2 text-base text-[#FDFEFF]/55">Сортировка</p>
                  <div className="space-y-2">
                    {[
                      { value: 'new' as const, label: 'Сначала новые', icon: '⇣' },
                      { value: 'old' as const, label: 'Сначала старые', icon: '⇡' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onSortOrderChange(opt.value)}
                        className={`flex w-full items-center gap-2 text-left text-base transition ${
                          sortOrder === opt.value ? 'text-[#FDFEFF]' : 'text-[#FDFEFF]/75 hover:text-[#FDFEFF]'
                        }`}
                      >
                        <span className="w-4 text-[#FDFEFF]/60">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative min-w-[150px] flex-1 sm:max-w-[150px]">
          <FilterTrigger
            label="Категория"
            active={openPanel === 'category'}
            onClick={() => onTogglePanel('category')}
            icon={renderTriggerIcon(openPanel === 'category')}
            className="w-full"
          />
          {openPanel === 'category' ? (
            renderChoicePanel('Категория', categoryFilter, [
              { value: 'legal', label: 'Юридическое лицо' },
              { value: 'individual', label: 'Физическое лицо' },
              { value: 'all', label: 'Все' },
            ], onCategoryFilterChange)
          ) : null}
        </div>

        <div className="relative min-w-[150px] flex-1 sm:max-w-[150px]">
          <FilterTrigger
            label="Источник"
            active={openPanel === 'source'}
            onClick={() => onTogglePanel('source')}
            icon={renderTriggerIcon(openPanel === 'source')}
            className="w-full"
          />
          {openPanel === 'source' ? (
            renderChoicePanel('Источник', sourceFilter, [
              { value: 'telegram', label: 'Telegram-бот' },
              { value: 'web', label: 'Веб-сервис' },
              { value: 'all', label: 'Все' },
            ], onSourceFilterChange)
          ) : null}
        </div>

        <div className="relative min-w-[150px] flex-1 sm:max-w-[150px]">
          <FilterTrigger
            label="Статус"
            active={openPanel === 'status'}
            onClick={() => onTogglePanel('status')}
            icon={renderTriggerIcon(openPanel === 'status')}
            className="w-full"
          />
          {openPanel === 'status' ? (
            renderChoicePanel('Статус', statusFilter, [
              { value: 'success', label: 'Успешно' },
              { value: 'error', label: 'Ошибка' },
              { value: 'all', label: 'Все' },
            ], onStatusFilterChange)
          ) : null}
        </div>
      </div>

      <AppliedFiltersRow filters={activeChips} onReset={onReset} />
    </>
  );
}
