import { useState } from 'react';
import {
  BalanceFilters,
  TransactionTable,
  type BalanceFilterPanel,
  type BalanceFiltersProps,
  type BalanceSortOrder,
  type BalanceSourceFilter,
  type BalanceTypeFilter,
} from '../../components/features/balance';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { Button, Card, designTokens } from '../../components/ui';
import { combineStyles } from '../../lib/combineStyles';
import { TelegramSmallIcon } from '../../shared/icons';
import walletSvg from '../../assets/icons/wallet.svg';
import websiteHistorySvg from '../../assets/icons/website_on_history.svg';

type BalanceOperation = {
  date: string;
  type: 'Поступление' | 'Списание';
  source: 'telegram' | 'web';
  amount: string;
};

export function BalancePage() {
  const operations: BalanceOperation[] = [
    { date: '23.12.2025', type: 'Поступление', source: 'telegram', amount: '1000 ₽' },
    { date: '23.10.2025', type: 'Поступление', source: 'web', amount: '2000 ₽' },
    { date: '23.09.2025', type: 'Списание', source: 'telegram', amount: '1000 ₽' },
    { date: '23.09.2024', type: 'Списание', source: 'web', amount: '2000 ₽' },
  ];

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('300');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('form');

  const [balanceDateFrom, setBalanceDateFrom] = useState('');
  const [balanceDateTo, setBalanceDateTo] = useState('');
  const [balanceSortOrder, setBalanceSortOrder] = useState<BalanceSortOrder>('new');
  const [balanceTypeFilter, setBalanceTypeFilter] = useState<BalanceTypeFilter>('all');
  const [balanceSourceFilter, setBalanceSourceFilter] = useState<BalanceSourceFilter>('all');
  const [balanceOpenPanel, setBalanceOpenPanel] = useState<BalanceFilterPanel>(null);

  const handleOpenTopUp = () => {
    setTopUpStep('form');
    setShowTopUpModal(true);
  };

  const handleCloseTopUp = () => {
    setShowTopUpModal(false);
  };

  const handleTopUpContinue = () => {
    const numericAmount = Number(topUpAmount.replace(/\s/g, ''));
    if (!numericAmount || numericAmount < 100 || numericAmount > 100000) {
      return;
    }
    setTopUpStep('waiting');
    window.setTimeout(() => {
      setTopUpStep('processing');
    }, 1200);
  };

  const toggleBalancePanel = (panel: BalanceFilterPanel) => {
    setBalanceOpenPanel((current) => (current === panel ? null : panel));
  };

  const resetBalanceFilters = () => {
    setBalanceDateFrom('');
    setBalanceDateTo('');
    setBalanceSortOrder('new');
    setBalanceTypeFilter('all');
    setBalanceSourceFilter('all');
    setBalanceOpenPanel(null);
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
    activeChips.push({
      id: 'period',
      label: `Период: ${balanceDateFrom || '—'} — ${balanceDateTo || '—'}`,
      clear: () => {
        setBalanceDateFrom('');
        setBalanceDateTo('');
      },
    });
  }

  if (balanceSortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: 'Сортировка: сначала старые',
      clear: () => setBalanceSortOrder('new'),
    });
  }

  if (balanceTypeFilter !== 'all') {
    activeChips.push({
      id: 'type',
      label:
        balanceTypeFilter === 'income'
          ? 'Тип: поступления'
          : 'Тип: списания',
      clear: () => setBalanceTypeFilter('all'),
    });
  }

  if (balanceSourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: balanceSourceFilter === 'telegram' ? 'Источник: Telegram-бот' : 'Источник: веб-сервис',
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
    onSortOrderChange: setBalanceSortOrder,
    typeFilter: balanceTypeFilter,
    onTypeFilterChange: setBalanceTypeFilter,
    sourceFilter: balanceSourceFilter,
    onSourceFilterChange: setBalanceSourceFilter,
    activeChips,
    onReset: resetBalanceFilters,
  };

  return (
    <PageLayout>
      <PageSection
        title="Баланс"
        description="Управляйте балансом аккаунта и отслеживайте историю финансовых операций"
      >
        <Card>
          <h3
            className={combineStyles(
              designTokens.typography.h3,
              designTokens.colors.text.primary,
            )}
          >
            Текущий баланс
          </h3>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-[18px] lg:text-[36px] font-semibold text-white sm:text-[56px]">
                <img src={walletSvg} alt="" className="h-auto w-[20px] sm:h-12 sm:w-12" />
                <span>100 ₽</span>
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

            <Button className="min-w-[180px]" onClick={handleOpenTopUp}>
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

        <Card className="hidden overflow-hidden p-4 sm:p-6 lg:block">
          <TransactionTable operations={filteredOperations} />
        </Card>

        <Card className="lg:hidden">
          <div className="flex flex-col gap-[20px]">
            {filteredOperations.map((operation) => {
              const isTelegram = operation.source === 'telegram';
              const operationTypeClass =
                operation.type === 'Списание' ? 'text-[#FF7A7A]' : 'text-[#77D877]';

              return (
                <Card
                  key={`${operation.date}-${operation.type}-${operation.source}`}
                  as="article"
                  className="px-[30px]"
                  variant="history"
                >
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[16px] leading-[1.2] text-[#FDFEFF]">{operation.date}</span>
                      <div className="flex items-center gap-2 text-[16px] leading-[1.2] text-[#FDFEFF]">
                        {isTelegram ? (
                          <TelegramSmallIcon className="h-[18px] w-[18px]" />
                        ) : (
                          <img src={websiteHistorySvg} alt="" className="h-auto w-[18px]" width={18} height={18} />
                        )}
                        <span>{operation.source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className={combineStyles('text-[16px] leading-[1.2] font-semibold', operationTypeClass)}>
                        {operation.type}
                      </span>
                      <span className="text-[16px] leading-[1.2] font-semibold text-[#FDFEFF]">{operation.amount}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </PageSection>

      <BalanceTopUpModal
        open={showTopUpModal}
        step={topUpStep}
        amount={topUpAmount}
        onAmountChange={setTopUpAmount}
        onChipSelect={(value) => setTopUpAmount(String(value))}
        onContinue={handleTopUpContinue}
        onClose={handleCloseTopUp}
      />
    </PageLayout>
  );
}
