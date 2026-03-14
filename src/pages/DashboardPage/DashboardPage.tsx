import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { CurrentTariffInfoModal } from '../../components/features/CurrentTariffInfoModal';
import { AlertBanner, Button, DashboardCard, Input, OptionIndicator, uiTokens } from '../../components/ui';
import { TelegramCircleIcon, TelegramQrIcon } from '../../shared/icons';

export function DashboardPage() {
  const lastRequests = [
    ['23.12.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.10.2025', 'Физ.лицо', 'Веб-сервис', 'Ошибка'],
    ['23.09.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.09.2024', 'Юр.лицо', 'Веб-сервис', 'Ошибка'],
  ] as const;

  const [showCurrentTariffModal, setShowCurrentTariffModal] = useState(false);

  return (
    <PageLayout>
      <main className={`${uiTokens.container} pb-10 sm:pb-14`}>
          <AlertBanner className="mb-4">
            <p className="m-0">
              Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса
              проверки контрагентов «Trust Me».
            </p>
          </AlertBanner>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_1.35fr_0.78fr]">
            <DashboardCard title="Новая проверка" className="lg:row-span-1">
              <div className="mb-4 flex flex-col gap-2 text-sm text-white/85">
                <label className="flex items-center gap-2.5">
                  <OptionIndicator type="radio" checked={false} />
                  Юридическое лицо
                </label>
                <label className="flex items-center gap-2.5">
                  <OptionIndicator type="radio" checked={false} />
                  Физическое лицо
                </label>
              </div>

              <Input placeholder="Введите ИНН / ОГРН / ФИО" />

              <Button className="mt-4 w-full">
                Запустить проверку
              </Button>

              <p className="mt-4 text-xs leading-[1.45] text-white/65">
                Стоимость проверки будет списана с баланса вашего аккаунта согласно текущему тарифу
              </p>
            </DashboardCard>

            <div className="flex flex-col gap-4">
              <DashboardCard title="Баланс" aside="История операций →">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex min-h-12 min-w-[160px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-[28px] font-semibold">
                    4 550 ₽
                  </div>
                  <Button className="min-w-[160px]">
                    Пополнить
                  </Button>
                </div>
              </DashboardCard>

              <DashboardCard title="Текущий тариф" aside="Что в тарифе ?">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex min-h-12 min-w-[180px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-lg font-medium">
                    Индивидуальный
                  </div>
                  <Button className="min-w-[160px]" onClick={() => setShowCurrentTariffModal(true)}>
                    Изменить
                  </Button>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard title="Telegram-бот" className="lg:row-span-1">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <TelegramCircleIcon />
                </div>
                <p className="mb-5 max-w-[220px] text-sm leading-[1.45] text-white/80">
                  Привяжите Telegram-аккаунт, чтобы все отчёты отображались в одном месте.
                </p>
                <TelegramQrIcon className="h-auto w-[144px] max-w-full" />
              </div>
            </DashboardCard>

            <DashboardCard title="Последние запросы" aside="Вся история запросов →" className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                  <thead className="text-white/60">
                    <tr>
                      <th className="pr-6 font-normal">Дата / Время</th>
                      <th className="pr-6 font-normal">Категория</th>
                      <th className="pr-6 font-normal">Источник проверки</th>
                      <th className="pr-6 font-normal">Статус</th>
                      <th className="font-normal">Отчёт</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastRequests.map(([date, category, source, status]) => (
                      <tr className="border-t border-white/10 text-white/85" key={`${date}-${category}-${source}`}>
                        <td className="pr-6 pt-3">{date}</td>
                        <td className="pr-6 pt-3">{category}</td>
                        <td className="pr-6 pt-3">{source}</td>
                        <td className={`pr-6 pt-3 ${status === 'Ошибка' ? 'text-[#FF7A7A]' : 'text-[#77D877]'}`}>{status}</td>
                        <td className="pt-3">
                          <Button variant="secondary" size="sm" className="min-h-10 min-w-[112px] border-white/40 px-4 text-sm font-normal">
                            Открыть
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>

            <DashboardCard title="Статистика проверок">
              <div className="mb-4 flex justify-end">
                <Button variant="secondary" size="sm" className="min-h-10 border-white/25 px-4 text-sm font-normal">
                  Сортировать по
                </Button>
              </div>

              <div className="mx-auto mb-5 flex h-[170px] w-[170px] items-center justify-center rounded-full border-[10px] border-[#0EB8D2] border-t-white border-r-[#1A1A1A]">
                <span className="text-lg font-medium">Отчёты</span>
              </div>

              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-white" />
                    Физическое лицо
                  </span>
                  <span>15 отчётов</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#0EB8D2]" />
                    Юридическое лицо
                  </span>
                  <span>75 отчётов</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        <CurrentTariffInfoModal open={showCurrentTariffModal} onClose={() => setShowCurrentTariffModal(false)} />
      </main>
    </PageLayout>
  );
}
