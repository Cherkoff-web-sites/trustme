import { useEffect, useRef, useState } from 'react';
import {
  BalanceFilters,
  TransactionTable,
  type TransactionRow,
  type BalanceFilterPanel,
  type BalanceFilterPanelKey,
  type BalanceFiltersProps,
  type BalanceSortOrder,
  type BalanceSourceFilter,
  type BalanceTypeFilter,
} from '../../components/features/balance';
import { listTransactions, topupBalance } from '../../api/balance';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { useAuth } from '../../context/AuthContext';
import { Button, Card, CardHeaderDecorDivider, FilterChip, designTokens } from '../../components/ui';
import { formatPeriodFilterChipLabel } from '../../lib/dateDisplayFormat';
import { mapTransactionToRow } from '../../lib/apiMappers';
import { combineStyles } from '../../lib/combineStyles';
import walletSvg from '../../assets/icons/wallet.svg';
import telegramSvg from '../../assets/icons/telegram.svg';
import websiteOnDashboardSvg from '../../assets/icons/website_on_dashboard.svg';

export function BalancePage() {
  const { accessToken, user, refreshUser } = useAuth();
  const [operations, setOperations] = useState<TransactionRow[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('form');
  const waitingTimerRef = useRef<number | null>(null);

  const [balanceDateFrom, setBalanceDateFrom] = useState('');
  const [balanceDateTo, setBalanceDateTo] = useState('');
  const [balanceSortOrder, setBalanceSortOrder] = useState<BalanceSortOrder>('new');
  const [balanceSortOrderTouched, setBalanceSortOrderTouched] = useState(false);
  const [balanceTypeFilter, setBalanceTypeFilter] = useState<BalanceTypeFilter>('all');
  const [balanceSourceFilter, setBalanceSourceFilter] = useState<BalanceSourceFilter>('all');
  const [balanceOpenPanel, setBalanceOpenPanel] = useState<BalanceFilterPanel>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileOpenPanels, setMobileOpenPanels] = useState<Partial<Record<BalanceFilterPanelKey, boolean>>>({});

  const handleOpenTopUp = () => {
    setTopUpStep('form');
    setTopUpAmount('');
    setShowTopUpModal(true);
  };

  const handleCloseTopUp = () => {
    setShowTopUpModal(false);
    setTopUpStep('form');
    if (waitingTimerRef.current) {
      window.clearTimeout(waitingTimerRef.current);
      waitingTimerRef.current = null;
    }
  };

  const handleTopUpContinue = () => {
    const numericAmount = Number(topUpAmount.replace(/\s/g, ''));
    if (!numericAmount || numericAmount < 100 || numericAmount > 100000) {
      return;
    }
    setTopUpStep('processing');
  };

  const handleTopUpPay = async () => {
    if (!accessToken) return;
    setTopUpStep('waiting');
    try {
      await topupBalance({ amount: Number(topUpAmount.replace(/\D/g, '')) }, accessToken);
      await refreshUser();
      const items = await listTransactions(accessToken);
      setOperations(items.map(mapTransactionToRow));
      setTopUpStep('success');
    } catch {
      setTopUpStep('processing');
    }
  };

  const handleTopUpBack = () => {
    setTopUpStep('form');
  };

  useEffect(() => {
    return () => {
      if (waitingTimerRef.current) {
        window.clearTimeout(waitingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    setTransactionsLoading(true);
    listTransactions(accessToken)
      .then((items) => {
        if (cancelled) return;
        setOperations(items.map(mapTransactionToRow));
      })
      .catch(() => {
        if (cancelled) return;
      })
      .finally(() => {
        if (!cancelled) setTransactionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const toggleBalancePanel = (panel: BalanceFilterPanel) => {
    setBalanceOpenPanel((current) => (current === panel ? null : panel));
  };

  const resetBalanceFilters = () => {
    setBalanceDateFrom('');
    setBalanceDateTo('');
    setBalanceSortOrder('new');
    setBalanceSortOrderTouched(false);
    setBalanceTypeFilter('all');
    setBalanceSourceFilter('all');
    setBalanceOpenPanel(null);
    setMobileFiltersOpen(false);
    setMobileOpenPanels({});
  };

  const parseBalanceDate = (value: string) => {
    const parts = value.split('.').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const parseBalanceInputDate = (value: string) => {
    if (!value) return null;
    const parts = value.split('-').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const balanceFromDate = parseBalanceInputDate(balanceDateFrom);
  const balanceToDate = parseBalanceInputDate(balanceDateTo);

  const filteredOperations = operations
    .filter((operation) => {
      const opDate = parseBalanceDate(operation.date);
      if (opDate) {
        if (balanceFromDate && opDate < balanceFromDate) return false;
        if (balanceToDate && opDate > balanceToDate) return false;
      }

      if (balanceTypeFilter === 'income' && operation.type !== 'Поступление') return false;
      if (balanceTypeFilter === 'expense' && operation.type !== 'Списание') return false;

      if (balanceSourceFilter !== 'all' && operation.source !== balanceSourceFilter) return false;

      return true;
    })
    .slice()
    .sort((a, b) => {
      const aDate = parseBalanceDate(a.date);
      const bDate = parseBalanceDate(b.date);
      if (!aDate || !bDate) return 0;
      return balanceSortOrder === 'new'
        ? bDate.getTime() - aDate.getTime()
        : aDate.getTime() - bDate.getTime();
    });

  const activeChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (balanceDateFrom || balanceDateTo) {
    const periodLabel = formatPeriodFilterChipLabel(balanceDateFrom, balanceDateTo);
    if (periodLabel) {
      activeChips.push({
        id: 'period',
        label: periodLabel,
        clear: () => {
          setBalanceDateFrom('');
          setBalanceDateTo('');
        },
      });
    }
  }

  if (balanceSortOrderTouched || balanceSortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: balanceSortOrder === 'new' ? 'Сначала новые' : 'Сначала старые',
      clear: () => {
        setBalanceSortOrder('new');
        setBalanceSortOrderTouched(false);
      },
    });
  }

  if (balanceTypeFilter !== 'all') {
    activeChips.push({
      id: 'type',
      label:
        balanceTypeFilter === 'income'
          ? 'Поступления'
          : 'Списания',
      clear: () => setBalanceTypeFilter('all'),
    });
  }

  if (balanceSourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: balanceSourceFilter === 'telegram' ? 'Telegram-бот' : 'Веб-сервис',
      clear: () => setBalanceSourceFilter('all'),
    });
  }

  const balanceFiltersProps: BalanceFiltersProps = {
    openPanel: balanceOpenPanel,
    onTogglePanel: toggleBalancePanel,
    dateFrom: balanceDateFrom,
    dateTo: balanceDateTo,
    onDateFromChange: setBalanceDateFrom,
    onDateToChange: setBalanceDateTo,
    sortOrder: balanceSortOrder,
    onSortOrderChange: (val: BalanceSortOrder) => {
      setBalanceSortOrderTouched(true);
      setBalanceSortOrder(val);
    },
    typeFilter: balanceTypeFilter,
    onTypeFilterChange: setBalanceTypeFilter,
    sourceFilter: balanceSourceFilter,
    onSourceFilterChange: setBalanceSourceFilter,
    onClosePanels: () => setBalanceOpenPanel(null),
    activeChips,
    onReset: resetBalanceFilters,
  };

  return (
    <PageLayout>
      <PageSection
        title="Баланс"
        description="Управляйте балансом аккаунта и отслеживайте историю финансовых операций"
      >
        <Card title="Текущий баланс" headerDecor={<CardHeaderDecorDivider />}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-[10px] lg:gap-[15px] text-[18px] lg:text-[36px] font-semibold text-white">
                <img src={walletSvg} alt="" className="h-auto w-[20px] lg:w-[30px]" />
                <span>{user ? `${user.balance.toLocaleString('ru-RU')} ₽` : '—'}</span>
              </div>
              <p
                className={combineStyles(
                  'mt-4 hidden lg:block',
                  designTokens.typography.body,
                  designTokens.colors.text.primary,
                )}
              >
                Используется для списаний по операциям сервиса согласно текущему тарифу
              </p>
            </div>

            <Button className="min-w-[180px] lg:px-[60px]" onClick={handleOpenTopUp}>
              Пополнить
            </Button>

            <p
              className={combineStyles(
                'lg:hidden',
                designTokens.typography.body,
                designTokens.colors.text.primary,
              )}
            >
              Используется для списаний по операциям сервиса согласно текущему тарифу
            </p>
          </div>
        </Card>
      </PageSection>

      <PageSection
        title="История операций"
        description="Вы можете отслеживать историю операций на вашем аккаунте, выбрав нужные данные"
      >
        {/* Desktop: фильтры + отступ до таблицы / списка */}
        <div className="hidden lg:mb-[60px] lg:block">
          <BalanceFilters {...balanceFiltersProps} />
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="mb-[40px] flex w-full min-h-14 items-center justify-center gap-3 rounded-[100px] border border-[#FDFEFF]/25 bg-[#1A1A1A] px-6 py-4 text-[14px] font-semibold text-[#FDFEFF]"
            aria-label="Фильтры"
            onClick={() => {
              setMobileFiltersOpen((v) => {
                const next = !v;
                if (!next) {
                  setBalanceOpenPanel(null);
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
                    setBalanceOpenPanel(null);
                    setMobileOpenPanels({});
                  }}
                >
                  ×
                </button>
                <div className="text-center text-[20px] font-semibold text-[#0EB8D2]">Фильтры</div>
                <button type="button" className="text-[16px] font-medium text-[#FDFEFF]" onClick={resetBalanceFilters}>
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

              <BalanceFilters
                {...balanceFiltersProps}
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

        <Card className="hidden lg:block" variant="dashboard">
          {transactionsLoading ? (
            <p className="m-0 text-center text-[#FDFEFF]">Загружаем операции...</p>
          ) : filteredOperations.length === 0 ? (
            <p className="m-0 text-center text-[#FDFEFF]">Операции не найдены.</p>
          ) : (
            <TransactionTable operations={filteredOperations} />
          )}
        </Card>

        <Card className="lg:hidden">
          {transactionsLoading ? (
            <p className="m-0 text-center text-[#FDFEFF]">Загружаем операции...</p>
          ) : filteredOperations.length === 0 ? (
            <p className="m-0 text-center text-[#FDFEFF]">Операции не найдены.</p>
          ) : (
          <div className="flex flex-col gap-[20px]">
            {filteredOperations.map((operation) => {
              const isTelegram = operation.source === 'telegram';
              const typeColorClass =
                operation.type === 'Списание'
                  ? designTokens.colors.text.statusError
                  : designTokens.colors.text.statusSuccess;

              return (
                <Card
                  key={`${operation.date}-${operation.type}-${operation.source}`}
                  as="article"
                  className="px-[30px]"
                  variant="history"
                >
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[16px] leading-[1.2] text-[#FDFEFF]">{operation.date}</span>
                        <span className={combineStyles('text-[16px] leading-[1.2] font-medium', typeColorClass)}>
                          {operation.type}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-[10px] text-[16px] leading-[1.2] text-[#FDFEFF]">
                          {isTelegram ? (
                            <img src={telegramSvg} alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                          ) : (
                            <img
                              src={websiteOnDashboardSvg}
                              alt=""
                              className="h-[22px] w-[22px]"
                              width={22}
                              height={22}
                            />
                          )}
                          <span>{operation.source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span>
                        </div>
                        <span className="text-[16px] leading-[1.2] font-semibold text-[#FDFEFF]">{operation.amount}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          )}
        </Card>
      </PageSection>

      <BalanceTopUpModal
        open={showTopUpModal}
        step={topUpStep}
        amount={topUpAmount}
        onAmountChange={setTopUpAmount}
        onChipSelect={(value) => setTopUpAmount(String(value))}
        onContinue={handleTopUpContinue}
        onPay={handleTopUpPay}
        onBack={handleTopUpBack}
        onClose={handleCloseTopUp}
      />
    </PageLayout>
  );
}
