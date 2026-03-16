import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageStructure } from '../../components/layout/PageStructure/PageStructure';
import { PersonTypeSwitcher } from '../../components/features/PersonTypeSwitcher';
import { ReportActions } from '../../components/features/ReportActions';
import { SupportSection } from '../../components/features/Support/SupportSection';
import { Button, Card, Input, MoreDetailsSection, uiTokens } from '../../components/ui';
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
      <main className="pb-10 sm:pb-14">
        <PageStructure
          title="Новая проверка"
          description="Проверка осуществляется в рамках текущего тарифа. Стоимость проверки будет списана с вашего баланса"
        >
          <Card>
            <PersonTypeSwitcher
              className="mb-5 sm:gap-6"
              value={personType}
              onChange={setPersonType}
              options={[
                { value: 'legal', label: 'Юридическое лицо' },
                { value: 'individual', label: 'Физическое лицо' },
              ]}
            />

            {personType === 'legal' ? (
              <div className="flex flex-col gap-4 xl:flex-row">
                <label className="flex h-14 flex-1 justify-start gap-3 rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-4 text-sm text-white/55">
                  <img src={searchSvg} alt="" className="h-5 w-5 shrink-0 text-white/35" aria-hidden />
                  <Input
                    className="h-auto border-0 bg-transparent px-0 text-sm"
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
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">ФИО</span>
                  <Input placeholder="Введите ФИО" value={fio} onChange={(e) => setFio(e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">Дата рождения</span>
                  <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">ИНН</span>
                  <Input placeholder="Введите ИНН" value={individualInn} onChange={(e) => setIndividualInn(e.target.value)} />
                </label>

                <Button className="h-12 self-end" onClick={handleCheck}>
                  Проверить
                </Button>
              </div>
            )}

            <MoreDetailsSection className="mt-4">
              <p className="text-sm text-[#FDFEFF]/70">
                Здесь можно разместить дополнительные пояснения по работе проверки и использованию полей формы.
              </p>
            </MoreDetailsSection>
          </Card>
        </PageStructure>

        {reportState !== 'idle' ? (
          <section className={`${uiTokens.container} pt-4 sm:pt-6`}>
            <Card className="px-4 py-6 sm:px-6 sm:py-8" divider={false}>
              {reportState === 'loading' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                  <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Формируем отчет</h3>
                  <p className="m-0 text-[#FDFEFF]/65">Ожидайте, формирование отчета может занять до 10 минут</p>
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
                  <p className="m-0 text-[#FDFEFF]/65">Отчет успешно сформирован. Вы можете посмотреть или скачать его</p>
                  <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#2C6B3B] bg-[#1E2D21] px-4 text-xs font-medium text-[#45C857]">
                    Успешно
                  </div>
                  <ReportActions
                    onOpen={() => setShowInlineReport(true)}
                    openLabel="Открыть отчет"
                    downloadLabel="Скачать отчет"
                  />
                </div>
              ) : null}

              {reportState === 'error' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
                  <h3 className="text-[16px] font-semibold text-[#FDFEFF] lg:text-[24px]">Ошибка генерации отчета</h3>
                  <p className="m-0 max-w-[520px] text-sm text-white/65">
                    Отчет не удалось сформировать. Вы можете попробовать еще раз или написать в поддержку
                  </p>
                  <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#7A2F2F] bg-[#2A1B1B] px-4 text-xs font-medium text-[#FF7A7A]">
                    Ошибка
                  </div>
                  <p className="mt-4 text-[#FDFEFF]/65">
                    Что-то пошло не так?{' '}
                    <Button variant="ghost" className="font-medium text-white/85 underline underline-offset-4 hover:text-white">
                      Написать в поддержку
                    </Button>
                  </p>
                </div>
              ) : null}
            </Card>
          </section>
        ) : null}

        {reportState === 'ready' && showInlineReport ? (
          <section className={`${uiTokens.container} pt-6 sm:pt-8`}>
            <Card className="overflow-hidden" divider={false}>
              <ReportContent item={reportItem} />
            </Card>
          </section>
        ) : null}

        <SupportSection />
      </main>
    </PageLayout>
  );
}
