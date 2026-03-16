import { useState } from 'react';
import {
  HistoryFilters,
  HistoryReportModal,
  HistoryRequestCard,
  type HistoryCategoryFilter,
  type HistoryFilterPanel,
  type HistorySourceFilter,
  type HistoryStatusFilter,
} from '../../components/features/history';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageStructure } from '../../components/layout/PageStructure/PageStructure';
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

  const resetFilters = () => {
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
    setCategoryFilter('all');
    setSourceFilter('all');
    setStatusFilter('all');
    setSortOrder('new');
    setOpenPanel(null);
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
      label: `Поиск: «${searchQuery.trim()}»`,
      clear: () => setSearchQuery(''),
    });
  }

  if (dateFrom || dateTo) {
    activeChips.push({
      id: 'period',
      label: `Период: ${dateFrom || '—'} — ${dateTo || '—'}`,
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
          ? 'Категория: юридическое лицо'
          : 'Категория: физическое лицо',
      clear: () => setCategoryFilter('all'),
    });
  }

  if (sourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: sourceFilter === 'telegram' ? 'Источник: Telegram-бот' : 'Источник: веб-сервис',
      clear: () => setSourceFilter('all'),
    });
  }

  if (statusFilter !== 'all') {
    activeChips.push({
      id: 'status',
      label: statusFilter === 'success' ? 'Статус: успешно' : 'Статус: ошибка',
      clear: () => setStatusFilter('all'),
    });
  }

  if (sortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: 'Сортировка: сначала старые',
      clear: () => setSortOrder('new'),
    });
  }

  return (
    <PageLayout>
      <main className="pb-10 sm:pb-14">
        <PageStructure
          title="История запросов"
          description="Все выполненные проверки из Telegram-бота и веб-сервиса «Trust Me»"
        >
          <HistoryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            sourceFilter={sourceFilter}
            onSourceFilterChange={setSourceFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            openPanel={openPanel}
            onTogglePanel={togglePanel}
            activeChips={activeChips}
            onReset={resetFilters}
          />

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
        </PageStructure>
      </main>
    </PageLayout>
  );
}
