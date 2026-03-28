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
    {
      type: 'Юридическое лицо',
      name: 'ООО «ТЕХНОЛОГИИ БУДУЩЕГО»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7701234567',
      checkedAt: '15.03.2025, 14:20',
      duration: '3 минуты',
      source: 'telegram',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'ИВАНОВ СЕРГЕЙ ПЕТРОВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7709876543',
      birthDate: '22.05.1985',
      checkedAt: '10.03.2025, 11:15',
      duration: '4 минуты',
      source: 'web',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'АО «СИБИРСКИЕ РЕСУРСЫ»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 5401237890',
      checkedAt: '05.03.2025, 16:45',
      duration: '2 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'ПЕТРОВА АННА МИХАЙЛОВНА',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7704567890',
      birthDate: '14.08.1990',
      checkedAt: '01.03.2025, 09:00',
      duration: '1 минута',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «СТРОЙМАРКЕТ»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7707891234',
      checkedAt: '28.02.2025, 18:30',
      duration: '5 минут',
      source: 'web',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'СИДОРОВ ДМИТРИЙ АЛЕКСАНДРОВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7703216547',
      birthDate: '03.12.1978',
      checkedAt: '25.02.2025, 13:20',
      duration: '2 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ПАО «ФИНАНС ГРУПП»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 7709871234',
      checkedAt: '20.02.2025, 10:10',
      duration: '3 минуты',
      source: 'web',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'КУЗНЕЦОВА МАРИЯ ИВАНОВНА',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7706543210',
      birthDate: '19.07.1988',
      checkedAt: '15.02.2025, 15:45',
      duration: '4 минуты',
      source: 'telegram',
      success: false,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «АВТОЛОГИСТИКА»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7701478523',
      checkedAt: '10.02.2025, 08:30',
      duration: '1 минута',
      source: 'web',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'СМИРНОВ АНДРЕЙ ВЛАДИМИРОВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7703698521',
      birthDate: '30.01.1982',
      checkedAt: '05.02.2025, 12:00',
      duration: '2 минуты',
      source: 'telegram',
      success: true,
    },
    // Новые 12 карточек
    {
      type: 'Юридическое лицо',
      name: 'ООО «ПРОМТОРГСЕРВИС»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7720123456',
      checkedAt: '25.03.2025, 09:15',
      duration: '2 минуты',
      source: 'web',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'ВОЛКОВ АРТЕМ СЕРГЕЕВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7721122334',
      birthDate: '14.02.1989',
      checkedAt: '24.03.2025, 16:40',
      duration: '3 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «ЦИФРОВЫЕ РЕШЕНИЯ»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 7734567890',
      checkedAt: '23.03.2025, 11:25',
      duration: '1 минута',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'НОВИКОВА ЕЛЕНА ДМИТРИЕВНА',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7743216549',
      birthDate: '22.08.1992',
      checkedAt: '22.03.2025, 14:10',
      duration: '4 минуты',
      source: 'web',
      success: false,
    },
    {
      type: 'Юридическое лицо',
      name: 'АО «БАШНЕФТЬАГАЗ»',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 0278123456',
      checkedAt: '20.03.2025, 08:50',
      duration: '5 минут',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'МОРОЗОВ НИКОЛАЙ АНДРЕЕВИЧ',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 7722987654',
      birthDate: '05.11.1980',
      checkedAt: '18.03.2025, 19:30',
      duration: '2 минуты',
      source: 'web',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «ЭКОПРОДУКТ»',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7705566778',
      checkedAt: '15.03.2025, 13:15',
      duration: '3 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'ВАСИЛЬЕВА ОЛЬГА ПАВЛОВНА',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7711333444',
      birthDate: '18.06.1985',
      checkedAt: '12.03.2025, 10:45',
      duration: '1 минута',
      source: 'telegram',
      success: false,
    },
    {
      type: 'Юридическое лицо',
      name: 'ПАО «ТЯЖМАШ»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 6611223344',
      checkedAt: '10.03.2025, 17:20',
      duration: '4 минуты',
      source: 'web',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'АЛЕКСЕЕВ КИРИЛЛ МАКСИМОВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7755667788',
      birthDate: '30.09.1995',
      checkedAt: '08.03.2025, 12:00',
      duration: '2 минуты',
      source: 'web',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «ФИНАНСЛАЙН»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7709876541',
      checkedAt: '05.03.2025, 15:35',
      duration: '6 минут',
      source: 'telegram',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'ПОПОВ ДЕНИС СТАНИСЛАВОВИЧ',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 7788990011',
      birthDate: '12.04.1975',
      checkedAt: '01.03.2025, 09:50',
      duration: '3 минуты',
      source: 'telegram',
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

  // Состояние пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1); // Начало видимого окна (4 страницы)
  const ITEMS_PER_PAGE = 4;

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
    setCurrentPage(1);
    setWindowStart(1); // Сброс окна
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

  // Фильтрация (глобальная - ко всем элементам)
  const filteredItems = historyItems.filter((item) => {
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
  });

  // ПОРЯДОК КАК В КОНСТАНТАХ: убираем сортировку, оставляем исходный порядок
  // Если нужна сортировка, раскомментируйте блок ниже:
  /*
  const sortedItems = filteredItems.slice().sort((a, b) => {
    const aDate = parseHistoryDate(a.checkedAt);
    const bDate = parseHistoryDate(b.checkedAt);
    if (!aDate || !bDate) return 0;
    return sortOrder === 'new' ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime();
  });
  */
  const sortedItems = filteredItems; // Порядок как в константах

  // Пагинация: ровно 4 карточки на страницу
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Обработчик смены страницы со скроллом и логикой окна
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Скролл наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Логика "окна" пагинации (4 видимые страницы)
    if (totalPages <= 4) return;

    // Если кликнули на первую видимую страницу и можно двигаться назад
    if (page === windowStart && page > 1) {
      setWindowStart(Math.max(1, page - 3));
    }
    // Если кликнули на последнюю видимую (4-ю в окне) и можно двигаться вперед
    else if (page === windowStart + 3 && page < totalPages) {
      setWindowStart(Math.min(totalPages - 3, page));
    }
    // Если кликнули на страницу вне текущего окна (через ... или прыжок)
    else if (page < windowStart) {
      setWindowStart(Math.max(1, page - 3));
    }
    else if (page > windowStart + 3) {
      setWindowStart(Math.min(totalPages - 3, page));
    }
  };

  // Сброс на 1-ю страницу при изменении фильтров
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setCurrentPage(1);
    setWindowStart(1); // Сброс окна при фильтрации
  };

  const activeChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (searchQuery.trim()) {
    activeChips.push({
      id: 'search',
      label: `«${searchQuery.trim()}»`,
      clear: () => handleFilterChange(setSearchQuery, ''),
    });
  }

  if (dateFrom || dateTo) {
    activeChips.push({
      id: 'period',
      label: `${dateFrom || '—'} — ${dateTo || '—'}`,
      clear: () => {
        setDateFrom('');
        setDateTo('');
        setCurrentPage(1);
        setWindowStart(1);
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
      clear: () => handleFilterChange(setCategoryFilter, 'all'),
    });
  }

  if (sourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: sourceFilter === 'telegram' ? 'Telegram-бот' : 'Веб-сервис',
      clear: () => handleFilterChange(setSourceFilter, 'all'),
    });
  }

  if (statusFilter !== 'all') {
    activeChips.push({
      id: 'status',
      label: statusFilter === 'success' ? 'Успешно' : 'Ошибка',
      clear: () => handleFilterChange(setStatusFilter, 'all'),
    });
  }

  if (sortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: 'Сначала старые',
      clear: () => handleFilterChange(setSortOrder, 'new'),
    });
  }

  // Генерация номеров страниц с "окном" из 4 страниц
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      // Если страниц 4 или меньше — показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Окно из 4 страниц: [windowStart, windowStart+3]
    const start = windowStart;
    const end = Math.min(totalPages, start + 3);

    // Добавляем 1 и ... если окно не начинается с 1
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Добавляем 4 страницы из окна
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Добавляем ... и последнюю если окно не заканчивается на последней
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const historyFiltersProps: HistoryFiltersProps = {
    searchQuery,
    onSearchChange: (val: string) => handleFilterChange(setSearchQuery, val),
    dateFrom,
    dateTo,
    onDateFromChange: (val: string) => {
      setDateFrom(val);
      setCurrentPage(1);
      setWindowStart(1);
    },
    onDateToChange: (val: string) => {
      setDateTo(val);
      setCurrentPage(1);
      setWindowStart(1);
    },
    categoryFilter,
    onCategoryFilterChange: (val: HistoryCategoryFilter) => handleFilterChange(setCategoryFilter, val),
    sourceFilter,
    onSourceFilterChange: (val: HistorySourceFilter) => handleFilterChange(setSourceFilter, val),
    statusFilter,
    onStatusFilterChange: (val: HistoryStatusFilter) => handleFilterChange(setStatusFilter, val),
    sortOrder,
    onSortOrderChange: (val: 'new' | 'old') => handleFilterChange(setSortOrder, val),
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

        {/* Mobile: встроенные фильтры */}
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

        {/* Список карточек (пагинированный, ровно 4 штуки) */}
        <div className="space-y-4 sm:space-y-5">
          {paginatedItems.map((item, index) => (
            <HistoryRequestCard
              item={item}
              key={`${item.name}-${item.checkedAt}-${index}`}
              onOpenReport={() => setOpenedReportItem(item)}
            />
          ))}
        </div>

        {/* Пагинация с оконной логикой */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                type="button"
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
                className={`
                  inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border text-sm sm:text-base font-medium transition-colors
                  ${page === currentPage
                    ? 'border-[#FDFEFF] bg-[#FDFEFF]/10 text-[#FDFEFF]'
                    : page === '...'
                      ? 'border-transparent text-[#FDFEFF]/50 cursor-default'
                      : 'border-[#FDFEFF]/25 text-[#FDFEFF] hover:border-[#FDFEFF]/50 hover:bg-[#FDFEFF]/5'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
      </PageSection>
    </PageLayout>
  );
}
