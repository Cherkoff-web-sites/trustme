import { useState } from 'react';
import {
  BalanceFilters,
  TransactionTable,
  type BalanceFilterPanel,
  type BalanceSourceFilter,
  type BalanceTypeFilter,
} from '../../components/features/balance';
import { PageLayout } from '../../components/layout/PageLayout';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { Button, PageTitle, uiTokens } from '../../components/ui';

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

  const filteredOperations = operations.filter((operation) => {
    const opDate = parseBalanceDate(operation.date);
    if (opDate) {
      if (balanceFromDate && opDate < balanceFromDate) return false;
      if (balanceToDate && opDate > balanceToDate) return false;
    }

    if (balanceTypeFilter === 'income' && operation.type !== 'Поступление') return false;
    if (balanceTypeFilter === 'expense' && operation.type !== 'Списание') return false;

    if (balanceSourceFilter !== 'all' && operation.source !== balanceSourceFilter) return false;

    return true;
  });

  const balanceChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (balanceDateFrom || balanceDateTo) {
    balanceChips.push({
      id: 'period',
      label: `Период: ${balanceDateFrom || '—'} — ${balanceDateTo || '—'}`,
      clear: () => {
        setBalanceDateFrom('');
        setBalanceDateTo('');
      },
    });
  }

  if (balanceTypeFilter !== 'all') {
    balanceChips.push({
      id: 'type',
      label:
        balanceTypeFilter === 'income'
          ? 'Тип: поступления'
          : 'Тип: списания',
      clear: () => setBalanceTypeFilter('all'),
    });
  }

  if (balanceSourceFilter !== 'all') {
    balanceChips.push({
      id: 'source',
      label: balanceSourceFilter === 'telegram' ? 'Источник: Telegram-бот' : 'Источник: веб-сервис',
      clear: () => setBalanceSourceFilter('all'),
    });
  }

  return (
    <PageLayout>
      <main className={`${uiTokens.container} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="Баланс"
            description="Управляйте балансом аккаунта и отслеживайте историю финансовых операций"
          />

          <section className={`${uiTokens.card} p-4 sm:p-6`}>
            <h2 className="mb-4 text-[24px] font-semibold text-white">Текущий баланс</h2>
            <div className="mb-6 h-px w-full bg-white/15" />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3 text-[34px] leading-[0.95] font-semibold text-white sm:text-[56px]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-lg text-[#151515] sm:h-10 sm:w-10">
                    •
                  </span>
                  <span>100 ₽</span>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Используется для списаний по операциям сервиса согласно текущему тарифу
                </p>
              </div>

              <Button className="min-w-[180px]" onClick={handleOpenTopUp}>
                Пополнить
              </Button>
            </div>
          </section>
        </section>

        <section className="pt-14 sm:pt-20">
          <PageTitle
            title="История операций"
            description="Вы можете отслеживать историю операций на вашем аккаунте, выбрав нужные данные"
          />

          <BalanceFilters
            openPanel={balanceOpenPanel}
            onTogglePanel={toggleBalancePanel}
            dateFrom={balanceDateFrom}
            dateTo={balanceDateTo}
            onDateFromChange={setBalanceDateFrom}
            onDateToChange={setBalanceDateTo}
            typeFilter={balanceTypeFilter}
            onTypeFilterChange={setBalanceTypeFilter}
            sourceFilter={balanceSourceFilter}
            onSourceFilterChange={setBalanceSourceFilter}
            chips={balanceChips}
            onReset={resetBalanceFilters}
          />

          <section className={`${uiTokens.card} overflow-hidden p-4 sm:p-6`}>
            <TransactionTable operations={filteredOperations} />
          </section>
        </section>

        <BalanceTopUpModal
          open={showTopUpModal}
          step={topUpStep}
          amount={topUpAmount}
          onAmountChange={setTopUpAmount}
          onChipSelect={(value) => setTopUpAmount(String(value))}
          onContinue={handleTopUpContinue}
          onClose={handleCloseTopUp}
        />
      </main>
    </PageLayout>
  );
}
