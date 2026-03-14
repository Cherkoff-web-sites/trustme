import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { containerClassName } from '../../shared/constants';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { AppliedFiltersRow, DateRangePanel, SingleChoicePanel } from '../../components/features/filters';
import { cardClassName } from '../../shared/constants';
import { Button, FilterTrigger, SourceBadge } from '../../components/ui';
import { PageTitle } from '../../shared/ui';

type BalanceOperation = {
  date: string;
  type: 'Поступление' | 'Списание';
  source: 'telegram' | 'web';
  amount: string;
};

type BalanceTypeFilter = 'all' | 'income' | 'expense';
type BalanceSourceFilter = 'all' | 'telegram' | 'web';
type BalanceFilterPanel = 'period' | 'type' | 'source' | null;

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
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="Баланс"
            description="Управляйте балансом аккаунта и отслеживайте историю финансовых операций"
          />

          <section className={`${cardClassName} p-4 sm:p-6`}>
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

          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
            <FilterTrigger minWidth="md" label="Период" active={balanceOpenPanel === 'period'} onClick={() => toggleBalancePanel('period')} />
            <FilterTrigger minWidth="md" label="Тип операции" active={balanceOpenPanel === 'type'} onClick={() => toggleBalancePanel('type')} />
            <FilterTrigger minWidth="md" label="Источник" active={balanceOpenPanel === 'source'} onClick={() => toggleBalancePanel('source')} />

            {balanceChips.length > 0 ? (
              <Button variant="ghost" className="text-sm font-medium text-white/85" onClick={resetBalanceFilters}>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/35 text-[11px]">
                  ×
                </span>
                Сбросить фильтры
              </Button>
            ) : null}
          </div>

          {balanceOpenPanel === 'period' ? (
            <DateRangePanel
              title="Период"
              fromValue={balanceDateFrom}
              toValue={balanceDateTo}
              onFromChange={setBalanceDateFrom}
              onToChange={setBalanceDateTo}
            />
          ) : null}

          {balanceOpenPanel === 'type' ? (
            <SingleChoicePanel
              title="Тип операции"
              value={balanceTypeFilter}
              options={[
                { value: 'income', label: 'Поступление' },
                { value: 'expense', label: 'Списание' },
                { value: 'all', label: 'Все' },
              ]}
              onChange={setBalanceTypeFilter}
            />
          ) : null}

          {balanceOpenPanel === 'source' ? (
            <SingleChoicePanel
              title="Источник"
              value={balanceSourceFilter}
              options={[
                { value: 'telegram', label: 'Telegram-бот' },
                { value: 'web', label: 'Веб-сервис' },
                { value: 'all', label: 'Все' },
              ]}
              onChange={setBalanceSourceFilter}
            />
          ) : null}

          <AppliedFiltersRow filters={balanceChips} onReset={resetBalanceFilters} />

          <section className={`${cardClassName} overflow-hidden p-4 sm:p-6`}>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                <thead className="text-white/60">
                  <tr>
                    <th className="pr-6 font-normal">Дата операции</th>
                    <th className="pr-6 font-normal">Тип операции</th>
                    <th className="pr-6 font-normal">Источник операции</th>
                    <th className="font-normal">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((operation) => (
                    <tr className="border-t border-white/10 text-white/85" key={`${operation.date}-${operation.type}-${operation.source}`}>
                      <td className="pr-6 pt-3">{operation.date}</td>
                      <td className={`pr-6 pt-3 ${operation.type === 'Списание' ? 'text-[#FF7A7A]' : 'text-[#77D877]'}`}>
                        {operation.type}
                      </td>
                      <td className="pr-6 pt-3">
                        <div className="flex items-center gap-2.5">
                          <SourceBadge source={operation.source} label size="sm" />
                        </div>
                      </td>
                      <td className="pt-3">{operation.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
