import * as React from 'react';
import { AppliedFiltersRow, type AppliedFilterItem } from '../filters';
import { Checkbox, FilterTrigger, Input } from '../../ui';
import chevronSvg from '../../../assets/icons/chevron.svg';
import calendarSvg from '../../../assets/icons/calendar.svg';
import {
  historyFiltersDropdownPanelStyles,
  historyFiltersToolbarStyles,
} from '../history/HistoryFilters.styles';

export type BalanceTypeFilter = 'all' | 'income' | 'expense';
export type BalanceSourceFilter = 'all' | 'telegram' | 'web';
export type BalanceSortOrder = 'new' | 'old';
export type BalanceFilterPanel = 'period' | 'type' | 'source' | null;
export type BalanceFilterPanelKey = Exclude<BalanceFilterPanel, null>;

export interface BalanceFiltersProps {
  openPanel: BalanceFilterPanel;
  onTogglePanel: (panel: BalanceFilterPanel) => void;
  onClosePanels?: () => void;
  openPanels?: Partial<Record<BalanceFilterPanelKey, boolean>>;
  onTogglePanelMulti?: (panel: BalanceFilterPanelKey) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  sortOrder: BalanceSortOrder;
  onSortOrderChange: (value: BalanceSortOrder) => void;
  typeFilter: BalanceTypeFilter;
  onTypeFilterChange: (value: BalanceTypeFilter) => void;
  sourceFilter: BalanceSourceFilter;
  onSourceFilterChange: (value: BalanceSourceFilter) => void;
  activeChips: AppliedFilterItem[];
  onReset: () => void;
  showAppliedRow?: boolean;
  panelLayout?: 'dropdown' | 'static';
}

export function BalanceFilters({
  openPanel,
  onTogglePanel,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  sortOrder,
  onSortOrderChange,
  typeFilter,
  onTypeFilterChange,
  sourceFilter,
  onSourceFilterChange,
  activeChips,
  onReset,
  onClosePanels,
  openPanels,
  onTogglePanelMulti,
  showAppliedRow = true,
  panelLayout = 'dropdown',
}: BalanceFiltersProps) {
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
  }, [openPanel, onClosePanels, onTogglePanel, panelLayout]);

  const isPanelOpen = (key: BalanceFilterPanelKey) =>
    panelLayout === 'dropdown' ? openPanel === key : Boolean(openPanels?.[key]);

  const togglePanel = (key: BalanceFilterPanelKey) => {
    if (panelLayout === 'dropdown') onTogglePanel(key);
    else onTogglePanelMulti?.(key);
  };

  const renderTriggerIcon = (active: boolean) => (
    <img
      src={chevronSvg}
      alt=""
      className={`h-auto w-[12px] shrink-0 opacity-70 transition-transform ${active ? 'rotate-180' : ''}`}
      aria-hidden
    />
  );

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
            <Checkbox checked={value === option.value} onChange={() => onChange(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div ref={rootRef} className={historyFiltersToolbarStyles}>
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
            label="Тип операции"
            active={isPanelOpen('type')}
            onClick={() => togglePanel('type')}
            icon={renderTriggerIcon(isPanelOpen('type'))}
            className="w-full"
          />
          {isPanelOpen('type') ? (
            renderChoicePanel(typeFilter, [
              { value: 'income', label: 'Поступление' },
              { value: 'expense', label: 'Списание' },
              { value: 'all', label: 'Все' },
            ], onTypeFilterChange)
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
      </div>

      {showAppliedRow ? <AppliedFiltersRow filters={activeChips} onReset={onReset} /> : null}
    </>
  );
}
