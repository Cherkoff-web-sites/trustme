import { useMemo, useState } from 'react';
import { createLegalReport, createPhysicalReport, waitForReportResolution } from '../../api/reports';
import { uiFlags } from '../../config/uiFlags';
import { SUPPORT_TELEGRAM_URL } from '../../shared/supportLinks';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { PersonTypeSwitcher } from '../../components/features/PersonTypeSwitcher';
import { ReportActions } from '../../components/features/ReportActions';
import { SupportSection } from '../../components/layout/SupportSection/SupportSection';
import { useAuth } from '../../context/AuthContext';
import { downloadHtmlReport, mapReportToHistoryItem } from '../../lib/apiMappers';
import { Button, Card, Input, Label, MoreDetailsSection, designTokens } from '../../components/ui';
import { type HistoryItem, ReportContent } from '../../shared/ReportContent';
import type { ReportResponse } from '../../types/api';
import { cn } from '../../lib/cn';
import { combineStyles } from '../../lib/combineStyles';
import searchSvg from '../../assets/icons/search.svg';
import loadSvg from '../../assets/icons/load.svg';
import warningSvg from '../../assets/icons/warning.svg';

const REQUIRED_FIELD_MESSAGE = 'Обязательное поле';

export function NewCheckPage() {
  const { accessToken } = useAuth();
  const [personType, setPersonType] = useState<'legal' | 'individual' | null>(null);
  const [personTypeError, setPersonTypeError] = useState(false);
  const [legalQuery, setLegalQuery] = useState('');
  const [legalQueryError, setLegalQueryError] = useState<string | undefined>(undefined);
  const [fio, setFio] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [individualInn, setIndividualInn] = useState('');
  const [altFieldErrors, setAltFieldErrors] = useState<{
    fio?: string;
    birthDate?: string;
    individualInn?: string;
  }>({});

  const [reportState, setReportState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [showInlineReport, setShowInlineReport] = useState(false);
  const [lastSubmitSource, setLastSubmitSource] = useState<'primary' | 'alt'>('primary');
  const [currentReport, setCurrentReport] = useState<ReportResponse | null>(null);

  const reportItem: HistoryItem = useMemo(() => {
    if (currentReport) {
      return mapReportToHistoryItem(currentReport);
    }
    if (lastSubmitSource === 'alt') {
      return {
        type: 'Физическое лицо',
        name: (fio || 'ИВАНОВ ИВАН ИВАНОВИЧ').toUpperCase(),
        dotColor: 'bg-[#45C857]',
        document: `ИНН: ${individualInn || '7711771234'}`,
        birthDate: birthDate ? birthDate.split('-').reverse().join('.') : '09.11.1975',
        checkedAt: '27.10.2025, 09:32',
        duration: 'до 10 минут',
        source: 'web',
        success: reportState !== 'error',
      };
    }
    if (personType === 'individual') {
      return {
        type: 'Физическое лицо',
        name: (legalQuery || 'ИВАНОВ ИВАН ИВАНОВИЧ').toUpperCase(),
        dotColor: 'bg-[#45C857]',
        document: `Запрос: ${legalQuery || '—'}`,
        checkedAt: '27.10.2025, 09:32',
        duration: 'до 10 минут',
        source: 'web',
        success: reportState !== 'error',
      };
    }
    return {
      type: 'Юридическое лицо',
      name: 'ООО «УМНЫЙ РИТЕЙЛ»',
      dotColor: 'bg-[#45C857]',
      document: `ИНН: ${legalQuery || '7811657720'}`,
      checkedAt: '27.10.2025, 09:32',
      duration: 'до 10 минут',
      source: 'web',
      success: reportState !== 'error',
    };
  }, [currentReport, lastSubmitSource, personType, legalQuery, fio, birthDate, individualInn, reportState]);

  const normalizeBirthDate = (value: string): string | null => {
    const trimmed = value.trim();
    const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return trimmed;
    const dot = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!dot) return null;
    return `${dot[3]}-${dot[2]}-${dot[1]}`;
  };

  const runCheck = async (source: 'primary' | 'alt') => {
    setShowInlineReport(false);
    setLastSubmitSource(source);
    setCurrentReport(null);

    if (source === 'primary') {
      setLegalQueryError(undefined);
      if (personType === null) {
        setPersonTypeError(true);
        return;
      }
      setPersonTypeError(false);
      if (!legalQuery.trim()) {
        setLegalQueryError(REQUIRED_FIELD_MESSAGE);
        return;
      }
    } else {
      const next: { fio?: string; birthDate?: string; individualInn?: string } = {};
      if (!fio.trim()) next.fio = REQUIRED_FIELD_MESSAGE;
      if (!birthDate.trim()) next.birthDate = REQUIRED_FIELD_MESSAGE;
      if (!individualInn.trim()) next.individualInn = REQUIRED_FIELD_MESSAGE;
      setAltFieldErrors(next);
      if (Object.keys(next).length > 0) return;
    }

    if (!accessToken) {
      setReportState('error');
      return;
    }

    setReportState('loading');
    try {
      const created =
        source === 'alt'
          ? await createPhysicalReport(
              {
                lastname: fio.trim().split(/\s+/)[0] || fio.trim(),
                firstname: fio.trim().split(/\s+/)[1] || '-',
                middlename: fio.trim().split(/\s+/)[2] || '-',
                search_type: 'fio_inn_birthday',
                birthday: normalizeBirthDate(birthDate),
                inn: individualInn.trim(),
              },
              accessToken,
            )
          : personType === 'legal'
            ? await createLegalReport({ inn: legalQuery.trim() }, accessToken)
            : await createPhysicalReport(
                {
                  lastname: legalQuery.trim().split(/\s+/)[0] || legalQuery.trim(),
                  firstname: legalQuery.trim().split(/\s+/)[1] || '-',
                  middlename: legalQuery.trim().split(/\s+/)[2] || '-',
                  search_type: 'fio',
                },
                accessToken,
              );

      const resolved =
        created.status === 'pending' || created.status === 'processing'
          ? await waitForReportResolution(created.id, accessToken)
          : created;

      setCurrentReport(resolved);
      setReportState(resolved.status === 'failed' ? 'error' : 'ready');
    } catch {
      setReportState('error');
    }
  };

  const pricingDetails = (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-center justify-between gap-4 lg:flex-wrap lg:items-start lg:justify-start lg:gap-x-[30px] lg:gap-y-1">
        <span className="text-[16px] font-normal lg:text-[20px]">С баланса будет списано:</span>
        <span className="text-[16px] font-semibold lg:text-[20px]">100 ₽</span>
      </div>
      <div className="flex items-center justify-between gap-4 lg:flex-wrap lg:items-start lg:justify-start lg:gap-x-[30px] lg:gap-y-1">
        <span className="text-[16px] font-normal lg:text-[20px]">Ваш текущий тариф:</span>
        <span className="text-[16px] font-semibold lg:text-[20px]">Индивидуальный</span>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <PageSection
        title="Новая проверка"
        description="Проверка осуществляется в рамках текущего тарифа. Стоимость проверки будет списана с вашего баланса"
      >
        <Card>
          <div className="flex flex-col gap-[30px] lg:gap-6">
            <div className="relative">
              <PersonTypeSwitcher
                className="sm:gap-8"
                value={personType}
                allowClear
                indicatorMode="settings"
                onChange={(v) => {
                  setPersonType(v);
                  if (v !== null) setPersonTypeError(false);
                }}
                options={[
                  { value: 'legal', label: 'Юридическое лицо' },
                  { value: 'individual', label: 'Физическое лицо' },
                ]}
              />
              {personTypeError ? (
                <p
                  className={combineStyles(
                    'absolute left-0 right-0 top-[calc(100%+5px)] text-left text-[12px] leading-[18px]',
                    designTokens.colors.text.statusError,
                  )}
                  role="alert"
                >
                  Выберите тип проверяемого лица
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-[30px] lg:flex-row lg:items-end">
                <div
                  className={cn(
                    'min-w-0',
                    'max-lg:flex-none max-lg:shrink-0',
                    'lg:flex-1 lg:min-w-0',
                    /* pb только снаружи: иначе при box-border съедает высоту внутри h-[74px]/h-[59px] и обрезает поле */
                    legalQueryError && 'pb-6',
                  )}
                >
                  <div
                    className={cn(
                      /* мобилка: фикс 74px — только этот блок, без padding */
                      'max-lg:h-[74px] max-lg:min-h-[74px] max-lg:max-h-[74px]',
                      'lg:h-[59px] lg:min-h-[59px] lg:max-h-[59px]',
                    )}
                  >
                    <Input
                      multiline
                      /* rows={2} даёт нативный min-height > 74px в моб. браузерах */
                      rows={1}
                      wrapperClassName={cn(
                        'h-full min-h-0',
                        'max-lg:h-[74px] max-lg:min-h-[74px] max-lg:max-h-[74px]',
                      )}
                      startAdornment={
                        <img src={searchSvg} alt="" className="h-5 w-5 text-[#FDFEFF]" width={20} height={20} />
                      }
                      className={cn(
                        'box-border w-full rounded-[10px] sm:rounded-xl',
                        'max-lg:h-[74px] max-lg:min-h-[74px] max-lg:max-h-[74px] max-lg:resize-none max-lg:py-[17px] max-lg:leading-normal',
                        'lg:h-full lg:max-h-full lg:min-h-0 lg:overflow-y-auto lg:py-0 lg:leading-[59px]',
                        'bg-[#2A2A2A] sm:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))]',
                        legalQueryError
                          ? designTokens.colors.border.inputError
                          : 'border-[#FDFEFF]/50 sm:border-white/15',
                      )}
                      placeholder="ИНН (ЮЛ, ФЛ) / ФИО дд.мм.гггг / ФИО дд.мм.гггг ИНН"
                      value={legalQuery}
                      error={legalQueryError}
                      onChange={(event) => {
                        setLegalQuery(event.target.value);
                        setLegalQueryError(undefined);
                      }}
                    />
                  </div>
                </div>

                <Button className="min-w-[188px] px-[60px]" onClick={() => runCheck('primary')}>
                  Проверить
                </Button>
              </div>

              <MoreDetailsSection>{pricingDetails}</MoreDetailsSection>
            </div>
          </div>
        </Card>
      </PageSection>

      {/* Заглушка: блок «данные не найдены» (позже — только после неуспешной проверки) */}
      <section>
        <Card>
          <div className="flex flex-col gap-[30px]">
            <div>
              <div className="flex gap-3 sm:items-start">
                <img src={warningSvg} alt="" className="mt-0.5 h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden />
                <h3 className={combineStyles('m-0 min-w-0 flex-1', designTokens.typography.cardTitle, 'text-[#FDFEFF]')}>
                  Данные не найдены. Попытка не была истрачена
                </h3>
              </div>
              <p className={combineStyles('m-0 mt-3', designTokens.typography.cardBody, 'text-[#FDFEFF]')}>
                Попробуйте указать данные другого типа:
              </p>
            </div>

            <div className="flex flex-col gap-[15px]">
              <div className={cn(altFieldErrors.fio && 'pb-6')}>
                <Label id="newcheck-notfound-fio-label">ФИО</Label>
                <Input
                  id="newcheck-notfound-fio"
                  aria-labelledby="newcheck-notfound-fio-label"
                  placeholder="Введите ФИО"
                  value={fio}
                  error={altFieldErrors.fio}
                  onChange={(e) => {
                    setFio(e.target.value);
                    setAltFieldErrors((prev) => ({ ...prev, fio: undefined }));
                  }}
                />
              </div>
              <div className={cn(altFieldErrors.birthDate && 'pb-6')}>
                <Label id="newcheck-notfound-birth-label">Дата рождения</Label>
                <Input
                  id="newcheck-notfound-birth"
                  aria-labelledby="newcheck-notfound-birth-label"
                  placeholder="ДД.ММ.ГГГГ"
                  value={birthDate}
                  error={altFieldErrors.birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setAltFieldErrors((prev) => ({ ...prev, birthDate: undefined }));
                  }}
                />
              </div>
              <div className={cn(altFieldErrors.individualInn && 'pb-6')}>
                <Label id="newcheck-notfound-inn-label">ИНН</Label>
                <Input
                  id="newcheck-notfound-inn"
                  aria-labelledby="newcheck-notfound-inn-label"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Введите ИНН"
                  value={individualInn}
                  error={altFieldErrors.individualInn}
                  onChange={(e) => {
                    setIndividualInn(e.target.value);
                    setAltFieldErrors((prev) => ({ ...prev, individualInn: undefined }));
                  }}
                />
              </div>
            </div>

            <div className="self-start w-full lg:w-auto">
              <Button className="w-full min-w-[260px] lg:w-auto lg:px-[60px]" onClick={() => runCheck('alt')}>
                Проверить
              </Button>
            </div>

            <MoreDetailsSection>{pricingDetails}</MoreDetailsSection>
          </div>
        </Card>
      </section>

      {reportState !== 'idle' ? (
        <section>
          <Card className="px-4 py-6 sm:px-6 sm:py-8">
            {reportState === 'loading' ? (
              <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Формируем отчет</h3>
                <p className="m-0 text-[#FDFEFF]">Ожидайте, формирование отчета может занять до 10 минут</p>
                <img
                  src={loadSvg}
                  alt=""
                  className="mt-4 h-[35px] w-[35px] animate-spin lg:h-[60px] lg:w-[60px]"
                  aria-hidden
                />
              </div>
            ) : null}

            {reportState === 'ready' ? (
              <div className="flex flex-col items-center gap-[30px] py-2 text-center">
                <h3 className="m-0 text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Отчет готов</h3>
                <div className="flex w-full max-w-[625px] flex-col gap-[30px] text-left text-[#FDFEFF]">
                  <p className="m-0 text-[16px] lg:text-[18px] text-center">
                    Отчет успешно сформирован. Вы можете посмотреть или скачать его
                  </p>
                  <div className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#34A853] bg-[#2A2A2A] p-[15px] text-[16px] lg:text-[18px]">
                    Успешно
                  </div>
                  <ReportActions
                    onOpen={() => setShowInlineReport(true)}
                    openLabel="Открыть отчет"
                    downloadLabel="Скачать отчет"
                    onDownload={() => downloadHtmlReport(currentReport)}
                    fullWidthMobile
                    equalSplitLg
                  />
                </div>
              </div>
            ) : null}

            {reportState === 'error' ? (
              <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
                <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Ошибка генерации отчета</h3>
                <p className="m-0 max-w-[520px] text-sm text-[#FDFEFF]">
                  Отчет не удалось сформировать. Вы можете попробовать еще раз или написать в поддержку
                </p>
                <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#7A2F2F] bg-[#2A1B1B] px-4 text-xs font-medium text-[#FF7A7A]">
                  Ошибка
                </div>
                <p className="mt-4 text-[#FDFEFF]">
                  Что-то пошло не так?{' '}
                  <Button asChild variant="ghost" className="font-medium text-[#FDFEFF] underline underline-offset-4 hover:text-[#FDFEFF]">
                    <a href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Написать в поддержку
                    </a>
                  </Button>
                </p>
              </div>
            ) : null}
          </Card>
        </section>
      ) : null}

      {reportState === 'ready' && showInlineReport && uiFlags.reportViewsEnabled ? (
        <section>
          <ReportContent item={reportItem} />
        </section>
      ) : null}

      <SupportSection />
    </PageLayout>
  );
}
