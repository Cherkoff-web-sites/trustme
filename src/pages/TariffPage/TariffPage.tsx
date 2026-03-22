import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { CurrentTariffInfoModal } from '../../components/features/CurrentTariffInfoModal';
import { SupportSection } from '../../components/layout/SupportSection/SupportSection';
import { TariffPlanCard, type TariffPlanCardData } from '../../components/features/TariffPlanCard';
import {
  AlertBanner,
  Button,
  Card,
  Checkbox,
  FilterChip,
  Label,
  SelectedIcon,
} from '../../components/ui';

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
      <PageSection
        title={<span className="mx-auto block max-w-[90%] lg:mx-0 lg:max-w-none">Тариф</span>}
        description="Управляйте тарифом аккаунта"
      >

        <AlertBanner text="Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса проверки контрагентов «Trust Me»." />

        <Card title="Текущий тариф">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[18px] leading-[0.95] font-semibold uppercase text-white sm:text-[36px]">
                Индивидуальный
              </div>
              <Button className="w-full mb-[15px] mt-[30px] lg:hidden" onClick={() => setShowCurrentTariffModal(true)}>
                Изменить
              </Button>
              <p className="mt-0 lg:mt-3 text-[#FDFEFF] text-[16px] lg:text-[18px]">
                Списания с баланса аккаунта совершаются согласно текущему тарифу
              </p>
            </div>
            <Button className="hidden min-w-[180px] lg:inline-flex" onClick={() => setShowCurrentTariffModal(true)}>
              Изменить тариф
            </Button>
          </div>
        </Card>

        <CurrentTariffInfoModal open={showCurrentTariffModal} onClose={() => setShowCurrentTariffModal(false)} />
      </PageSection>

      <PageSection
        title={<span className="mx-auto block max-w-[90%] lg:mx-0 lg:max-w-none">Оформление подписки</span>}
        description="Выберите подходящий для вас тарифный план"
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {plans.map((plan) => (
            <TariffPlanCard key={plan.title} plan={plan} />
          ))}
        </div>
      </PageSection>

      <PageSection
        title={<span className="mx-auto block max-w-[90%] lg:mx-0 lg:max-w-none">Индивидуальный тариф</span>}
        description="Настройте индивидуальный тариф под задачи вашего бизнеса и узнайте стоимость мгновенно"
      >
        <div className="grid gap-4 xl:grid-cols-[1.55fr_0.75fr]">
          <Card>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Функциональные модули тарифа</h3>
                <div className="space-y-3 text-[#FDFEFF]">
                  {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram'].map((label) => (
                    <Label variant="inline" className="gap-3" key={label}>
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        className="pointer-events-none"
                        tabIndex={-1}
                        aria-hidden
                      />
                      {label}
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Длительность тарифа</h3>
                {/* Mobile layout: вертикальный список с примыкающими кнопками */}
                <div className="overflow-hidden rounded-[16px] border border-[#FDFEFF] bg-[#2A2A2A] lg:hidden">
                  {durationButtons.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex p-[15px] w-full items-center justify-center text-[16px] text-[#FDFEFF] ${
                        index !== durationButtons.length - 1 ? 'border-b border-[#FDFEFF]' : ''
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Desktop layout: оставляем текущие chip-кнопки */}
                <div className="hidden flex-wrap gap-2 lg:flex">
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
                  <button className="h-9 w-9 bg-white/5 text-[#FDFEFF]" type="button">
                    -
                  </button>
                  <span className="inline-flex h-9 min-w-10 items-center justify-center bg-transparent px-3 text-white">
                    1
                  </span>
                  <button className="h-9 w-9 bg-white/5 text-[#FDFEFF]" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Расчет стоимости тарифа</h3>
            <div className="space-y-4 text-[#FDFEFF]">
              {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram', '7 дней', '2 учетные записи'].map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#057889] text-[#FDFEFF]">
                    <SelectedIcon className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="">
              <p className="mb-4 text-[22px] font-semibold text-white sm:text-[30px]">Итоговая сумма тарифа:</p>
              <div className="text-[34px] font-semibold text白 sm:text-[52px]">4900 ₽</div>
            </div>

            <Button className=" w-full">
              Продолжить
            </Button>
          </Card>
        </div>
      </PageSection>

      <SupportSection />
    </PageLayout>
  );
}
