import * as React from 'react';
import { AppliedFiltersRow, type AppliedFilterItem } from '../filters';
import { Checkbox, FilterTrigger, Input } from '../../ui';
import searchSvg from '../../../assets/icons/search.svg';
import chevronSvg from '../../../assets/icons/chevron.svg';
import calendarSvg from '../../../assets/icons/calendar.svg';
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
export type HistoryFilterPanelKey = Exclude<HistoryFilterPanel, null>;

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
  onClosePanels?: () => void;
  /** Для моб. "static" режима: можно открыть несколько панелей одновременно. */
  openPanels?: Partial<Record<HistoryFilterPanelKey, boolean>>;
  onTogglePanelMulti?: (panel: HistoryFilterPanelKey) => void;
  activeChips: AppliedFilterItem[];
  onReset: () => void;
  showAppliedRow?: boolean;
  panelLayout?: 'dropdown' | 'static';
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
  onClosePanels,
  openPanels,
  onTogglePanelMulti,
  activeChips,
  onReset,
  showAppliedRow = true,
  panelLayout = 'dropdown',
}: HistoryFiltersProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (panelLayout !== 'dropdown') return;
    if (!openPanel) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = event.target as Node | null;
      if (!target) return;
      if (root.contains(target)) return;

      if (onClosePanels) onClosePanels();
      else onTogglePanel(openPanel);
    };

    document.addEventListener('mousedown', handlePointerDown, { capture: true });
    document.addEventListener('touchstart', handlePointerDown, { capture: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown, { capture: true } as any);
      document.removeEventListener('touchstart', handlePointerDown, { capture: true } as any);
    };
  }, [openPanel, onClosePanels, onTogglePanel]);
  const searchSuggestions = [
    { id: 'search-1', label: 'Текст', value: 'Значение' },
    { id: 'search-2', label: 'Текст', value: 'Значение' },
    { id: 'search-3', label: 'Текст', value: 'Значение' },
  ];

  const renderTriggerIcon = (active: boolean) => (
    <img
      src={chevronSvg}
      alt=""
      className={`h-auto w-[12px] shrink-0 opacity-70 transition-transform ${active ? 'rotate-180' : ''}`}
      aria-hidden
    />
  );

  const isPanelOpen = (key: HistoryFilterPanelKey) =>
    panelLayout === 'dropdown' ? openPanel === key : Boolean(openPanels?.[key]);

  const togglePanel = (key: HistoryFilterPanelKey) => {
    if (panelLayout === 'dropdown') onTogglePanel(key);
    else onTogglePanelMulti?.(key);
  };

  const renderChoicePanel = <T extends string>(
    value: T,
    options: Array<{ value: T; label: string }>,
    onChange: (nextValue: T) => void,
  ) => (
    <div
      className={
        panelLayout === 'dropdown'
          ? `${historyFiltersDropdownPanelStyles} min-w-[150px] p-3`
          : `mt-[15px] w-full rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] p-3`
      }
    >
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex w-full cursor-pointer items-center gap-3 text-left text-[16px] text-[#FDFEFF]"
          >
            <Checkbox
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div ref={rootRef} className={historyFiltersToolbarStyles}>
        <div className={panelLayout === 'dropdown' ? 'relative w-full lg:w-[380px]' : 'w-full'}>
          <label
            className={historyFiltersSearchStyles}
            onClick={() => {
              if (panelLayout === 'dropdown') {
                if (openPanel !== 'search') onTogglePanel('search');
              } else {
                togglePanel('search');
              }
            }}
          >
            <img src={searchSvg} alt="" className="h-5 w-5 shrink-0 text-[#FDFEFF]" aria-hidden />
            <Input
              className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={() => {
                if (panelLayout === 'dropdown') {
                  if (openPanel !== 'search') onTogglePanel('search');
                }
              }}
            />
          </label>
          {isPanelOpen('search') ? (
            <div
              className={
                panelLayout === 'dropdown'
                  ? `${historyFiltersDropdownPanelStyles} h-[152px] overflow-y-auto p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:w-0`
                  : `mt-[15px] h-[152px] w-full overflow-y-auto rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:w-0`
              }
            >
              {searchSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-base"
                >
                  <span className="text-[#FDFEFF]">{item.label}</span>
                  <span className="text-[#FDFEFF]">{item.value}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className={panelLayout === 'dropdown' ? 'relative w-full lg:w-[224px]' : 'w-full'}>
          <FilterTrigger
            label="Период"
            active={isPanelOpen('period')}
            onClick={() => togglePanel('period')}
            icon={renderTriggerIcon(isPanelOpen('period'))}
            className="w-full"
          />
          {isPanelOpen('period') ? (
            <div
              className={
                panelLayout === 'dropdown'
                  ? `${historyFiltersDropdownPanelStyles} w-full lg:w-[390px] p-3`
                  : `mt-[15px] w-full rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] p-3`
              }
            >
              <div className="grid gap-3">
                <div className="grid grid-cols-[minmax(0,1fr)_68px_minmax(0,1fr)] items-center text-base">
                  <Input
                    type="date"
                    variant="date"
                    value={dateFrom}
                    onChange={(e) => onDateFromChange(e.target.value)}
                    className="h-[47px] min-w-0 px-[15px] py-[15px] [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                    endAdornment={<img src={calendarSvg} alt="" aria-hidden className="h-5 w-5" />}
                  />
                  <span className="mx-auto text-[#FDFEFF]">–</span>
                  <Input
                    type="date"
                    variant="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                    className="h-[47px] min-w-0 px-[15px] py-[15px] [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                    endAdornment={<img src={calendarSvg} alt="" aria-hidden className="h-5 w-5" />}
                  />
                </div>
                <div className="mt-[30px]">
                  <p className="mb-[15px] border-b border-[#FDFEFF]/50 pb-[10px] text-[14px] text-[#FDFEFF]/50">
                    Сортировка
                  </p>
                  <div className="space-y-2">
                    {[
                      { value: 'new' as const, label: 'Сначала новые', icon: '⇣' },
                      { value: 'old' as const, label: 'Сначала старые', icon: '⇡' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onSortOrderChange(opt.value)}
                        className={`flex w-full items-center gap-2 text-left text-[16px] transition ${
                          sortOrder === opt.value ? 'text-[#FDFEFF]' : 'text-[#FDFEFF] hover:text-[#FDFEFF]'
                        }`}
                      >
                        <span className="w-4 text-[#FDFEFF]">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className={panelLayout === 'dropdown' ? 'relative w-full lg:w-[224px]' : 'w-full'}>
          <FilterTrigger
            label="Категория"
            active={isPanelOpen('category')}
            onClick={() => togglePanel('category')}
            icon={renderTriggerIcon(isPanelOpen('category'))}
            className="w-full"
          />
          {isPanelOpen('category') ? (
            renderChoicePanel(categoryFilter, [
              { value: 'legal', label: 'Юридическое лицо' },
              { value: 'individual', label: 'Физическое лицо' },
              { value: 'all', label: 'Все' },
            ], onCategoryFilterChange)
          ) : null}
        </div>

        <div className={panelLayout === 'dropdown' ? 'relative w-full lg:w-[224px]' : 'w-full'}>
          <FilterTrigger
            label="Источник"
            active={isPanelOpen('source')}
            onClick={() => togglePanel('source')}
            icon={renderTriggerIcon(isPanelOpen('source'))}
            className="w-full"
          />
          {isPanelOpen('source') ? (
            renderChoicePanel(sourceFilter, [
              { value: 'telegram', label: 'Telegram-бот' },
              { value: 'web', label: 'Веб-сервис' },
              { value: 'all', label: 'Все' },
            ], onSourceFilterChange)
          ) : null}
        </div>

        <div className={panelLayout === 'dropdown' ? 'relative w-full lg:w-[224px]' : 'w-full'}>
          <FilterTrigger
            label="Статус"
            active={isPanelOpen('status')}
            onClick={() => togglePanel('status')}
            icon={renderTriggerIcon(isPanelOpen('status'))}
            className="w-full"
          />
          {isPanelOpen('status') ? (
            renderChoicePanel(statusFilter, [
              { value: 'success', label: 'Успешно' },
              { value: 'error', label: 'Ошибка' },
              { value: 'all', label: 'Все' },
            ], onStatusFilterChange)
          ) : null}
        </div>
      </div>

      {showAppliedRow ? <AppliedFiltersRow filters={activeChips} onReset={onReset} /> : null}
    </>
  );
}
