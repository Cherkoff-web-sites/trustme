import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { uiFlags } from '../../config/uiFlags';
import { PageLayout } from '../../components/layout/PageLayout';
import { DashboardGrid } from '../../components/layout/DashboardGrid/DashboardGrid';
import { DashboardNewCheckSteps, type DashboardNewCheckFlowStep } from '../../components/features/DashboardNewCheckModal';
import { BalanceTopUpModal, type TopUpStep } from '../../components/features/BalanceTopUpModal';
import { CurrentTariffInfoModal } from '../../components/features/CurrentTariffInfoModal';
import { HistoryReportModal } from '../../components/features/history';
import { AlertBanner, Button, Card, CardHeaderDecorDivider, designTokens } from '../../components/ui';
import { combineStyles } from '../../lib/combineStyles';
import { cn } from '../../lib/cn';
import { TelegramCircleIcon } from '../../shared/icons';
import { type HistoryItem } from '../../shared/ReportContent';
import { scrollableThreeRowListClass } from '../../shared/scrollListClasses';
import qrSvg from '../../assets/icons/qr.svg';
import arrowLinkNextSvg from '../../assets/icons/arrow_link_next.svg';
import chevronSvg from '../../assets/icons/chevron.svg';
import walletSvg from '../../assets/icons/wallet.svg';
import telegramSvg from '../../assets/icons/telegram.svg';
import websiteOnDashboardSvg from '../../assets/icons/website_on_dashboard.svg';

export function DashboardPage() {
  const lastRequests = [
    ['23.12.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.10.2025', 'Физ.лицо', 'Веб-сервис', 'Ошибка'],
    ['23.09.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.09.2024', 'Юр.лицо', 'Веб-сервис', 'Ошибка'],
  ] as const;

  const sampleReportItem: HistoryItem = {
    type: 'Юридическое лицо',
    name: 'ООО «УМНЫЙ РИТЕЙЛ»',
    dotColor: designTokens.colors.status.errorBg,
    document: 'ИНН: 7711771234',
    checkedAt: '23.12.2025, 12:00',
    duration: '2 минуты',
    source: 'telegram',
    success: true,
  };

  const [showCurrentTariffModal, setShowCurrentTariffModal] = useState(false);
  const [openedReportItem, setOpenedReportItem] = useState<HistoryItem | null>(null);
  const [newCheckStep, setNewCheckStep] = useState<DashboardNewCheckFlowStep>('form');
  const [statsSortMenuOpen, setStatsSortMenuOpen] = useState(false);
  const [statsSortBy, setStatsSortBy] = useState<'date' | 'reportCategory'>('date');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('4 550');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('form');
  const topUpWaitingTimerRef = useRef<number | null>(null);

  const handleOpenTopUp = () => {
    setTopUpStep('form');
    setTopUpAmount('4 550');
    setShowTopUpModal(true);
  };

  const handleCloseTopUp = () => {
    setShowTopUpModal(false);
    setTopUpStep('form');
    if (topUpWaitingTimerRef.current) {
      window.clearTimeout(topUpWaitingTimerRef.current);
      topUpWaitingTimerRef.current = null;
    }
  };

  const handleTopUpContinue = () => {
    const numericAmount = Number(topUpAmount.replace(/\s/g, ''));
    if (!numericAmount || numericAmount < 100 || numericAmount > 100000) {
      return;
    }
    setTopUpStep('processing');
  };

  const handleTopUpPay = () => {
    setTopUpStep('waiting');
    if (topUpWaitingTimerRef.current) window.clearTimeout(topUpWaitingTimerRef.current);
    topUpWaitingTimerRef.current = window.setTimeout(() => {
      setTopUpStep('success');
      topUpWaitingTimerRef.current = null;
    }, 3000);
  };

  const handleTopUpBack = () => {
    setTopUpStep('form');
  };

  useEffect(() => {
    return () => {
      if (topUpWaitingTimerRef.current) {
        window.clearTimeout(topUpWaitingTimerRef.current);
      }
    };
  }, []);

  const newCheckTitle =
    newCheckStep === 'form'
      ? 'Новая проверка'
      : newCheckStep === 'loading'
        ? 'Формируем отчет'
        : newCheckStep === 'success'
          ? 'Отчет готов'
          : 'Ошибка генерации отчета';

  const statsSegments = useMemo(() => {
    if (statsSortBy === 'date') {
      const yearCounts = new Map<string, number>();
      lastRequests.forEach(([date]) => {
        const year = date.split('.').at(-1)?.trim() ?? '—';
        yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
      });

      const yearsSorted = Array.from(yearCounts.entries())
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .slice(0, 2);

      const [first, second] = yearsSorted;
      return [
        { label: first ? `${first[0]} год` : '—', value: first?.[1] ?? 0, color: '#FDFEFF' },
        { label: second ? `${second[0]} год` : '—', value: second?.[1] ?? 0, color: '#0EB8D2' },
      ] as const;
    }

    // Демо-значения для карточки статистики (по макету).
    const legalCount = 25;
    const individualCount = 57;
    return [
      { label: 'Физическое лицо', value: individualCount, color: '#FDFEFF' },
      { label: 'Юридическое лицо', value: legalCount, color: '#0EB8D2' },
    ] as const;
  }, [lastRequests, statsSortBy]);

  const statsTotal = statsSegments[0].value + statsSegments[1].value;
  const circleRadius = 48;
  const donutStrokeWidth = 10;
  const circleLength = 2 * Math.PI * circleRadius;
  const firstRatio = statsTotal > 0 ? statsSegments[0].value / statsTotal : 0.5;
  const targetVisualGap = 2;
  const geometricGap = donutStrokeWidth + targetVisualGap;
  const totalGaps = geometricGap * 2;
  const drawableLength = Math.max(0, circleLength - totalGaps);
  const firstDash = drawableLength * firstRatio;
  const secondDash = Math.max(0, drawableLength - firstDash);
  return (
    <PageLayout>
      <section className="relative">
        <AlertBanner className="mb-4 lg:mb-0 lg:absolute lg:left-0 lg:right-0 lg:bottom-full lg:mb-[30px] lg:z-20">
          <p className="m-0">
            Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса
            проверки контрагентов «Trust Me».
          </p>
        </AlertBanner>

        <DashboardGrid
        newCheck={
          <Card
            title={<span className="uppercase lg:normal-case">{newCheckTitle}</span>}
            headerDecor={newCheckStep === 'form' ? <CardHeaderDecorDivider /> : null}
            className="lg:row-span-1"
            variant="dashboard"
          >
            <DashboardNewCheckSteps
              onStepChange={setNewCheckStep}
              onReportOpen={() => setOpenedReportItem(sampleReportItem)}
            />
          </Card>
        }
        balance={
          <Card
            title={<span className="uppercase lg:normal-case">Баланс</span>}
            headerDecor={<CardHeaderDecorDivider />}
            aside={
                  <Link
                    to="/balance"
                    className={combineStyles(
                      'inline-flex items-center gap-[10px] text-[16px] lg:text-[18px] font-semibold transition-colors',
                      designTokens.colors.text.primary,
                    )}
                  >
                    <span>История операций</span>
                    <img src={arrowLinkNextSvg} alt="" className="h-auto w-[18px]" />
                  </Link>
                }
            className="flex flex-1 flex-col"
            variant="dashboard"
          >
                <div className="flex flex-col gap-[20px] lg:flex-row lg:items-stretch lg:gap-[30px]">
                  <div
                    className={
                      'flex min-h-12 w-full min-w-0 flex-1 items-center justify-start gap-3 rounded-full px-5 text-[16px] font-semibold lg:text-[24px] ' +
                      'border-[0.5px] border-[rgba(253,254,255,0.5)] ' +
                      'shadow-[inset_2px_2px_10px_rgba(14,184,210,0.3),inset_-2px_-2px_10px_rgba(253,254,255,0.2)] ' +
                      'backdrop-blur-[5px]'
                    }
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(253, 254, 255, 0.1), rgba(253, 254, 255, 0.1)), rgba(255, 255, 255, 0.01)',
                    }}
                  >
                    <img src={walletSvg} alt="" className="h-auto w-[18px] shrink-0 lg:h-6 lg:w-6" />
                    <span>4 550 ₽</span>
                  </div>
                  <Button className="w-full min-w-0 flex-1 lg:min-h-12" onClick={handleOpenTopUp}>
                    Пополнить
                  </Button>
                </div>
          </Card>
        }
        tariff={
          <Card
            title={<span className="uppercase lg:normal-case"><span className="hidden lg:inline">Текущий</span> <span>тариф</span></span>}
            headerDecor={<CardHeaderDecorDivider />}
            aside={
              <button
                type="button"
                className="text-[16px] lg:text-[18px] font-semibold"
                onClick={() => setShowCurrentTariffModal(true)}
              >
                Что в тарифе ?
              </button>
            }
            className="relative overflow-visible flex flex-1 flex-col"
            variant="dashboard"
          >
                <div className="flex flex-col gap-[20px] lg:flex-row lg:items-stretch lg:gap-[30px]">
                  <div
                    className={
                      'flex min-h-12 w-full min-w-0 flex-1 items-center justify-start rounded-full px-5 text-[16px] font-medium lg:text-[24px] ' +
                      'border-[0.5px] border-[rgba(253,254,255,0.5)] ' +
                      'shadow-[inset_2px_2px_10px_rgba(14,184,210,0.3),inset_-2px_-2px_10px_rgba(253,254,255,0.2)] ' +
                      'backdrop-blur-[5px]'
                    }
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(253, 254, 255, 0.1), rgba(253, 254, 255, 0.1)), rgba(255, 255, 255, 0.01)',
                    }}
                  >
                    <span className="min-w-0 truncate">Индивидуальный</span>
                  </div>
                  <Button asChild className="w-full min-w-0 flex-1 lg:min-h-12">
                    <Link to="/tariff">Изменить</Link>
                  </Button>
                </div>

                <CurrentTariffInfoModal
                  open={showCurrentTariffModal}
                  onClose={() => setShowCurrentTariffModal(false)}
                />
          </Card>
        }
        telegram={
          <Card
            className="lg:row-span-1"
            variant="dashboard"
          >
              <div className="flex flex-col gap-[30px] items-center text-center">
                <div className="flex flex-col gap-[15px] items-center text-center">
                  <div>
                    <TelegramCircleIcon />
                  </div>
                  <h3 className={combineStyles('', designTokens.typography.cardTitle, 'text-center leading-[22px] lg:leading-[29px]')}>
                    <span className="uppercase lg:normal-case">Telegram-бот</span>
                  </h3>
                  <p className="max-w-[284px] lg:max-w-none text-[16px] leading-[19px] lg:text-[18px] lg:leading-[22px]">
                    Привяжите Telegram-аккаунт, чтобы все отчёты отображались в&nbsp;одном месте.
                  </p>
                </div>
                <img src={qrSvg} alt="" className="h-auto w-[144px] max-w-full" />
              </div>
          </Card>
        }
        recentRequests={
          <Card
            title={<span className="uppercase lg:normal-case">Последние запросы</span>}
            headerDecor={<CardHeaderDecorDivider />}
            aside={
              <Link
                to="/history"
                className={combineStyles(
                  'hidden lg:inline-flex items-center gap-[10px] text-[16px] lg:text-[18px] font-semibold transition-colors',
                  designTokens.colors.text.primary,
                )}
              >
                <span>Вся история запросов</span>
                <img src={arrowLinkNextSvg} alt="" className="h-auto w-[18px]" />
              </Link>
            }
            className="h-full flex flex-col"
            variant="dashboard"
          >
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="text-[#FDFEFF]">
                    <tr className="border-b border-white/10">
                      <th className="py-[15px] pl-[30px] pr-6 font-normal">Дата / Время</th>
                      <th className="py-[15px] pr-6 font-normal">Категория</th>
                      <th className="py-[15px] pr-6 font-normal">Источник проверки</th>
                      <th className="py-[15px] pr-6 font-normal">Статус</th>
                      {uiFlags.reportViewsEnabled ? (
                        <th className="py-[15px] pr-[30px] font-normal">Отчёт</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {lastRequests.map(([date, category, source, status], index) => (
                      <tr
                        className={`text-[#FDFEFF] ${index === lastRequests.length - 1 ? '' : 'border-b border-white/10'}`}
                        key={`${date}-${category}-${source}`}
                      >
                        <td
                          className={`${
                            index === lastRequests.length - 1 ? 'pt-[15px] pb-0' : 'py-[15px]'
                          } pl-[30px] pr-6`}
                        >
                          {date}
                        </td>
                        <td
                          className={`${
                            index === lastRequests.length - 1 ? 'pt-[15px] pb-0' : 'py-[15px]'
                          } pr-6`}
                        >
                          {category}
                        </td>
                        <td
                          className={`${
                            index === lastRequests.length - 1 ? 'pt-[15px] pb-0' : 'py-[15px]'
                          } pr-6`}
                        >
                          <div className="flex items-center gap-[10px] text-[16px] lg:text-[18px] leading-[1.2] text-[#FDFEFF]">
                            {source === 'Telegram-бот' ? (
                              <img src={telegramSvg} alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                            ) : (
                              <img src={websiteOnDashboardSvg} alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                            )}
                            <span>{source}</span>
                          </div>
                        </td>
                        <td
                          className={combineStyles(
                            index === lastRequests.length - 1 ? 'pt-[15px] pb-0 pr-6' : 'py-[15px] pr-6',
                            status === 'Ошибка'
                              ? designTokens.colors.text.statusError
                              : designTokens.colors.text.statusSuccess,
                          )}
                        >
                          {status}
                        </td>
                        {uiFlags.reportViewsEnabled ? (
                          <td
                            className={`${
                              index === lastRequests.length - 1 ? 'pt-[15px] pb-0' : 'py-[15px]'
                            } pr-[30px]`}
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              className="border-[#FDFEFF]/50 px-[30px] py-[10px] lg:!text-[18px] leading-[1] font-normal"
                              onClick={() => setOpenedReportItem(sampleReportItem)}
                            >
                              Открыть
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: каждая строка таблицы превращается в отдельную карточку */}
              <div className="flex flex-col gap-[20px] lg:hidden">
                {lastRequests.map(([date, category, source, status]) => {
                  const statusColor =
                    status === 'Ошибка' ? designTokens.colors.text.statusError : designTokens.colors.text.statusSuccess;

                  const isTelegram = source === 'Telegram-бот';

                  return (
                    <Card
                      key={`${date}-${category}-${source}`}
                      as="article"
                      className="px-[30px]"
                      variant="history"
                    >
                      <div className="flex flex-col gap-[20px]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-[16px] leading-[1.2]">{date}</span>
                            <span className="text-[16px] leading-[1.2] font-medium text-[#FDFEFF]">{category}</span>
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
                              <span>{source}</span>
                            </div>
                            <span className={combineStyles('text-[16px] leading-[1.2] font-semibold', statusColor)}>{status}</span>
                          </div>
                        </div>

                        {uiFlags.reportViewsEnabled ? (
                          <Button
                            variant="secondary"
                            className="w-full border-white/40 px-[15px] py-[15px] text-[14px] leading-[1] font-normal"
                            onClick={() => setOpenedReportItem(sampleReportItem)}
                          >
                            Открыть отчет
                          </Button>
                        ) : null}
                      </div>
                    </Card>
                  );
                })}

                <div className="flex justify-center">
                  <Link
                    to="/history"
                    className="inline-flex items-center gap-1 transition-colors hover:underline"
                  >
                    <span>Вся история запросов</span>
                    <img src={arrowLinkNextSvg} alt="" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
          </Card>
        }
        stats={
          <Card
            title={<span className="uppercase lg:normal-case">Статистика проверок</span>}
            headerVariant={3}
            className="relative z-0 flex h-full flex-col overflow-visible"
            contentClassName="gap-[15px]"
            variant="dashboard"
          >
              <p className="text-center">
                Сводные данные по проверкам
              </p>
              <div className="flex w-full flex-col items-center">
                <div className="relative z-[45] flex w-full justify-center">
                  {statsSortMenuOpen ? (
                    <button
                      type="button"
                      className="fixed inset-0 z-[40] cursor-default"
                      onClick={() => setStatsSortMenuOpen(false)}
                      aria-label="Закрыть меню сортировки"
                    />
                  ) : null}
                  <div className="relative inline-flex max-w-full min-w-0 flex-col items-stretch">
                    <button
                      type="button"
                      className={cn(
                        'inline-flex max-w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#FDFEFF]/50 bg-transparent px-[30px] py-[15px] text-[14px] font-semibold text-[#FDFEFF] transition-[box-shadow] lg:py-[10px] lg:text-[18px]',
                        statsSortMenuOpen
                          ? 'shadow-[inset_2px_-2px_6px_#1C3849,inset_-2px_2px_6px_#1C3849]'
                          : 'shadow-none hover:shadow-[inset_2px_-2px_6px_#057889,inset_-2px_2px_6px_#057889]',
                      )}
                      onClick={() => setStatsSortMenuOpen((open) => !open)}
                      aria-expanded={statsSortMenuOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="min-w-0 truncate">Сортировать по</span>
                      <img
                        src={chevronSvg}
                        alt=""
                        className={cn('ml-0 h-auto w-4 shrink-0 transition-transform', statsSortMenuOpen && 'rotate-180')}
                      />
                    </button>
                    {statsSortMenuOpen ? (
                      <div
                        className="absolute left-0 right-0 top-full z-[50] mt-[15px] min-w-0 rounded-[18px] border border-[#FDFEFF]/65 bg-[#1A1A1A] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                        role="listbox"
                        aria-label="Сортировка"
                      >
                        <div className={scrollableThreeRowListClass}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={statsSortBy === 'date'}
                            className="flex w-full items-center bg-transparent py-4 text-left text-base text-[#FDFEFF] transition-colors lg:text-[18px]"
                            onClick={() => {
                              setStatsSortBy('date');
                              setStatsSortMenuOpen(false);
                            }}
                          >
                            Дате
                          </button>
                          <div className="my-2 h-px bg-[#FDFEFF]/50" role="presentation" aria-hidden />
                          <button
                            type="button"
                            role="option"
                            aria-selected={statsSortBy === 'reportCategory'}
                            className="flex w-full items-center bg-transparent py-4 text-left text-base text-[#FDFEFF] transition-colors lg:text-[18px]"
                            onClick={() => {
                              setStatsSortBy('reportCategory');
                              setStatsSortMenuOpen(false);
                            }}
                          >
                            Категории отчета
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-[15px] flex w-full items-center justify-center">
                <div className="relative h-[240px] w-[240px] lg:h-[160px] lg:w-[160px]">
                  <svg viewBox="0 0 120 120" className="h-full w-full" aria-label="Диаграмма статистики">
                    <g transform="rotate(180 60 60)">
                      <circle
                        cx="60"
                        cy="60"
                        r={circleRadius}
                        fill="none"
                        stroke={statsSegments[0].color}
                        strokeWidth={donutStrokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${firstDash} ${Math.max(0, circleLength - firstDash)}`}
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={circleRadius}
                        fill="none"
                        stroke={statsSegments[1].color}
                        strokeWidth={donutStrokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${secondDash} ${Math.max(0, circleLength - secondDash)}`}
                        strokeDashoffset={-(firstDash + geometricGap)}
                      />
                    </g>
                  </svg>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[24px] font-semibold text-[#FDFEFF] lg:text-[18px]">
                    <span>{statsSortBy === 'date' ? 'Года' : 'Отчеты'}</span>
                  </div>
                </div>
              </div>


              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statsSegments[0].color }} />
                    {statsSegments[0].label}
                  </span>
                  <span>
                    {statsSegments[0].value}{' '}
                    {statsSegments[0].value === 1 ? 'отчёт' : statsSegments[0].value < 5 ? 'отчёта' : 'отчётов'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statsSegments[1].color }} />
                    {statsSegments[1].label}
                  </span>
                  <span>
                    {statsSegments[1].value}{' '}
                    {statsSegments[1].value === 1 ? 'отчёт' : statsSegments[1].value < 5 ? 'отчёта' : 'отчётов'}
                  </span>
                </div>
              </div>
          </Card>
          }
        />
      </section>
      <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
      <BalanceTopUpModal
        open={showTopUpModal}
        step={topUpStep}
        amount={topUpAmount}
        onAmountChange={setTopUpAmount}
        onChipSelect={(value) => setTopUpAmount(value.toLocaleString('ru-RU'))}
        onContinue={handleTopUpContinue}
        onPay={handleTopUpPay}
        onBack={handleTopUpBack}
        onClose={handleCloseTopUp}
      />
    </PageLayout>
  );
}
