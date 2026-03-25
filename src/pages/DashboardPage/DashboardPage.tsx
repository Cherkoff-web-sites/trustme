import { useState } from 'react';
import { Link } from 'react-router-dom';
import { uiFlags } from '../../config/uiFlags';
import { PageLayout } from '../../components/layout/PageLayout';
import { DashboardGrid } from '../../components/layout/DashboardGrid/DashboardGrid';
import { DashboardNewCheckSteps, type DashboardNewCheckFlowStep } from '../../components/features/DashboardNewCheckModal';
import { CurrentTariffInfoModal } from '../../components/features/CurrentTariffInfoModal';
import { HistoryReportModal } from '../../components/features/history';
import { AlertBanner, Button, Card, designTokens } from '../../components/ui';
import { combineStyles } from '../../lib/combineStyles';
import { TelegramCircleIcon } from '../../shared/icons';
import { type HistoryItem } from '../../shared/ReportContent';
import qrSvg from '../../assets/icons/qr.svg';
import arrowLinkNextSvg from '../../assets/icons/arrow_link_next.svg';
import chevronSvg from '../../assets/icons/chevron.svg';
import walletSvg from '../../assets/icons/wallet.svg';
import telegramSvg from '../../assets/icons/telegram.svg';
import websiteOnDashboardSvg from '../../assets/icons/website_on_dashboard.svg';

export function DashboardPage() {
  const renderHeaderDecorLine = (gradientId: string) => (
    <svg className="h-auto w-full" width="591" height="6" viewBox="0 0 591 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M0.001302 2.66699C0.00130213 4.13975 1.19521 5.33366 2.66797 5.33366C4.14073 5.33366 5.33464 4.13975 5.33464 2.66699C5.33464 1.19423 4.14073 0.000325313 2.66797 0.000325441C1.19521 0.00032557 0.00130188 1.19423 0.001302 2.66699ZM2.66797 2.66699L2.66797 3.16699L590.668 3.16694L590.668 2.66694L590.668 2.16694L2.66797 2.66699L2.66797 2.66699Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient id={gradientId} x1="2.66797" y1="3.16699" x2="590.668" y2="3.16694" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
    </svg>
  );

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

  const newCheckTitle =
    newCheckStep === 'form'
      ? 'Новая проверка'
      : newCheckStep === 'loading'
        ? 'Формируем отчет'
        : newCheckStep === 'success'
          ? 'Отчет готов'
          : 'Ошибка генерации отчета';
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
            headerDecor={newCheckStep === 'form' ? renderHeaderDecorLine('dashboard_hdr_newcheck') : null}
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
            headerDecor={renderHeaderDecorLine('dashboard_hdr_balance')}
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
                  <Button asChild className="w-full min-w-0 flex-1 lg:min-h-12">
                    <Link to="/balance">Пополнить</Link>
                  </Button>
                </div>
          </Card>
        }
        tariff={
          <Card
            title={<span className="uppercase lg:normal-case"><span className="hidden lg:inline">Текущий</span> <span>тариф</span></span>}
            headerDecor={renderHeaderDecorLine('dashboard_hdr_tariff')}
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
            headerDecor={renderHeaderDecorLine('dashboard_hdr_recent')}
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
                          <div className="flex items-center gap-[10px] text-[16px] leading-[1.2] text-[#FDFEFF]">
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
                              className="border-white/40 px-[30px] py-[10px] text-[18px] leading-[1] font-normal"
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
            className="h-full flex flex-col"
            contentClassName="gap-[15px]"
            variant="dashboard"
          >
              <p className="text-center">
                Сводные данные по проверкам
              </p>
              <div className="flex flex-col items-center">
                <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full lg:w-auto border-[#FDFEFF]/50 px-[30px] py-[15px] lg:py-[10px] text-[14px] lg:text-[18px]"
                  >
                    <span>Сортировать по</span>
                    <img src={chevronSvg} alt="" className="ml-2 h-auto w-4" />
                  </Button>
                </div>
              </div>

              <div className="w-full h-auto flex justify-center items-center mt-[15px]">
                <svg className="w-full h-auto max-w-[160px]" width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M58.4886 80.4545C58.4886 81.8651 58.2244 83.0732 57.696 84.0788C57.1719 85.0803 56.456 85.8473 55.5483 86.38C54.6449 86.9126 53.62 87.179 52.4737 87.179C51.3274 87.179 50.3004 86.9126 49.3928 86.38C48.4893 85.843 47.7734 85.0739 47.245 84.0724C46.7209 83.0668 46.4588 81.8608 46.4588 80.4545C46.4588 79.044 46.7209 77.8381 47.245 76.8366C47.7734 75.831 48.4893 75.0618 49.3928 74.5291C50.3004 73.9964 51.3274 73.7301 52.4737 73.7301C53.62 73.7301 54.6449 73.9964 55.5483 74.5291C56.456 75.0618 57.1719 75.831 57.696 76.8366C58.2244 77.8381 58.4886 79.044 58.4886 80.4545ZM56.1044 80.4545C56.1044 79.4616 55.9489 78.6243 55.6378 77.9425C55.331 77.2564 54.9048 76.7386 54.3594 76.3892C53.8139 76.0355 53.1854 75.8587 52.4737 75.8587C51.7621 75.8587 51.1335 76.0355 50.5881 76.3892C50.0426 76.7386 49.6143 77.2564 49.3033 77.9425C48.9964 78.6243 48.843 79.4616 48.843 80.4545C48.843 81.4474 48.9964 82.2869 49.3033 82.973C49.6143 83.6548 50.0426 84.1726 50.5881 84.5263C51.1335 84.8757 51.7621 85.0504 52.4737 85.0504C53.1854 85.0504 53.8139 84.8757 54.3594 84.5263C54.9048 84.1726 55.331 83.6548 55.6378 82.973C55.9489 82.2869 56.1044 81.4474 56.1044 80.4545ZM60.0914 79.0803V77.1818H68.6824V79.0803H65.5055V87H63.2683V79.0803H60.0914ZM78.3216 77.1818V87H76.0971V77.1818H78.3216ZM77.2797 81.6179V83.5099C77.0282 83.6207 76.7427 83.7209 76.4231 83.8104C76.1078 83.8956 75.7733 83.9638 75.4196 84.0149C75.0701 84.0661 74.7207 84.0916 74.3713 84.0916C73.0588 84.0916 72.0211 83.7976 71.2583 83.2095C70.4998 82.6172 70.1206 81.6946 70.1206 80.4418V77.169H72.3322V80.4418C72.3322 80.8636 72.4068 81.2024 72.5559 81.4581C72.7051 81.7138 72.9309 81.9013 73.2335 82.0206C73.536 82.1357 73.9153 82.1932 74.3713 82.1932C74.8826 82.1932 75.3684 82.142 75.8287 82.0398C76.2889 81.9375 76.7726 81.7969 77.2797 81.6179ZM84.9964 87.1918C84.0121 87.1918 83.1619 86.9872 82.446 86.5781C81.7344 86.1648 81.1868 85.581 80.8033 84.8267C80.4197 84.0682 80.228 83.1754 80.228 82.1484C80.228 81.1385 80.4197 80.2521 80.8033 79.4893C81.1911 78.7223 81.7322 78.1257 82.4268 77.6996C83.1214 77.2692 83.9375 77.054 84.875 77.054C85.4801 77.054 86.0511 77.152 86.5881 77.348C87.1293 77.5398 87.6065 77.8381 88.0199 78.2429C88.4375 78.6477 88.7656 79.1634 89.0043 79.7898C89.2429 80.4119 89.3622 81.1534 89.3622 82.0142V82.7237H81.3146V81.1641H87.1442C87.1399 80.7209 87.044 80.3267 86.8565 79.9815C86.669 79.6321 86.407 79.3572 86.0703 79.157C85.7379 78.9567 85.3501 78.8565 84.907 78.8565C84.4339 78.8565 84.0185 78.9716 83.6605 79.2017C83.3026 79.4276 83.0234 79.7259 82.8232 80.0966C82.6271 80.4631 82.527 80.8658 82.5227 81.3047V82.6662C82.5227 83.2372 82.6271 83.7273 82.8359 84.1364C83.0447 84.5412 83.3366 84.8523 83.7116 85.0696C84.0866 85.2827 84.5256 85.3892 85.0284 85.3892C85.3651 85.3892 85.6697 85.3423 85.9425 85.2486C86.2152 85.1506 86.4517 85.0078 86.652 84.8203C86.8523 84.6328 87.0036 84.4006 87.1058 84.1236L89.2663 84.3665C89.13 84.9375 88.87 85.4361 88.4865 85.8622C88.1072 86.2841 87.6214 86.6122 87.0291 86.8466C86.4368 87.0767 85.7592 87.1918 84.9964 87.1918ZM90.5016 79.0803V77.1818H99.0925V79.0803H95.9157V87H93.6784V79.0803H90.5016ZM102.501 80.3778H105.397C106.65 80.3778 107.619 80.6825 108.305 81.2919C108.991 81.9013 109.336 82.7003 109.341 83.6889C109.336 84.3324 109.179 84.9034 108.868 85.402C108.561 85.9006 108.113 86.2926 107.525 86.5781C106.941 86.8594 106.232 87 105.397 87H100.935V77.1818H103.166V85.1016H105.397C105.9 85.1016 106.313 84.9737 106.637 84.718C106.961 84.4581 107.123 84.1257 107.123 83.7209C107.123 83.2947 106.961 82.9474 106.637 82.679C106.313 82.4105 105.9 82.2763 105.397 82.2763H102.501V80.3778ZM110.561 87V77.1818H112.875V87H110.561Z" fill="#FDFEFF"/>
                  <path d="M41.8384 18.9451C39.4967 15.1985 40.6212 10.2229 44.5829 8.26686C57.99 1.64712 73.0384 -1.10676 88.0214 0.403161C105.668 2.18149 122.223 9.7734 135.085 21.9855C147.946 34.1977 156.385 50.3376 159.075 67.8682C161.764 85.3989 158.552 103.326 149.943 118.833C141.334 134.339 127.816 146.544 111.515 153.531C95.2129 160.518 77.0516 161.889 59.8856 157.43C42.7195 152.971 27.522 142.933 16.6819 128.896C7.4779 116.977 1.85833 102.748 0.387806 87.8686C-0.0467206 83.4717 3.58181 79.8864 8.00008 79.893C12.4184 79.8995 15.9432 83.5003 16.4875 87.8849C17.8935 99.2108 22.3108 110.007 29.3455 119.117C38.0176 130.347 50.1756 138.377 63.9085 141.944C77.6413 145.511 92.1703 144.414 105.212 138.825C118.253 133.236 129.067 123.471 135.954 111.066C142.842 98.6611 145.411 84.3191 143.26 70.2946C141.108 56.2701 134.357 43.3581 124.068 33.5884C113.778 23.8187 100.534 17.7452 86.4171 16.3225C74.9655 15.1685 63.4661 17.1279 53.1096 21.9232C49.1003 23.7796 44.1802 22.6918 41.8384 18.9451Z" fill="#0EB8D2"/>
                  <path d="M8.02596 78.0671C3.60928 77.9485 0.0838088 74.2619 0.642769 69.8791C1.91245 59.9236 5.04746 50.2713 9.90823 41.4365C14.769 32.6017 21.2441 24.787 28.9737 18.3857C32.3766 15.5676 37.3776 16.5722 39.8419 20.2394C42.3062 23.9066 41.2909 28.8421 37.9596 31.7444C32.3125 36.6641 27.5568 42.5511 23.9266 49.1492C20.2964 55.7473 17.8694 62.9155 16.7365 70.3188C16.0681 74.6863 12.4426 78.1857 8.02596 78.0671Z" fill="#FDFEFF"/>
                </svg>
              </div>


              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-white" />
                    Физическое лицо
                  </span>
                  <span>15 отчётов</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#057889]" />
                    Юридическое лицо
                  </span>
                  <span>75 отчётов</span>
                </div>
              </div>
          </Card>
          }
        />
      </section>
      <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
    </PageLayout>
  );
}
