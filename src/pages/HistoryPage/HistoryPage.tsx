import { useEffect, useRef, useState } from 'react';
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
import { getReportById, listReports } from '../../api/reports';
import { useAuth } from '../../context/AuthContext';
import { formatPeriodFilterChipLabel } from '../../lib/dateDisplayFormat';
import { mapReportToHistoryItem } from '../../lib/apiMappers';
import { type HistoryItem } from '../../shared/ReportContent';

export function HistoryPage() {
  const { accessToken } = useAuth();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /** Черновик в поле «Поиск»; фильтр и чип — только `appliedSearch` после blur / выбора подсказки. */
  const [searchDraft, setSearchDraft] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const searchDraftRef = useRef(searchDraft);
  searchDraftRef.current = searchDraft;
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<HistoryCategoryFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<HistorySourceFilter>('all');
  const [statusFilter, setStatusFilter] = useState<HistoryStatusFilter>('all');
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');
  const [sortOrderTouched, setSortOrderTouched] = useState(false);
  const [openPanel, setOpenPanel] = useState<HistoryFilterPanel>(null);
  const [openedReportItem, setOpenedReportItem] = useState<HistoryItem | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileOpenPanels, setMobileOpenPanels] = useState<Partial<Record<HistoryFilterPanelKey, boolean>>>({});

  const handleOpenReport = async (item: HistoryItem) => {
    if (!accessToken || !item.id) {
      setOpenedReportItem(item);
      return;
    }
    try {
      const report = await getReportById(item.id, accessToken);
      setOpenedReportItem(mapReportToHistoryItem(report));
    } catch {
      setOpenedReportItem(item);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    setIsLoading(true);
    listReports({}, accessToken)
      .then((reports) => {
        if (cancelled) return;
        setHistoryItems(reports.map(mapReportToHistoryItem));
      })
      .catch(() => {
        if (cancelled) return;
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  // Состояние пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1); // Начало видимого окна (4 страницы)
  const ITEMS_PER_PAGE = 4;

  const resetFilters = () => {
    setSearchDraft('');
    setAppliedSearch('');
    setDateFrom('');
    setDateTo('');
    setCategoryFilter('all');
    setSourceFilter('all');
    setStatusFilter('all');
    setSortOrder('new');
    setSortOrderTouched(false);
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
    const query = appliedSearch.trim().toLowerCase();
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

  const sortedItems = filteredItems.slice().sort((a, b) => {
    const aDate = parseHistoryDate(a.checkedAt);
    const bDate = parseHistoryDate(b.checkedAt);
    if (!aDate || !bDate) return 0;
    return sortOrder === 'new' ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime();
  });

  // Пагинация: ровно 4 карточки на страницу
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const maxPage = Math.max(1, totalPages);
    setCurrentPage((p) => Math.min(p, maxPage));
  }, [totalPages]);

  const handleDeleteHistoryItem = (item: HistoryItem) => {
    setHistoryItems((prev) => prev.filter((x) => x !== item));
    setOpenedReportItem((open) => (open === item ? null : open));
  };

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

  if (appliedSearch.trim()) {
    activeChips.push({
      id: 'search',
      label: `«${appliedSearch.trim()}»`,
      clear: () => {
        setSearchDraft('');
        setAppliedSearch('');
        setCurrentPage(1);
        setWindowStart(1);
      },
    });
  }

  if (dateFrom || dateTo) {
    const periodLabel = formatPeriodFilterChipLabel(dateFrom, dateTo);
    if (periodLabel) {
      activeChips.push({
        id: 'period',
        label: periodLabel,
        clear: () => {
          setDateFrom('');
          setDateTo('');
          setCurrentPage(1);
          setWindowStart(1);
        },
      });
    }
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

  if (sortOrderTouched || sortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: sortOrder === 'new' ? 'Сначала новые' : 'Сначала старые',
      clear: () => {
        setSortOrder('new');
        setSortOrderTouched(false);
      },
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

  const searchCandidates = Array.from(
    new Set(historyItems.flatMap((it) => [it.name, it.document].filter((s): s is string => Boolean(s?.trim())))),
  );

  const applySearch = (explicit?: string) => {
    const raw = (explicit !== undefined ? String(explicit) : searchDraftRef.current).trim();
    const prev = appliedSearch.trim();
    searchDraftRef.current = raw;
    setSearchDraft(raw);
    setAppliedSearch(raw);
    if (raw !== prev) {
      setCurrentPage(1);
      setWindowStart(1);
    }
    if (explicit !== undefined) {
      setOpenPanel(null);
      setMobileOpenPanels((p) => ({ ...p, search: false }));
    }
  };

  const historyFiltersProps: HistoryFiltersProps = {
    searchQuery: searchDraft,
    onSearchChange: setSearchDraft,
    onSearchApply: applySearch,
    searchCandidates,
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
    onSortOrderChange: (val: 'new' | 'old') => {
      setSortOrderTouched(true);
      handleFilterChange(setSortOrder, val);
    },
    openPanel,
    onTogglePanel: togglePanel,
    onClosePanels: () => setOpenPanel(null),
    onSearchPanelEnsureOpen: () => setMobileOpenPanels((p) => ({ ...p, search: true })),
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

        {isLoading ? (
          <Card variant="history">
            <p className="m-0 text-center text-[#FDFEFF]">Загружаем историю отчётов...</p>
          </Card>
        ) : null}

        {/* Список карточек (пагинированный, ровно 4 штуки) */}
        <div className="space-y-4 sm:space-y-5">
          {paginatedItems.map((item) => (
            <HistoryRequestCard
              item={item}
              key={`${item.name}\u0000${item.checkedAt}\u0000${item.document}`}
              onOpenReport={() => void handleOpenReport(item)}
              onDelete={() => handleDeleteHistoryItem(item)}
            />
          ))}
        </div>

        {!isLoading && paginatedItems.length === 0 ? (
          <Card variant="history">
            <p className="m-0 text-center text-[#FDFEFF]">По выбранным фильтрам отчёты не найдены.</p>
          </Card>
        ) : null}

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
