import { useEffect, useMemo, useRef, useState } from 'react';
import { createSubscriptionPayment, getSubscriptionCatalog, getSubscriptionStatus, waitForPaymentActivation } from '../../api/subscription';
import { getTariff, setTariff as saveTariff } from '../../api/tariff';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { SupportSection } from '../../components/layout/SupportSection/SupportSection';
import { TariffPlanCard, type TariffPlanCardData } from '../../components/features/TariffPlanCard';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { useAuth } from '../../context/AuthContext';
import { getCatalogMonthPrice, getSubscriptionBanner, getTariffLabel, isPaymentSuccessful } from '../../lib/apiMappers';
import {
  AlertBanner,
  Button,
  Card,
  CardHeaderDecorDivider,
  Checkbox,
  Label,
  SelectedIcon,
} from '../../components/ui';

export function TariffPage() {
  const { accessToken } = useAuth();
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('processing');
  const [selectedTariffLabel, setSelectedTariffLabel] = useState('');
  const [selectedPaymentMonths, setSelectedPaymentMonths] = useState<1 | 3 | 6 | 12>(1);
  const waitingTimerRef = useRef<number | null>(null);
  const [catalog, setCatalog] = useState<Awaited<ReturnType<typeof getSubscriptionCatalog>> | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<Awaited<ReturnType<typeof getSubscriptionStatus>> | null>(null);
  const [tariff, setTariff] = useState<Awaited<ReturnType<typeof getTariff>> | null>(null);
  const moduleOptions = [
    { label: 'Все факторы проверок', price: 1200 },
    { label: 'Упоминания в СМИ', price: 1300 },
    { label: 'Упоминания в Telegram', price: 1400 },
  ] as const;
  const [selectedModules, setSelectedModules] = useState<string[]>(
    [moduleOptions[0].label],
  );
  const durationOptions = useMemo(
    () =>
      [
        { label: '1 месяц', months: 1 as const, price: getCatalogMonthPrice(catalog, 1) || 3900 },
        { label: '3 месяца', months: 3 as const, price: getCatalogMonthPrice(catalog, 3) || 9900 },
        { label: '6 месяцев', months: 6 as const, price: getCatalogMonthPrice(catalog, 6) || 18900 },
        { label: '12 месяцев', months: 12 as const, price: getCatalogMonthPrice(catalog, 12) || 34900 },
      ],
    [catalog],
  );
  const [selectedDuration, setSelectedDuration] = useState('1 месяц');
  const [accountsCount, setAccountsCount] = useState(2);

  const plans = useMemo(
    () => [
      {
        months: 1 as const,
        card: {
          title: 'Подписка на 1 месяц',
          oldPrice: catalog ? `${Math.round(getCatalogMonthPrice(catalog, 1) * 1.15).toLocaleString('ru-RU')} ₽` : '4500 ₽',
          price: `${getCatalogMonthPrice(catalog, 1).toLocaleString('ru-RU')} ₽`,
          per: 'месяц',
          features: [
            { label: 'Все факторы проверок', included: true },
            { label: 'Упоминания в СМИ', included: tariff?.include_media ?? false },
            { label: 'Упоминания в Telegram', included: tariff?.include_telegram ?? false },
            { label: 'Остаток юр.отчётов', included: (subscriptionStatus?.legal_reports_left ?? 0) > 0 },
            { label: 'Остаток физ.отчётов', included: (subscriptionStatus?.physical_reports_left ?? 0) > 0 },
          ],
        } satisfies TariffPlanCardData,
      },
      {
        months: 3 as const,
        card: {
          title: 'Подписка на 3 месяца',
          oldPrice: catalog ? `${Math.round(getCatalogMonthPrice(catalog, 3) * 1.1).toLocaleString('ru-RU')} ₽` : '6800 ₽',
          price: `${getCatalogMonthPrice(catalog, 3).toLocaleString('ru-RU')} ₽`,
          per: '3 месяца',
          features: [
            { label: 'Все факторы проверок', included: true },
            { label: 'Упоминания в СМИ', included: true },
            { label: 'Упоминания в Telegram', included: tariff?.include_telegram ?? false },
            { label: 'Оптимально для команды', included: true },
            { label: 'Продление по API', included: true },
          ],
        } satisfies TariffPlanCardData,
      },
      {
        months: 12 as const,
        card: {
          title: 'Подписка на 12 месяцев',
          oldPrice: catalog ? `${Math.round(getCatalogMonthPrice(catalog, 12) * 1.08).toLocaleString('ru-RU')} ₽` : '8000 ₽',
          price: `${getCatalogMonthPrice(catalog, 12).toLocaleString('ru-RU')} ₽`,
          per: 'год',
          features: [
            { label: 'Все факторы проверок', included: true },
            { label: 'Упоминания в СМИ', included: true },
            { label: 'Упоминания в Telegram', included: true },
            { label: 'Максимальная выгода', included: true },
            { label: 'Годовая подписка', included: true },
          ],
        } satisfies TariffPlanCardData,
      },
    ],
    [catalog, subscriptionStatus, tariff],
  );

  const durationButtons = durationOptions.map((d) => d.label);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    Promise.all([getTariff(accessToken), getSubscriptionCatalog(accessToken), getSubscriptionStatus(accessToken)])
      .then(([tariffResponse, catalogResponse, statusResponse]) => {
        if (cancelled) return;
        setTariff(tariffResponse);
        setCatalog(catalogResponse);
        setSubscriptionStatus(statusResponse);
        setSelectedModules([
          ...(tariffResponse.include_factors ? [moduleOptions[0].label] : []),
          ...(tariffResponse.include_media ? [moduleOptions[1].label] : []),
          ...(tariffResponse.include_telegram ? [moduleOptions[2].label] : []),
        ]);
      })
      .catch(() => {
        if (cancelled) return;
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const scrollToPlans = () => {
    document.getElementById('tariff-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const extractAmount = (priceLabel: string) => {
    const digits = priceLabel.replace(/[^\d]/g, '');
    return digits || '0';
  };

  const handlePlanSelect = (plan: TariffPlanCardData, months: 1 | 3 | 6 | 12) => {
    setTopUpAmount(extractAmount(plan.price));
    setSelectedTariffLabel(plan.title);
    setSelectedPaymentMonths(months);
    setTopUpStep('processing');
    setShowTopUpModal(true);
  };

  const handleTopUpClose = () => {
    setShowTopUpModal(false);
    setTopUpStep('processing');
    setSelectedTariffLabel('');
    if (waitingTimerRef.current) {
      window.clearTimeout(waitingTimerRef.current);
      waitingTimerRef.current = null;
    }
  };

  const handleTopUpPay = async () => {
    if (!accessToken) return;
    setTopUpStep('waiting');
    try {
      await saveTariff(
        {
          include_factors: selectedModules.includes(moduleOptions[0].label),
          include_media: selectedModules.includes(moduleOptions[1].label),
          include_telegram: selectedModules.includes(moduleOptions[2].label),
          subscription_price: Number(topUpAmount.replace(/\D/g, '')) || individualTariffTotal,
        },
        accessToken,
      );
      const payment = await createSubscriptionPayment({ months: selectedPaymentMonths }, accessToken);
      window.open(payment.payment_url, '_blank', 'noopener,noreferrer');
      const status = await waitForPaymentActivation(
        { orderId: payment.order_id, paymentId: payment.payment_id },
        accessToken,
      );
      if (isPaymentSuccessful(status)) {
        setTopUpStep('success');
        const [tariffResponse, catalogResponse, statusResponse] = await Promise.all([
          getTariff(accessToken),
          getSubscriptionCatalog(accessToken),
          getSubscriptionStatus(accessToken),
        ]);
        setTariff(tariffResponse);
        setCatalog(catalogResponse);
        setSubscriptionStatus(statusResponse);
      } else {
        setTopUpStep('processing');
      }
    } catch {
      setTopUpStep('processing');
    }
  };

  const handleTopUpBack = () => {
    handleTopUpClose();
  };

  const toggleModule = (label: string) => {
    setSelectedModules((prev) => (
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    ));
  };

  const modulesTotal = moduleOptions
    .filter((m) => selectedModules.includes(m.label))
    .reduce((sum, m) => sum + m.price, 0);
  const durationTotal = durationOptions.find((d) => d.label === selectedDuration)?.price ?? 0;
  const accountsExtra = Math.max(0, accountsCount - 2) * 600;
  const individualTariffTotal = modulesTotal + durationTotal + accountsExtra;

  const individualSummaryItems = [
    ...moduleOptions.filter((m) => selectedModules.includes(m.label)).map((m) => m.label),
    selectedDuration,
    `${accountsCount} учетные записи`,
  ];

  const handleIndividualContinue = () => {
    setTopUpAmount(String(individualTariffTotal));
    setSelectedTariffLabel('Индивидуальный тариф');
    setSelectedPaymentMonths(durationOptions.find((item) => item.label === selectedDuration)?.months ?? 1);
    setTopUpStep('processing');
    setShowTopUpModal(true);
  };

  useEffect(() => {
    return () => {
      if (waitingTimerRef.current) window.clearTimeout(waitingTimerRef.current);
    };
  }, []);

  return (
    <PageLayout>
      <PageSection
        title="Тариф"
        description="Управляйте тарифом аккаунта"
      >

        <AlertBanner text={getSubscriptionBanner(subscriptionStatus) ?? 'Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса проверки контрагентов «Trust Me».'} />

        <Card title="Текущий тариф" headerDecor={<CardHeaderDecorDivider />}>
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-[18px] leading-[1] font-semibold uppercase text-white lg:text-[36px]">
                {getTariffLabel(tariff)}
              </h3>
              <Button className="w-full lg:w-auto mb-[15px] lg:mb-0 mt-[30px] lg:mt-0 lg:px-[60px]" onClick={scrollToPlans}>
                Изменить
              </Button>
            </div>
            <p className="text-[#FDFEFF] text-[16px] lg:text-[18px]">
              {subscriptionStatus?.has_active_subscription
                ? `Подписка активна${subscriptionStatus.subscription_expires_at ? ` до ${new Date(subscriptionStatus.subscription_expires_at).toLocaleDateString('ru-RU')}` : ''}`
                : 'Списания с баланса аккаунта совершаются согласно текущему тарифу'}
            </p>
          </div>
        </Card>
      </PageSection>

      <PageSection
        id="tariff-plans"
        title="Оформление подписки"
        description="Выберите подходящий для вас тарифный план"
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {plans.map((plan) => (
            <TariffPlanCard key={plan.card.title} plan={plan.card} onSelect={() => handlePlanSelect(plan.card, plan.months)} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Индивидуальный тариф"
        description="Настройте индивидуальный тариф под задачи вашего бизнеса и узнайте стоимость мгновенно"
      >
        <div className="grid gap-4 xl:gap-0 xl:grid-cols-[1.55fr_0.75fr]">
          <Card className="relative xl:z-10">
            <div className="space-y-8 lg:space-y-[60px]">
              <div>
                <h3 className="mb-4 lg:mb-[30px] text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Функциональные модули тарифа</h3>
                <div className="space-y-[30px] text-[#FDFEFF]">
                  {moduleOptions.map(({ label }) => (
                    <Label variant="inline" className="gap-3" key={label}>
                      <Checkbox
                        checked={selectedModules.includes(label)}
                        onChange={() => toggleModule(label)}
                      />
                      {label}
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 lg:mb-[30px] text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Длительность тарифа</h3>
                <div className="w-full">
                  <div className="flex w-full flex-col overflow-hidden rounded-[10px] border border-[#FDFEFF] bg-[#2A2A2A] lg:inline-flex lg:w-auto lg:min-w-max lg:flex-row">
                    {durationButtons.map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedDuration(label)}
                        className={`inline-flex h-auto items-center justify-center p-[15px] text-[16px] leading-[1] text-[#FDFEFF] whitespace-nowrap ${
                          index !== durationButtons.length - 1
                            ? 'border-b border-[#FDFEFF] lg:border-r lg:border-b-0'
                            : ''
                        } ${selectedDuration === label ? 'bg-[#057889]/40' : ''}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 lg:mb-[30px] text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Учетные записи</h3>
                <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-white/20">
                  <button className="h-9 w-9 bg-white/5 text-[#FDFEFF]" type="button" onClick={() => setAccountsCount((v) => Math.max(1, v - 1))}>
                    -
                  </button>
                  <span className="inline-flex h-9 min-w-10 items-center justify-center bg-transparent px-3 text-white">
                    {accountsCount}
                  </span>
                  <button className="h-9 w-9 bg-white/5 text-[#FDFEFF]" type="button" onClick={() => setAccountsCount((v) => Math.min(20, v + 1))}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="relative xl:ml-[-50px] xl:pl-[105px]">
            <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Расчет стоимости тарифа</h3>
            <div className="space-y-4 text-[#FDFEFF]">
              {individualSummaryItems.map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0EB8D2] text-[#FDFEFF]">
                    <SelectedIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-[30px]">
              <p className="mb-[30px] text-[16px] font-semibold text-white lg:text-[24px]">Итоговая сумма тарифа:</p>
              <div className="text-[24px] font-semibold text-white lg:text-[36px] leading-[1]">
                {individualTariffTotal.toLocaleString('ru-RU')} ₽
              </div>
              {catalog ? (
                <p className="mt-4 mb-0 text-[16px] text-[#FDFEFF]/80">
                  Стоимость отчётов: ЮЛ {catalog.legal_report_price.toLocaleString('ru-RU')} ₽, ФЛ {catalog.physical_report_price.toLocaleString('ru-RU')} ₽
                </p>
              ) : null}
            </div>

            <Button className="w-full" onClick={handleIndividualContinue}>
              Продолжить
            </Button>
          </Card>
        </div>
      </PageSection>

      <SupportSection />

      <BalanceTopUpModal
        open={showTopUpModal}
        step={topUpStep}
        amount={topUpAmount}
        onAmountChange={setTopUpAmount}
        onChipSelect={(value) => setTopUpAmount(String(value))}
        onContinue={() => {}}
        onPay={handleTopUpPay}
        onBack={handleTopUpBack}
        onClose={handleTopUpClose}
        mode="tariff_payment"
        tariffLabel={selectedTariffLabel}
      />
    </PageLayout>
  );
}
