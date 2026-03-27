import { useState } from 'react';
import {
  HistoryFilters,
  HistoryReportModal,
  HistoryRequestCard,
  type HistoryCategoryFilter,
  type HistoryFilterPanel,
  type HistoryFiltersProps,
  type HistoryFilterPanelKey,
  type HistorySourceFilter,
  type HistoryStatusFilter,
} from '../../components/features/history';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { Card, FilterChip } from '../../components/ui';
import { type HistoryItem } from '../../shared/ReportContent';

export function HistoryPage() {
  const historyItems: HistoryItem[] = [
    {
      type: 'Юридическое лицо',
      name: 'ООО «УМНЫЙ РИТЕЙЛ»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7711771234',
      checkedAt: '30.01.2025, 19:00',
      duration: '2 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'ГОЛЬДМАН РОМАН ГЕННАДЬЕВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7711771234',
      birthDate: '09.11.1975',
      checkedAt: '27.10.2025, 09:32',
      duration: '5 минут',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «ТУФЕЛЬКА»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 8800553535',
      checkedAt: '22.01.2026, 22:44',
      duration: '1 минута',
      source: 'web',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'МИХАЙЛОВ АЛЕКСЕЙ АЛЕКСЕЕВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7711881234',
      birthDate: '10.10.1980',
      checkedAt: '28.12.2025, 07:32',
      duration: '3 минуты',
      source: 'web',
      success: true,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<HistoryCategoryFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<HistorySourceFilter>('all');
  const [statusFilter, setStatusFilter] = useState<HistoryStatusFilter>('all');
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');
  const [openPanel, setOpenPanel] = useState<HistoryFilterPanel>(null);
  const [openedReportItem, setOpenedReportItem] = useState<HistoryItem | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileOpenPanels, setMobileOpenPanels] = useState<Partial<Record<HistoryFilterPanelKey, boolean>>>({});

  const resetFilters = () => {
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
    setCategoryFilter('all');
    setSourceFilter('all');
    setStatusFilter('all');
    setSortOrder('new');
    setOpenPanel(null);
    setMobileFiltersOpen(false);
    setMobileOpenPanels({});
  };

  const togglePanel = (panel: HistoryFilterPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const parseHistoryDate = (value: string) => {
    const [datePart] = value.split(',');
    const parts = datePart.trim().split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts.map((part) => Number(part));
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const parseInputDate = (value: string) => {
    if (!value) return null;
    const parts = value.split('-').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const fromDate = parseInputDate(dateFrom);
  const toDate = parseInputDate(dateTo);

  const filteredAndSortedItems = historyItems
    .filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const haystack = `${item.name} ${item.document}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      if (categoryFilter === 'legal' && item.type !== 'Юридическое лицо') {
        return false;
      }
      if (categoryFilter === 'individual' && item.type !== 'Физическое лицо') {
        return false;
      }

      if (sourceFilter !== 'all' && item.source !== sourceFilter) {
        return false;
      }

      if (statusFilter === 'success' && !item.success) {
        return false;
      }
      if (statusFilter === 'error' && item.success) {
        return false;
      }

      const itemDate = parseHistoryDate(item.checkedAt);
      if (itemDate) {
        if (fromDate && itemDate < fromDate) {
          return false;
        }
        if (toDate && itemDate > toDate) {
          return false;
        }
      }

      return true;
    })
    .slice()
    .sort((a, b) => {
      const aDate = parseHistoryDate(a.checkedAt);
      const bDate = parseHistoryDate(b.checkedAt);
      if (!aDate || !bDate) return 0;
      return sortOrder === 'new' ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime();
    });

  const activeChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (searchQuery.trim()) {
    activeChips.push({
      id: 'search',
      label: `«${searchQuery.trim()}»`,
      clear: () => setSearchQuery(''),
    });
  }

  if (dateFrom || dateTo) {
    activeChips.push({
      id: 'period',
      label: `${dateFrom || '—'} — ${dateTo || '—'}`,
      clear: () => {
        setDateFrom('');
        setDateTo('');
      },
    });
  }

  if (categoryFilter !== 'all') {
    activeChips.push({
      id: 'category',
      label:
        categoryFilter === 'legal'
          ? 'Юридическое лицо'
          : 'Физическое лицо',
      clear: () => setCategoryFilter('all'),
    });
  }

  if (sourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: sourceFilter === 'telegram' ? 'Telegram-бот' : 'Веб-сервис',
      clear: () => setSourceFilter('all'),
    });
  }

  if (statusFilter !== 'all') {
    activeChips.push({
      id: 'status',
      label: statusFilter === 'success' ? 'Успешно' : 'Ошибка',
      clear: () => setStatusFilter('all'),
    });
  }

  if (sortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: 'Сначала старые',
      clear: () => setSortOrder('new'),
    });
  }

  const historyFiltersProps: HistoryFiltersProps = {
    searchQuery,
    onSearchChange: setSearchQuery,
    dateFrom,
    dateTo,
    onDateFromChange: setDateFrom,
    onDateToChange: setDateTo,
    categoryFilter,
    onCategoryFilterChange: setCategoryFilter,
    sourceFilter,
    onSourceFilterChange: setSourceFilter,
    statusFilter,
    onStatusFilterChange: setStatusFilter,
    sortOrder,
    onSortOrderChange: setSortOrder,
    openPanel,
    onTogglePanel: togglePanel,
    onClosePanels: () => setOpenPanel(null),
    activeChips,
    onReset: resetFilters,
  };

  return (
    <PageLayout>
      <PageSection
        title="История запросов"
        description="Все выполненные проверки из Telegram-бота и веб-сервиса «Trust Me»"
      >
        {/* Desktop: фильтры + отступ до списка */}
        <div className="hidden lg:mb-[60px] lg:block">
          <HistoryFilters {...historyFiltersProps} />
        </div>

        {/* Мобилка: кнопка «Фильтры» без раскрытия панели */}
        <div className="lg:hidden">
          <button
            type="button"
            className="mb-[40px] flex w-full min-h-14 items-center justify-center gap-3 rounded-[100px] border border-[#FDFEFF]/25 bg-[#1A1A1A] px-6 py-4 text-[14px] font-semibold text-[#FDFEFF]"
            aria-label="Фильтры"
            onClick={() => {
              setMobileFiltersOpen((v) => {
                const next = !v;
                if (!next) {
                  setOpenPanel(null);
                  setMobileOpenPanels({});
                }
                return next;
              });
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M2.5 1.5H16.5L11.5 8V17.5L7.5 13.5V8L2.5 1.5Z"
                stroke="#FDFEFF"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Фильтры</span>
          </button>
        </div>

        {/* Mobile: встроенные фильтры (между кнопкой и списком) */}
        {mobileFiltersOpen ? (
          <div className="mb-[40px] lg:hidden">
            <Card variant="history" className="rounded-[24px] bg-[#1A1A1A]">
              <div className="mb-6 grid grid-cols-[40px_1fr_auto] items-center gap-3">
                <button
                  type="button"
                  aria-label="Закрыть"
                  className="inline-flex h-10 w-10 items-center justify-center text-[#FDFEFF]"
                  onClick={() => {
                    setMobileFiltersOpen(false);
                    setOpenPanel(null);
                  }}
                >
                  ×
                </button>
                <div className="text-center text-[20px] font-semibold text-[#0EB8D2]">Фильтры</div>
                <button
                  type="button"
                  className="text-[16px] font-medium text-[#FDFEFF]"
                  onClick={resetFilters}
                >
                  Сбросить
                </button>
              </div>

              {/* Выбранные параметры (чипы) */}
              {activeChips.length ? (
                <div className="mb-6 flex flex-wrap gap-3">
                  {activeChips.map((chip) => (
                    <FilterChip
                      key={chip.id}
                      variant="applied"
                      onClick={chip.clear}
                      removeIcon={<span className="text-[#FDFEFF]">×</span>}
                      className="px-[20px] py-[10px] text-[14px]"
                    >
                      {chip.label}
                    </FilterChip>
                  ))}
                </div>
              ) : null}

              <HistoryFilters
                {...historyFiltersProps}
                showAppliedRow={false}
                panelLayout="static"
                onClosePanels={undefined}
                openPanels={mobileOpenPanels}
                onTogglePanelMulti={(panel) =>
                  setMobileOpenPanels((prev) => ({ ...prev, [panel]: !prev?.[panel] }))
                }
              />
            </Card>
          </div>
        ) : null}

        <div className="space-y-4 sm:space-y-5">
          {filteredAndSortedItems.map((item) => (
            <HistoryRequestCard
              item={item}
              key={`${item.name}-${item.checkedAt}`}
              onOpenReport={() => setOpenedReportItem(item)}
            />
          ))}
        </div>

        <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
      </PageSection>
    </PageLayout>
  );
}
