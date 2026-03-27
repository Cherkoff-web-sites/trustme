import { useEffect, useRef, useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { SupportSection } from '../../components/layout/SupportSection/SupportSection';
import { TariffPlanCard, type TariffPlanCardData } from '../../components/features/TariffPlanCard';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import {
  AlertBanner,
  Button,
  Card,
  Checkbox,
  Label,
  SelectedIcon,
} from '../../components/ui';

export function TariffPage() {
  const renderHeaderDecorLine = (gradientId: string) => (
    <svg
      className="h-auto w-full"
      width="591"
      height="6"
      viewBox="0 0 591 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0.001302 2.66699C0.00130213 4.13975 1.19521 5.33366 2.66797 5.33366C4.14073 5.33366 5.33464 4.13975 5.33464 2.66699C5.33464 1.19423 4.14073 0.000325313 2.66797 0.000325441C1.19521 0.00032557 0.00130188 1.19423 0.001302 2.66699ZM2.66797 2.66699L2.66797 3.16699L590.668 3.16694L590.668 2.66694L590.668 2.16694L2.66797 2.66699L2.66797 2.66699Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="2.66797"
          y1="3.16699"
          x2="590.668"
          y2="3.16694"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
    </svg>
  );

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('processing');
  const waitingTimerRef = useRef<number | null>(null);
  const moduleOptions = [
    { label: 'Скоринг', price: 1200 },
    { label: 'Упоминания в СМИ', price: 1300 },
    { label: 'Упоминания в Telegram', price: 1400 },
  ] as const;
  const [selectedModules, setSelectedModules] = useState<string[]>(
    moduleOptions.map((m) => m.label),
  );
  const durationOptions = [
    { label: '24 часа', price: 300 },
    { label: '7 дней', price: 1000 },
    { label: '1 месяц', price: 3900 },
    { label: '3 месяца', price: 9900 },
    { label: '6 месяцев', price: 18900 },
    { label: '12 месяцев', price: 34900 },
  ] as const;
  const [selectedDuration, setSelectedDuration] = useState<(typeof durationOptions)[number]['label']>('7 дней');
  const [accountsCount, setAccountsCount] = useState(2);

  const plans: TariffPlanCardData[] = [
    {
      title: 'Базовый тариф',
      oldPrice: '4500 ₽',
      price: '3900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Одна учетная запись', included: true },
        { label: 'Упоминания в СМИ', included: false },
        { label: 'Упоминания в Telegram', included: false },
      ],
    },
    {
      title: 'Профессиональный тариф',
      oldPrice: '6800 ₽',
      price: '5900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Упоминания в СМИ', included: true },
        { label: 'Упоминания в Telegram', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Одна учетная запись', included: true },
      ],
    },
    {
      title: 'Корпоративный тариф',
      oldPrice: '8000 ₽',
      price: '6900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Упоминания в СМИ', included: true },
        { label: 'Упоминания в Telegram', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Несколько учетных записей', included: true },
      ],
    },
  ];

  const durationButtons = durationOptions.map((d) => d.label);

  const scrollToPlans = () => {
    document.getElementById('tariff-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const extractAmount = (priceLabel: string) => {
    const digits = priceLabel.replace(/[^\d]/g, '');
    return digits || '0';
  };

  const handlePlanSelect = (plan: TariffPlanCardData) => {
    setTopUpAmount(extractAmount(plan.price));
    setTopUpStep('processing');
    setShowTopUpModal(true);
  };

  const handleTopUpClose = () => {
    setShowTopUpModal(false);
    setTopUpStep('processing');
    if (waitingTimerRef.current) {
      window.clearTimeout(waitingTimerRef.current);
      waitingTimerRef.current = null;
    }
  };

  const handleTopUpPay = () => {
    setTopUpStep('waiting');
    if (waitingTimerRef.current) window.clearTimeout(waitingTimerRef.current);
    waitingTimerRef.current = window.setTimeout(() => {
      setTopUpStep('success');
      waitingTimerRef.current = null;
    }, 3000);
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

        <AlertBanner text="Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса проверки контрагентов «Trust Me»." />

        <Card title="Текущий тариф" headerDecor={renderHeaderDecorLine('tariff_hdr_current')}>
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-[18px] leading-[1] font-semibold uppercase text-white lg:text-[36px]">
                Индивидуальный
              </h3>
              <Button className="w-full lg:w-auto mb-[15px] lg:mb-0 mt-[30px] lg:mt-0 lg:px-[60px]" onClick={scrollToPlans}>
                Изменить
              </Button>
            </div>
            <p className="text-[#FDFEFF] text-[16px] lg:text-[18px]">
              Списания с баланса аккаунта совершаются согласно текущему тарифу
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
            <TariffPlanCard key={plan.title} plan={plan} onSelect={handlePlanSelect} />
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
      />
    </PageLayout>
  );
}
