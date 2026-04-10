import * as React from 'react';
import { AppliedFiltersRow, type AppliedFilterItem } from '../filters';
import { Checkbox, FilterTrigger, Input } from '../../ui';
import { cn } from '../../../lib/cn';
import searchSvg from '../../../assets/icons/search.svg';
import chevronSvg from '../../../assets/icons/chevron.svg';
import calendarSvg from '../../../assets/icons/calendar.svg';
import { scrollableThreeRowListClass } from '../../../shared/scrollListClasses';
import {
  historyFiltersDropdownPanelStyles,
  historyFiltersSearchInputClassName,
  historyFiltersToolbarStyles,
} from './HistoryFilters.styles';

const historySearchAccentClass = 'text-[#0EB8D2]';

function normalizeHistorySearchQuery(q: string) {
  return q.trim().toLowerCase();
}

function getSearchSuggestionsList(query: string, candidates: readonly string[]): string[] {
  const qn = normalizeHistorySearchQuery(query);
  if (!qn) return [];
  const seen = new Set<string>();
  const starts: string[] = [];
  const includes: string[] = [];
  for (const raw of candidates) {
    const t = raw.trim();
    if (!t || seen.has(t)) continue;
    const tn = t.toLowerCase();
    if (!tn.includes(qn)) continue;
    seen.add(t);
    if (tn.startsWith(qn)) starts.push(t);
    else includes.push(t);
  }
  return [...starts, ...includes].slice(0, 30);
}

function getInlineCompletionSuffix(query: string, candidates: readonly string[]): string {
  const qn = normalizeHistorySearchQuery(query);
  if (!qn) return '';
  for (const raw of candidates) {
    const t = raw.trim();
    if (!t) continue;
    const tn = t.toLowerCase();
    if (!tn.startsWith(qn) || t.length <= qn.length) continue;
    return t.slice(qn.length);
  }
  return '';
}

/** Введённый запрос — белый (#FDFEFF), остаток строки подсказки — акцент (#0EB8D2). */
function renderHighlightedHistorySuggestion(text: string, query: string) {
  const qi = query.trim();
  if (!qi) {
    return <span className="text-[#FDFEFF]">{text}</span>;
  }
  const lower = text.toLowerCase();
  const idx = lower.indexOf(qi.toLowerCase());
  if (idx === -1) {
    return <span className={historySearchAccentClass}>{text}</span>;
  }
  const end = idx + qi.length;
  return (
    <>
      <span className={historySearchAccentClass}>{text.slice(0, idx)}</span>
      <span className="text-[#FDFEFF]">{text.slice(idx, end)}</span>
      <span className={historySearchAccentClass}>{text.slice(end)}</span>
    </>
  );
}

export type HistoryCategoryFilter = 'all' | 'legal' | 'individual';
export type HistorySourceFilter = 'all' | 'telegram' | 'web';
export type HistoryStatusFilter = 'all' | 'success' | 'error';
export type HistorySortOrder = 'new' | 'old';
export type HistoryFilterPanel = 'search' | 'period' | 'category' | 'source' | 'status' | null;
export type HistoryFilterPanelKey = Exclude<HistoryFilterPanel, null>;

export interface HistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  /**
   * Фиксация запроса: при `blur` поля — без аргумента (текущая строка);
   * при выборе подсказки — передать выбранное значение.
   */
  onSearchApply?: (value?: string) => void;
  /** Моб. static: при фокусе открыть блок поиска (без toggle). */
  onSearchPanelEnsureOpen?: () => void;
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
  /** Строки для подсказок и автодополнения (ФИО, реквизиты и т.д.) */
  searchCandidates?: readonly string[];
}

export function HistoryFilters({
  searchQuery,
  onSearchChange,
  onSearchApply,
  onSearchPanelEnsureOpen,
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
  searchCandidates = [],
}: HistoryFiltersProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

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

  const searchSuggestions = getSearchSuggestionsList(searchQuery, searchCandidates);
  const ghostCompletionSuffix = getInlineCompletionSuffix(searchQuery, searchCandidates);
  const hasSearchQuery = searchQuery.trim().length > 0;
  const showSearchSuggestionsPanel =
    isPanelOpen('search') && hasSearchQuery && searchSuggestions.length > 0;

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
          <Input
            ref={searchInputRef}
            type="search"
            autoComplete="off"
            enterKeyHint="search"
            startAdornment={
              <img src={searchSvg} alt="" className="h-5 w-5 text-[#FDFEFF]" width={20} height={20} />
            }
            inputOverlay={
              ghostCompletionSuffix ? (
                <span className="flex min-w-0 max-w-full items-center truncate text-[16px] font-normal leading-normal">
                  <span className="shrink-0 whitespace-pre text-[#FDFEFF]">{searchQuery}</span>
                  <span className={historySearchAccentClass}>{ghostCompletionSuffix}</span>
                </span>
              ) : undefined
            }
            className={cn(
              historyFiltersSearchInputClassName,
              ghostCompletionSuffix
                ? 'text-transparent caret-[#FDFEFF] selection:bg-[rgba(14,184,210,0.35)]'
                : undefined,
            )}
            placeholder={searchQuery ? '' : 'Поиск'}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            onBlur={() => onSearchApply?.()}
            onFocus={() => {
              if (panelLayout === 'dropdown') {
                if (openPanel !== 'search') onTogglePanel('search');
              } else {
                onSearchPanelEnsureOpen?.();
              }
            }}
          />
          {showSearchSuggestionsPanel ? (
            <div
              className={
                panelLayout === 'dropdown'
                  ? cn(historyFiltersDropdownPanelStyles, scrollableThreeRowListClass, 'p-0')
                  : cn(
                      'mt-[15px] w-full rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] p-0',
                      scrollableThreeRowListClass,
                    )
              }
            >
              {searchSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="flex w-full min-w-0 items-center px-4 py-3 text-left text-base hover:bg-[#FDFEFF]/5"
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => {
                    onSearchApply?.(item);
                    searchInputRef.current?.blur();
                  }}
                >
                  <span className="min-w-0 truncate">{renderHighlightedHistorySuggestion(item, searchQuery)}</span>
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
                <div className="flex w-full min-w-0 flex-row flex-wrap items-center gap-[5px] text-base lg:grid lg:grid-cols-[minmax(0,1fr)_68px_minmax(0,1fr)] lg:items-center lg:gap-3">
                  <div className="min-w-0 flex-1 lg:min-w-0">
                    <Input
                      type="date"
                      variant="date"
                      value={dateFrom}
                      onChange={(e) => onDateFromChange(e.target.value)}
                      className="h-[47px] min-w-0 pl-[15px] py-[15px] leading-normal [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                      endAdornment={<img src={calendarSvg} alt="" aria-hidden className="h-5 w-5" />}
                    />
                  </div>
                  <span className="shrink-0 text-[#FDFEFF] lg:mx-auto">–</span>
                  <div className="min-w-0 flex-1 lg:min-w-0">
                    <Input
                      type="date"
                      variant="date"
                      value={dateTo}
                      onChange={(e) => onDateToChange(e.target.value)}
                      className="h-[47px] min-w-0 pl-[15px] py-[15px] leading-normal [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                      endAdornment={<img src={calendarSvg} alt="" aria-hidden className="h-5 w-5" />}
                    />
                  </div>
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
