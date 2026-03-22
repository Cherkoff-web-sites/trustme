import { AppliedFiltersRow, type AppliedFilterItem } from '../filters';
import { Checkbox, FilterTrigger, Input, labelCheckboxTextClass } from '../../ui';
import { combineStyles } from '../../../lib/combineStyles';
import chevronSvg from '../../../assets/icons/chevron.svg';
import {
  historyFiltersDropdownPanelStyles,
  historyFiltersToolbarStyles,
} from '../history/HistoryFilters.styles';

export type BalanceTypeFilter = 'all' | 'income' | 'expense';
export type BalanceSourceFilter = 'all' | 'telegram' | 'web';
export type BalanceSortOrder = 'new' | 'old';
export type BalanceFilterPanel = 'period' | 'type' | 'source' | null;

export interface BalanceFiltersProps {
  openPanel: BalanceFilterPanel;
  onTogglePanel: (panel: BalanceFilterPanel) => void;
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
}: BalanceFiltersProps) {
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
        {title ? <p className="text-base text-[#FDFEFF]">{title}</p> : null}
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={combineStyles(
                'group flex w-full items-start gap-2.5 text-left text-[#FDFEFF] transition hover:text-[#FDFEFF]',
                labelCheckboxTextClass,
              )}
            >
              <Checkbox
                checked={value === option.value}
                onChange={() => {}}
                className="pointer-events-none shrink-0"
                tabIndex={-1}
                aria-hidden
              />
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
                  />
                  <span className="text-[#FDFEFF]">–</span>
                  <Input
                    type="date"
                    variant="date"
                    value={dateTo}
                    onChange={(e) => onDateToChange(e.target.value)}
                  />
                </div>
                <div className="border-t border-[#FDFEFF]/15 pt-3">
                  <p className="mb-2 text-base text-[#FDFEFF]">Сортировка</p>
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

        <div className="relative min-w-[150px] flex-1 sm:max-w-[150px]">
          <FilterTrigger
            label="Тип операции"
            active={openPanel === 'type'}
            onClick={() => onTogglePanel('type')}
            icon={renderTriggerIcon(openPanel === 'type')}
            className="w-full"
          />
          {openPanel === 'type' ? (
            renderChoicePanel('Тип операции', typeFilter, [
              { value: 'income', label: 'Поступление' },
              { value: 'expense', label: 'Списание' },
              { value: 'all', label: 'Все' },
            ], onTypeFilterChange)
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
      </div>

      <AppliedFiltersRow filters={activeChips} onReset={onReset} />
    </>
  );
}
