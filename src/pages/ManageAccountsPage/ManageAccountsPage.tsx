import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { uiFlags } from '../../config/uiFlags';
import { topupBalance } from '../../api/balance';
import { createCompany } from '../../api/companies';
import { useAuth } from '../../context/AuthContext';
import { PageLayout } from '../../components/layout/PageLayout';
import { ManageAccountsGrid } from '../../components/layout/DashboardGrid/ManageAccountsGrid';
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
import telegramSvg from '../../assets/icons/telegram.svg';
import websiteOnDashboardSvg from '../../assets/icons/website_on_dashboard.svg';
import arrowLinkNextSvg from '../../assets/icons/arrow_link_next.svg';
import chevronSvg from '../../assets/icons/chevron.svg';
import walletSvg from '../../assets/icons/wallet.svg';
import manageUserPhotoPng from '../../assets/icons/user.png';
import manageUserAvatarPlaceholderSvg from '../../assets/icons/user.svg';

type ManageEmployeeStatus = 'Активен' | 'Неактивен' | 'Приглашен';

type ManageRecentRequestRow = {
  date: string;
  user: { name: string; email: string; usePhoto?: boolean };
  employeeStatus: ManageEmployeeStatus;
  category: string;
  source: string;
  verificationStatus: string;
};

function manageEmployeeStatusTextClass(status: ManageEmployeeStatus) {
  if (status === 'Активен') return designTokens.colors.text.statusSuccess;
  if (status === 'Неактивен') return designTokens.colors.text.statusError;
  return designTokens.colors.text.statusWarning;
}

function manageEmployeeStatusDotClass(status: ManageEmployeeStatus) {
  if (status === 'Активен') return designTokens.colors.status.successBg;
  if (status === 'Неактивен') return designTokens.colors.status.errorBg;
  return designTokens.colors.status.warningBg;
}

function manageVerificationStatusTextClass(status: string) {
  if (status === 'Ошибка') return designTokens.colors.text.statusError;
  if (status === 'Успешно') return designTokens.colors.text.statusSuccess;
  return designTokens.colors.text.muted;
}

function ManageUserAvatar({
  name,
  usePhoto,
  className,
}: {
  name: string;
  usePhoto?: boolean;
  className?: string;
}) {
  return (
    <img
      src={usePhoto ? manageUserPhotoPng : manageUserAvatarPlaceholderSvg}
      alt={usePhoto ? `Фото: ${name}` : `Аватар по умолчанию: ${name}`}
      className={cn('h-10 w-10 shrink-0 rounded-full object-cover lg:h-11 lg:w-11', className)}
    />
  );
}

const MANAGE_RECENT_REQUESTS_DEMO: ManageRecentRequestRow[] = [
  {
    date: '23.12.2025',
    user: { name: 'Килиренко Алексей', email: 'alextoptop@gmail.com', usePhoto: true },
    employeeStatus: 'Активен',
    category: 'Юр.лицо',
    source: 'Telegram-бот',
    verificationStatus: 'Успешно',
  },
  {
    date: '23.10.2025',
    user: { name: 'Иванова Мария', email: 'maria.ivanova@example.com' },
    employeeStatus: 'Неактивен',
    category: 'Физ.лицо',
    source: 'Веб-сервис',
    verificationStatus: 'Ошибка',
  },
  {
    date: '23.09.2025',
    user: { name: 'Петров Сергей', email: 'sergey.p@example.com' },
    employeeStatus: 'Приглашен',
    category: '—',
    source: '—',
    verificationStatus: '—',
  },
  {
    date: '23.09.2024',
    user: { name: 'Сидорова Анна', email: 'anna.sidorova@example.com' },
    employeeStatus: 'Активен',
    category: 'Юр.лицо',
    source: 'Веб-сервис',
    verificationStatus: 'Успешно',
  },
];

export function ManageAccountsPage() {
  const { accessToken, user, refreshUser } = useAuth();
  const manageRecentRequests = MANAGE_RECENT_REQUESTS_DEMO;
  const [companyName, setCompanyName] = useState('');
  const [companyActionMessage, setCompanyActionMessage] = useState<string | null>(null);

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
    setTopUpAmount(user ? user.balance.toLocaleString('ru-RU') : '4 550');
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

  const handleTopUpPay = async () => {
    if (!accessToken) return;
    setTopUpStep('waiting');
    try {
      await topupBalance({ amount: Number(topUpAmount.replace(/\D/g, '')) }, accessToken);
      await refreshUser();
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
      MANAGE_RECENT_REQUESTS_DEMO.forEach(({ date }) => {
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

    const legalCount = MANAGE_RECENT_REQUESTS_DEMO.filter((r) => r.category === 'Юр.лицо').length;
    const individualCount = MANAGE_RECENT_REQUESTS_DEMO.filter((r) => r.category === 'Физ.лицо').length;
    return [
      { label: 'Физическое лицо', value: individualCount, color: '#FDFEFF' },
      { label: 'Юридическое лицо', value: legalCount, color: '#0EB8D2' },
    ] as const;
  }, [statsSortBy]);

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

  const handleCreateCompany = async () => {
    if (!accessToken || !companyName.trim()) return;
    try {
      await createCompany({ name: companyName.trim() }, accessToken);
      await refreshUser();
      setCompanyActionMessage('Компания успешно создана.');
      setCompanyName('');
    } catch {
      setCompanyActionMessage('Не удалось создать компанию. Попробуйте позже.');
    }
  };

  return (
    <PageLayout>
      <section className="relative">
        <AlertBanner className="mb-4 lg:mb-0 lg:absolute lg:left-0 lg:right-0 lg:bottom-full lg:mb-[30px] lg:z-20">
          <p className="m-0">
            Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса
            проверки контрагентов «Trust Me».
          </p>
        </AlertBanner>

        <ManageAccountsGrid
          newCheck={
            <Card
              title={<span className="uppercase lg:normal-case">{newCheckTitle}</span>}
              headerDecor={newCheckStep === 'form' ? <CardHeaderDecorDivider /> : null}
              variant="dashboard"
            >
              <DashboardNewCheckSteps
                onStepChange={setNewCheckStep}
                onReportOpen={(item) => setOpenedReportItem(item ?? sampleReportItem)}
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
                  <span>{user ? `${user.balance.toLocaleString('ru-RU')} ₽` : '—'}</span>
                </div>
                <Button className="w-full min-w-0 flex-1 lg:min-h-12" onClick={handleOpenTopUp}>
                  Пополнить
                </Button>
              </div>
            </Card>
          }
          tariff={
            <Card
              title={
                <span className="uppercase lg:normal-case">
                  <span className="hidden lg:inline">Текущий</span> <span>тариф</span>
                </span>
              }
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
              className="relative flex flex-1 flex-col overflow-visible"
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

              <CurrentTariffInfoModal open={showCurrentTariffModal} onClose={() => setShowCurrentTariffModal(false)} />
            </Card>
          }
          telegram={
            <Card variant="dashboard">
              <div className="flex w-full flex-col gap-[30px] items-center text-center lg:flex-row lg:items-center lg:justify-between lg:gap-[30px] lg:text-left">
                <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-[15px] lg:items-stretch">
                  <div className="flex flex-col items-center gap-[15px] lg:flex-row lg:items-center lg:gap-[15px] lg:self-start">
                    <div className="shrink-0">
                      <TelegramCircleIcon />
                    </div>
                    <h3
                      className={combineStyles(
                        '',
                        designTokens.typography.cardTitle,
                        'text-center leading-[22px] lg:text-left lg:leading-[29px]',
                      )}
                    >
                      <span className="uppercase lg:normal-case">Telegram-бот</span>
                    </h3>
                  </div>
                  <p className="max-w-[284px] text-[16px] leading-[19px] lg:max-w-none lg:self-stretch lg:text-left lg:text-[18px] lg:leading-[22px]">
                    Привяжите Telegram-аккаунт, чтобы все отчёты отображались в&nbsp;одном месте.
                  </p>
                </div>
                <img src={qrSvg} alt="" className="h-auto w-[144px] max-w-full shrink-0" />
              </div>
            </Card>
          }
          stats={
            <Card
              title={<span className="uppercase lg:normal-case">Статистика проверок</span>}
              headerVariant={3}
              className="relative z-0 flex h-full min-h-0 flex-1 flex-col overflow-visible"
              contentClassName="min-h-0 flex-1 gap-[15px]"
              variant="dashboard"
            >
              <div className="flex min-h-0 flex-1 flex-col gap-[30px] lg:gap-[60px]">
                <div className="flex shrink-0 flex-col gap-[15px]">
                  <p className="text-center">Сводные данные по проверкам</p>
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
                            className={cn(
                              'ml-0 h-auto w-4 shrink-0 transition-transform',
                              statsSortMenuOpen && 'rotate-180',
                            )}
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
                </div>

                <div className="relative mx-auto h-[160px] w-[160px] shrink-0 lg:h-[240px] lg:w-[240px]">
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
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[18px] font-semibold text-[#FDFEFF] lg:text-[24px]">
                    <span>{statsSortBy === 'date' ? 'Года' : 'Отчеты'}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-[15px]">
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
              </div>
            </Card>
          }
        />

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
          className="mt-[20px] flex w-full flex-col lg:mt-[20px]"
          variant="dashboard"
        >
          <div className="lg:hidden">
            <button
              type="button"
              className="mb-[30px] flex w-full min-h-14 items-center justify-center gap-3 rounded-[100px] border border-[#FDFEFF]/25 bg-[#1A1A1A] px-6 py-4 text-[14px] font-semibold text-[#FDFEFF]"
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

          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full border-collapse text-left">
              <thead className="text-[#FDFEFF]">
                <tr className="border-b border-white/10">
                  <th className="py-[15px] pl-[30px] pr-6 font-normal">Дата / Время</th>
                  <th className="py-[15px] pr-6 font-normal">Пользователь</th>
                  <th className="py-[15px] pr-6 font-normal">Статус сотрудника</th>
                  <th className="py-[15px] pr-6 font-normal">Категория проверки</th>
                  <th className="py-[15px] pr-6 font-normal">Источник проверки</th>
                  <th className="py-[15px] pr-6 font-normal">Статус проверки</th>
                  {uiFlags.reportViewsEnabled ? (
                    <th className="py-[15px] pr-[30px] font-normal">Отчёт</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {manageRecentRequests.map((row, index) => {
                  const isLast = index === manageRecentRequests.length - 1;
                  const py = isLast ? 'pt-[15px] pb-0' : 'py-[15px]';
                  const categoryMuted = row.category === '—';
                  const sourceMuted = row.source === '—';

                  return (
                    <tr
                      className={`text-[#FDFEFF] ${isLast ? '' : 'border-b border-white/10'}`}
                      key={`${row.date}-${row.user.email}-${index}`}
                    >
                      <td className={`${py} pl-[30px] pr-6 align-middle`}>{row.date}</td>
                      <td className={`${py} pr-6 align-middle`}>
                        <div className="flex max-w-[280px] items-center gap-3">
                          <ManageUserAvatar name={row.user.name} usePhoto={row.user.usePhoto} />
                          <div className="min-w-0">
                            <div className="text-[16px] font-medium leading-[1.2] text-[#FDFEFF] lg:text-[18px]">
                              {row.user.name}
                            </div>
                            <div
                              className={combineStyles(
                                'truncate text-[14px] leading-[1.2] lg:text-[16px]',
                                designTokens.colors.text.muted,
                              )}
                            >
                              {row.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={combineStyles(
                          `${py} pr-6 align-middle font-medium`,
                          manageEmployeeStatusTextClass(row.employeeStatus),
                        )}
                      >
                        {row.employeeStatus}
                      </td>
                      <td
                        className={combineStyles(
                          `${py} pr-6 align-middle`,
                          categoryMuted ? designTokens.colors.text.muted : '',
                        )}
                      >
                        {row.category}
                      </td>
                      <td className={`${py} pr-6 align-middle`}>
                        {sourceMuted ? (
                          <span className={designTokens.colors.text.muted}>—</span>
                        ) : (
                          <div className="flex items-center gap-[10px] text-[16px] leading-[1.2] text-[#FDFEFF] lg:text-[18px]">
                            {row.source === 'Telegram-бот' ? (
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
                            <span>{row.source}</span>
                          </div>
                        )}
                      </td>
                      <td
                        className={combineStyles(
                          `${py} pr-6 align-middle font-medium`,
                          manageVerificationStatusTextClass(row.verificationStatus),
                        )}
                      >
                        {row.verificationStatus}
                      </td>
                      {uiFlags.reportViewsEnabled ? (
                        <td className={`${py} pr-[30px] align-middle`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="border-[#FDFEFF]/50 px-[30px] py-[10px] font-normal leading-[1] lg:!text-[18px]"
                            onClick={() => setOpenedReportItem(sampleReportItem)}
                          >
                            Открыть
                          </Button>
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-[30px] lg:hidden">
            {manageRecentRequests.map((row, index) => {
              const sourceMuted = row.source === '—';
              const categoryMuted = row.category === '—';

              return (
                <Card
                  key={`${row.date}-${row.user.email}-m-${index}`}
                  as="article"
                  className="px-[30px]"
                  variant="history"
                >
                  <div className="flex flex-col gap-[30px]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <ManageUserAvatar name={row.user.name} usePhoto={row.user.usePhoto} />
                        <div className="min-w-0">
                          <div className="text-[16px] font-medium leading-[1.2] text-[#FDFEFF]">{row.user.name}</div>
                          <div
                            className={combineStyles(
                              'mt-1 truncate text-[14px] leading-[1.2]',
                              designTokens.colors.text.muted,
                            )}
                          >
                            {row.user.email}
                          </div>
                        </div>
                      </div>
                      <span
                        className={cn(
                          'mt-1 h-3 w-3 shrink-0 rounded-full',
                          manageEmployeeStatusDotClass(row.employeeStatus),
                        )}
                        title={row.employeeStatus}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 text-[16px] leading-[1.2]">
                      <span className="text-[#FDFEFF]">{row.date}</span>
                      {sourceMuted ? (
                        <span className={designTokens.colors.text.muted}>—</span>
                      ) : (
                        <div className="flex items-center gap-[10px] text-[#FDFEFF]">
                          {row.source === 'Telegram-бот' ? (
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
                          <span>{row.source}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 text-[16px] leading-[1.2]">
                      <span className={categoryMuted ? designTokens.colors.text.muted : 'text-[#FDFEFF]'}>
                        {row.category}
                      </span>
                      <span
                        className={combineStyles(
                          'font-semibold',
                          manageVerificationStatusTextClass(row.verificationStatus),
                        )}
                      >
                        {row.verificationStatus}
                      </span>
                    </div>

                    {uiFlags.reportViewsEnabled ? (
                      <Button
                        variant="secondary"
                        className="w-full border-white/40 px-[15px] py-[15px] text-[14px] font-normal leading-[1]"
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
      </section>

      {user?.role === 'company_admin' && user.company_id == null ? (
        <section className="mt-[20px]">
          <Card title="Компания" headerDecor={<CardHeaderDecorDivider />}>
            <div className="flex flex-col gap-[20px]">
              <p className="m-0 text-[#FDFEFF]">
                В API доступно создание компании. Текущая таблица сотрудников пока остаётся демо до появления
                endpoint-ов чтения.
              </p>
              <div className="flex flex-col gap-[15px] lg:flex-row">
                <input
                  className="min-h-[48px] flex-1 rounded-[10px] border border-[#FDFEFF]/20 bg-[#2A2A2A] px-4 text-[#FDFEFF]"
                  placeholder="Название компании"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                />
                <Button className="lg:min-w-[220px]" onClick={handleCreateCompany}>
                  Создать компанию
                </Button>
              </div>
              {companyActionMessage ? <p className="m-0 text-[#FDFEFF]/80">{companyActionMessage}</p> : null}
            </div>
          </Card>
        </section>
      ) : null}

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
