import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  containerClassName,
  cardClassName,
} from '../../shared/constants';
import { ReportActions } from '../../components/features/ReportActions';
import { AppliedFiltersRow, DateRangePanel, SingleChoicePanel } from '../../components/features/filters';
import { FilterTrigger, Input, ModalShell, SourceBadge } from '../../components/ui';
import { type HistoryItem, ReportContent } from '../../shared/ReportContent';
import { PageTitle } from '../../shared/ui';
import { SuccessStatusIcon, ErrorStatusIcon } from '../../shared/icons';

type HistoryCategoryFilter = 'all' | 'legal' | 'individual';
type HistorySourceFilter = 'all' | 'telegram' | 'web';
type HistoryStatusFilter = 'all' | 'success' | 'error';
type HistoryFilterPanel = 'period' | 'category' | 'source' | 'status' | null;

function HistoryRequestCard({ item, onOpenReport }: { item: HistoryItem; onOpenReport?: () => void }) {
  return (
    <article className={`${cardClassName} p-4 sm:p-5`}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex min-h-9 items-center rounded-full border border-white/40 px-3 text-sm text-white/85">
            {item.type}
          </span>
          <div className="mt-4 flex items-center gap-2">
            <h3 className="text-[24px] leading-[1.1] font-semibold uppercase text-white sm:text-[30px]">{item.name}</h3>
            <span className={`h-2.5 w-2.5 rounded-full ${item.dotColor}`} />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-start">
          <SourceBadge source={item.source} />
          {item.success ? <SuccessStatusIcon /> : <ErrorStatusIcon />}
        </div>
      </div>

      <div className="grid gap-4 text-sm text-white/80 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="mb-2 text-white/45">Документ</p>
          <p className="m-0">{item.document}</p>
        </div>
        {item.birthDate ? (
          <div>
            <p className="mb-2 text-white/45">Дата рождения</p>
            <p className="m-0">{item.birthDate}</p>
          </div>
        ) : null}
        <div>
          <p className="mb-2 text-white/45">Дата и время проверки</p>
          <p className="m-0">{item.checkedAt}</p>
        </div>
        <div>
          <p className="mb-2 text-white/45">Длительность проверки</p>
          <p className="m-0">{item.duration}</p>
        </div>
      </div>

      <ReportActions onOpen={onOpenReport} showDelete />
    </article>
  );
}

function HistoryReportModal({ item, onClose }: { item: HistoryItem; onClose: () => void }) {
  return (
    <ModalShell open={!!item} onClose={onClose} size="xl" panelClassName="flex h-full max-h-[90vh] flex-col">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute right-5 top-4 z-10 text-xl text-white/70 transition hover:text-white"
        onClick={onClose}
      >
        ×
      </button>
      <div className="flex-1 overflow-y-auto">
        <ReportContent item={item} />
      </div>
    </ModalShell>
  );
}

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
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="История запросов"
            description="Все выполненные проверки из Telegram-бота и веб-сервиса «Trust Me»"
          />

          <div className="mb-4 grid gap-3 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
            <label className="flex h-12 items-center justify-between rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] gap-3 px-4 text-sm text-white/55">
              <span className="text-white/35">⌕</span>
              <Input
                className="h-auto border-0 bg-transparent px-0 text-sm"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <FilterTrigger label="Период" active={openPanel === 'period'} onClick={() => togglePanel('period')} />
            <FilterTrigger label="Категория" active={openPanel === 'category'} onClick={() => togglePanel('category')} />
            <FilterTrigger label="Источник" active={openPanel === 'source'} onClick={() => togglePanel('source')} />
            <FilterTrigger label="Статус" active={openPanel === 'status'} onClick={() => togglePanel('status')} />
          </div>

          {openPanel === 'period' ? (
            <div className="mb-5 rounded-[28px] border border-white/85 bg-[#151515]/95 p-4 sm:p-5">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <DateRangePanel
                  title="Период"
                  fromValue={dateFrom}
                  toValue={dateTo}
                  onFromChange={setDateFrom}
                  onToChange={setDateTo}
                />

                <div className="space-y-3 text-sm text-white/85">
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-white/50">
                    Сортировка
                  </p>
                  <div className="space-y-2">
                    <SingleChoicePanel
                      title="Сортировка"
                      value={sortOrder}
                      options={[
                        { value: 'new', label: 'Сначала новые' },
                        { value: 'old', label: 'Сначала старые' },
                      ]}
                      onChange={setSortOrder}
                    />
                  </div>
                </div>
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
              onChange={setCategoryFilter}
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
              onChange={setSourceFilter}
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
              onChange={setStatusFilter}
            />
          ) : null}

          <AppliedFiltersRow filters={activeChips} onReset={resetFilters} />

          <div className="space-y-4 sm:space-y-5">
            {filteredAndSortedItems.map((item) => (
              <HistoryRequestCard
                item={item}
                key={`${item.name}-${item.checkedAt}`}
                onOpenReport={() => setOpenedReportItem(item)}
              />
            ))}
          </div>

          {openedReportItem ? (
            <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
          ) : null}
        </section>
      </main>
    </PageLayout>
  );
}
