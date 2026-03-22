import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import { PersonTypeSwitcher } from '../../components/features/PersonTypeSwitcher';
import { ReportActions } from '../../components/features/ReportActions';
import { SupportSection } from '../../components/layout/SupportSection/SupportSection';
import { Button, Card, Input, Label, LabelCaption, MoreDetailsSection, uiTokens } from '../../components/ui';
import { type HistoryItem, ReportContent } from '../../shared/ReportContent';
import searchSvg from '../../assets/icons/search.svg';
import loadSvg from '../../assets/icons/load.svg';

export function NewCheckPage() {
  const [personType, setPersonType] = useState<'legal' | 'individual'>('legal');
  const [legalQuery, setLegalQuery] = useState('');
  const [fio, setFio] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [individualInn, setIndividualInn] = useState('');

  const [reportState, setReportState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [showInlineReport, setShowInlineReport] = useState(false);

  const reportItem: HistoryItem = personType === 'legal'
    ? {
        type: 'Юридическое лицо',
        name: 'ООО «УМНЫЙ РИТЕЙЛ»',
        dotColor: 'bg-[#45C857]',
        document: 'ИНН: 7811657720',
        checkedAt: '27.10.2025, 09:32',
        duration: 'до 10 минут',
        source: 'web',
        success: reportState !== 'error',
      }
    : {
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

  const canSubmit =
    personType === 'legal'
      ? legalQuery.trim().length > 0
      : fio.trim().length > 0 && birthDate.trim().length > 0 && individualInn.trim().length > 0;

  const handleCheck = () => {
    setShowInlineReport(false);

    if (!canSubmit) {
      setReportState('error');
      return;
    }

    setReportState('loading');
    window.setTimeout(() => {
      setReportState('ready');
    }, 1200);
  };

  return (
    <PageLayout>
      <PageSection
        title="Новая проверка"
        description="Проверка осуществляется в рамках текущего тарифа. Стоимость проверки будет списана с вашего баланса"
      >
          <Card>
            <PersonTypeSwitcher
              className="sm:gap-6"
              value={personType}
              onChange={setPersonType}
              options={[
                { value: 'legal', label: 'Юридическое лицо' },
                { value: 'individual', label: 'Физическое лицо' },
              ]}
            />

            {personType === 'legal' ? (
              <div className="flex flex-col gap-[30px] lg:gap-4 xl:flex-row">
                <label className="flex h-12 flex-1 items-center justify-start gap-3 rounded-[10px] border border-[#FDFEFF]/50 bg-[#2A2A2A] p-4 text-base font-normal text-[#FDFEFF] sm:h-14 sm:rounded-xl sm:border-white/15 sm:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] sm:text-sm">
                  <img src={searchSvg} alt="" className="h-5 w-5 shrink-0 text-[#FDFEFF]" aria-hidden />
                  <Input
                    className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0"
                    placeholder="ИНН (ЮЛ, ФЛ) / ОГРН"
                    value={legalQuery}
                    onChange={(event) => setLegalQuery(event.target.value)}
                  />
                </label>

                <Button className="min-w-[188px]" onClick={handleCheck}>
                  Проверить
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_188px]">
                <Label variant="stack">
                  <LabelCaption className="text-xs uppercase tracking-[0.12em]">ФИО</LabelCaption>
                  <Input placeholder="Введите ФИО" value={fio} onChange={(e) => setFio(e.target.value)} />
                </Label>
                <Label variant="stack">
                  <LabelCaption className="text-xs uppercase tracking-[0.12em]">Дата рождения</LabelCaption>
                  <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </Label>
                <Label variant="stack">
                  <LabelCaption className="text-xs uppercase tracking-[0.12em]">ИНН</LabelCaption>
                  <Input placeholder="Введите ИНН" value={individualInn} onChange={(e) => setIndividualInn(e.target.value)} />
                </Label>

                <Button className="h-12 self-end" onClick={handleCheck}>
                  Проверить
                </Button>
              </div>
            )}

            <MoreDetailsSection className="">
              <div className="space-y-4 text-[#FDFEFF]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[16px] lg:text-[24px] text-[#FDFEFF]/80">С баланса будет списано:</span>
                  <span className="text-[16px] lg:text-[24px] font-semibold">100 ₽</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[16px] lg:text-[24px] text-[#FDFEFF]/80">Ваш текущий тариф:</span>
                  <span className="text-[16px] lg:text-[24px] font-semibold">Индивидуальный</span>
                </div>
              </div>
            </MoreDetailsSection>
          </Card>
      </PageSection>

      {reportState !== 'idle' ? (
        <section className={uiTokens.container}>
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
                <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
                  <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Отчет готов</h3>
                  <p className="m-0 text-[#FDFEFF]">Отчет успешно сформирован. Вы можете посмотреть или скачать его</p>
                  <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#2C6B3B] bg-[#1E2D21] px-4 text-xs font-medium text-[#45C857]">
                    Успешно
                  </div>
                  <ReportActions
                    onOpen={() => setShowInlineReport(true)}
                    openLabel="Открыть отчет"
                    downloadLabel="Скачать отчет"
                    fullWidthMobile
                  />
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
                    <Button variant="ghost" className="font-medium text-[#FDFEFF] underline underline-offset-4 hover:text-[#FDFEFF]">
                      Написать в поддержку
                    </Button>
                  </p>
                </div>
              ) : null}
          </Card>
        </section>
      ) : null}

      {reportState === 'ready' && showInlineReport ? (
        <section className={uiTokens.container}>
          <Card className="overflow-hidden">
            <ReportContent item={reportItem} />
          </Card>
        </section>
      ) : null}

      <SupportSection />
    </PageLayout>
  );
}
