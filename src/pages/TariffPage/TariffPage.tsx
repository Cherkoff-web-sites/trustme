import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageStructure } from '../../components/layout/PageStructure/PageStructure';
import { CurrentTariffInfoModal } from '../../components/features/CurrentTariffInfoModal';
import { SupportSection } from '../../components/features/Support/SupportSection';
import { TariffPlanCard, type TariffPlanCardData } from '../../components/features/TariffPlanCard';
import { AlertBanner, Button, Card, FilterChip, OptionIndicator, SectionHeader, SelectedIcon } from '../../components/ui';

export function TariffPage() {
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

  const durationButtons = ['24 часа', '7 дней', '1 месяц', '3 месяца', '6 месяцев', '12 месяцев'];

  const [showCurrentTariffModal, setShowCurrentTariffModal] = useState(false);

  return (
    <PageLayout>
      <PageStructure title="Тариф" description="Управляйте тарифом аккаунта">
        <AlertBanner text="Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса проверки контрагентов «Trust Me»." />

        <Card title="Текущий тариф">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[18px] leading-[0.95] font-semibold uppercase text-white sm:text-[36px]">
                Индивидуальный
              </div>
              <p className="mt-3 text-[#FDFEFF]/70">
                Списания с баланса аккаунта совершаются согласно текущему тарифу
              </p>
            </div>
            <Button className="min-w-[180px]" onClick={() => setShowCurrentTariffModal(true)}>
              Изменить тариф
            </Button>
          </div>
        </Card>

        <CurrentTariffInfoModal open={showCurrentTariffModal} onClose={() => setShowCurrentTariffModal(false)} />
      </PageStructure>

      <section className="pt-14 sm:pt-20">
        <SectionHeader title="Оформление подписки" description="Выберите подходящий для вас тарифный план" />
        <div className="grid gap-4 xl:grid-cols-3">
          {plans.map((plan) => (
            <TariffPlanCard key={plan.title} plan={plan} />
          ))}
        </div>
      </section>

      <section className="pt-14 sm:pt-20">
        <SectionHeader
          title="Индивидуальный тариф"
          description="Настройте индивидуальный тариф под задачи вашего бизнеса и узнайте стоимость мгновенно"
        />

        <div className="grid gap-4 xl:grid-cols-[1.55fr_0.75fr]">
          <Card>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Функциональные модули тарифа</h3>
                <div className="space-y-3 text-[#FDFEFF]/85">
                  {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram'].map((label) => (
                    <label className="flex items-center gap-3" key={label}>
                      <OptionIndicator type="checkbox" checked={false} />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Длительность тарифа</h3>
                <div className="flex flex-wrap gap-2">
                  {durationButtons.map((label, index) => (
                    <FilterChip
                      key={label}
                      selected={index === 1}
                      className="rounded-[8px]"
                    >
                      {label}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Учетные записи</h3>
                <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-white/20">
                  <button className="h-9 w-9 bg-white/5 text-white/85" type="button">
                    -
                  </button>
                  <span className="inline-flex h-9 min-w-10 items-center justify-center bg-transparent px-3 text-white">
                    1
                  </span>
                  <button className="h-9 w-9 bg-white/5 text-white/85" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-5 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Расчет стоимости тарифа</h3>
            <div className="space-y-4 text-[#FDFEFF]/85">
              {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram', '7 дней', '2 учетные записи'].map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#057889] text-[#FDFEFF]">
                    <SelectedIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-4 text-[22px] font-semibold text-white sm:text-[30px]">Итоговая сумма тарифа:</p>
              <div className="text-[34px] font-semibold text白 sm:text-[52px]">4900 ₽</div>
            </div>

            <Button className="mt-8 w-full">
              Продолжить
            </Button>
          </Card>
        </div>
      </section>

      <SupportSection />
    </PageLayout>
  );
}
