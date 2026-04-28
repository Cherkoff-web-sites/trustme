import { Fragment } from 'react';
import { Card, CardHeaderDecorDivider, designTokens } from '../components/ui';
import decorReportMob from '../assets/decor_report_mob.png';
import decorReportPc from '../assets/decor_report_pc.png';
import logoReportSvg from '../assets/logo_report.svg';
import { cn } from '../lib/cn';
import { uiFlags } from '../config/uiFlags';

export type HistoryItem = {
  id?: number;
  type: string;
  name: string;
  dotColor: string;
  document: string;
  birthDate?: string;
  checkedAt: string;
  duration: string;
  source: 'telegram' | 'web';
  success: boolean;
  statusVariant?: 'positive' | 'negative';
  statusText?: string;
  financialReportVariant?: 'basic' | 'extended';
  resultHtml?: string | null;
};

const reportHeaderInsetShadow = 'inset -5px 5px 20px #0EB8D2, inset -5px -5px 20px #0EB8D2';
const reportPrimaryInfoFields = [
  {
    label: 'Документ',
    values: ['ИНН: 7811657720', 'ОГРН: 1177847261602'],
  },
  {
    label: 'Руководитель',
    values: ['Попов Сергей Викторович', 'ИНН: 760214265643'],
  },
  {
    label: 'Адрес',
    values: ['121087, г. Москва, ул. Барклая, д. 6, стр. 3, помещ. 8/28'],
  },
  {
    label: 'Учредители',
    values: ['Информация не найдена'],
  },
] as const;

const reportFinanceMetrics = [
  { label: 'Выручка', color: '#0EB8D2', amountLabel: '68.19 млрд', value: 68.19, deltaLabel: '+92.96% ₽*', deltaType: 'success' },
  { label: 'Прибыль', color: '#057889', amountLabel: '10.69 млрд', value: 10.69, deltaLabel: '+12.39% ₽*', deltaType: 'error' },
  { label: 'Налоги', color: '#EBA535', amountLabel: '6.42 млрд', value: 6.42, deltaLabel: null, deltaType: null },
] as const;
const reportFinanceYears = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'] as const;
const reportFinanceExtendedCards = [
  {
    title: 'Активы',
    rows: [
      { label: 'Баланс (актив)', value: '741.77 млн ₽' },
      { label: 'Внеоборотные активы', value: '688.6 млн ₽' },
      { label: 'Оборотные активы', value: '53.17 млн ₽' },
    ],
  },
  {
    title: 'Пассивы',
    rows: [
      { label: 'Баланс (актив)', value: '741.77 млн ₽' },
      { label: 'Капитал', value: '-761.13 млн ₽' },
      { label: 'Долгосрочные обязательства', value: '1.06 млрд ₽' },
      { label: 'Краткосрочные обязательства', value: '1.5 млрд ₽' },
    ],
  },
  {
    title: 'Выручка и прибыль',
    rows: [
      { label: 'Выручка', value: '4.97 млн ₽' },
      { label: 'Валовая прибыль', value: '2.21 млн ₽' },
      { label: 'Прибыль от продаж', value: '2.21 млн ₽' },
      { label: 'Прибыль до налогообложения', value: '4.14 млн ₽' },
      { label: 'Налог на прибыль', value: '-828.0 тыс ₽' },
    ],
  },
] as const;
const reportArbitrationBlocks = [
  {
    title: 'За последний год',
    rows: [
      { label: 'Истец:', value: '10.02 млн ₽' },
      { label: 'Ответчик:', value: '22.65 млн ₽' },
    ],
  },
  {
    title: 'За все время',
    rows: [
      { label: 'Истец:', value: '44.3 млн ₽' },
      { label: 'Ответчик:', value: '36.8 млн ₽' },
    ],
  },
] as const;
const reportExpressNegativeFactors = [
  { title: 'Исполнительные производства', value: 'Найдено 39.72 тыс' },
  { title: 'Количество арбитражных дел в качестве ответчика на общую сумму за текущий год', value: '5.21 млн' },
] as const;
const reportExpressNegativeFactorsPerson = [
  { title: 'Розыск МВД (за все время)', value: 'Найдено' },
  { title: 'Банкротство', value: 'Найдено' },
  { title: 'Налоговая задолженность', value: 'Найдено 150 368,52 руб' },
  { title: 'Приостановка счетов', value: 'Найдено' },
] as const;
const reportExpressPositiveFactors = [
  { title: 'Завершённая процедура банкротства', value: 'Не найдено' },
  { title: 'Организация в процессе реорганизации', value: 'Не найдено' },
  { title: 'Организация ликвидирована или ликвидируется', value: 'Не найдено' },
  { title: 'Наличие сообщений о завершенной процедуре банкротства менее 3 лет назад', value: 'Не найдено' },
  { title: 'Подано заявление на ликвидацию', value: 'Не найдено' },
  { title: 'Обнаружены сообщения о текущей процедуре банкротства', value: 'Не найдено' },
  { title: 'Причастность к ЮЛ, в отношении которого в ЕГРЮЛ внесена запись о недостоверности', value: 'Не найдено' },
  { title: 'Организация в реестре недобросовестных поставщиков', value: 'Не найдено' },
  { title: 'Причастность к ЮЛ, в отношении которого в ЕГРЮЛ внесена запись о недостоверности', value: 'Не найдено' },
  { title: 'Организация в реестре недобросовестных поставщиков', value: 'Не найдено' },
  { title: 'Массовый учредитель', value: 'Не найдено' },
  { title: 'Санкционный список', value: 'Не найдено' },
  { title: 'Организация не предоставляет налоговую отчетность более года', value: 'Не найдено' },
  { title: 'Наличие сведений в перечне организаций и физических лиц, в отношении которых имеются сведения об их причастности к терроризму, экстремистской деятельности, распространению оружия массового уничтожения или финансирования указанной деятельности', value: 'Не найдено' },
  { title: 'Приостановление операций по счетам организации', value: 'Не найдено' },
  { title: 'Сведения о лицах, подпадающих под условия, предусмотренные подпунктом «ф» пункта 1 статьи 23 закона о регистрации (Федеральный закон от 08.08.2001 № 129-ФЗ)', value: 'Не найдено' },
  { title: 'Наличие просроченной задолженности по начисленным налогам, сборам, соответствующим пеням и штрафам, иным обязательным платежам в бюджеты бюджетной системы Российской Федерации и государственные внебюджетные фонды', value: 'Не найдено' },
  { title: 'Компания с выявленными признаками нелегальной деятельности на финансовом рынке', value: 'Не удалось получить данные' },
] as const;
const reportExpressPositiveFactorsPerson = [
  { title: 'Спонсор ФБК', value: 'Не найдено' },
  { title: 'Реестр коррупционеров', value: 'Не найдено' },
  { title: 'Обременения', value: 'Не найдено' },
  { title: 'Торги', value: 'Не найдено' },
  { title: 'Перечень террористов и экстремистов', value: 'Не найдено' },
  { title: 'Реестр иностранных агентов', value: 'Не найдено' },
  { title: 'Реестр дисквалифицированных лиц', value: 'Не найдено' },
  { title: 'Организация в реестре недобросовестных поставщиков', value: 'Не найдено' },
  { title: 'Реестр субсидиарных ответчиков', value: 'Не найдено' },
] as const;
const reportTelegramMentions = [
  {
    sourceUrl: 'https://t.me/mk_ru',
    messages: [
      {
        paragraphs: [
          'В российских магазинах стартовали продажи смартфонов HONOR 200 и 200 Pro. Они созданы совместно с легендарным парижским фотоателье Harcourt. Вы получите идеальные портретные фото на камеру 50 МП и уникальный портретный режим Harcourt — съемка с ИИ-алгоритмами. Новинку отличает кремний-углеродная батарея на 5200 мАч, мощный процессор, объем памяти 12 + 512 ГБ и быстрая зарядка. HONOR 200 и 200 Pro уже доступны для покупки в России, а с 30 июля по 12 августа в DNS действует скидка 5 000 рублей, вместе с которой покупатели получают умные часы HONOR CHOICE Watch в подарок. Срок проведения акции с 30.07.2024 по 12.08.2024. Подробности об организаторе акции, правилах ее проведения, количестве призов, сроках, месте и порядке их получения уточняйте на сайте https://www.dns-shop.ru ООО "ДНС РИТЕЙЛ", ОГРН 1102540008230, 690068, Приморский край, г. Владивосток, пр-кт 100-летия Владивостока, д. 155, корпус 3 офис 5 ERID: 2Vtzqwc9sx7. Реклама. ИНН: 5024177951. ООО "АБСОЛЮТ ТРЕЙД"',
        ],
        date: '30.07.2024, 15:25',
        messageUrl: 'https://t.me/mk_ru',
      },
    ],
  },
  {
    sourceUrl: 'https://t.me/sportsru',
    messages: [
      {
        paragraphs: [
          'Всего 42% пользователей доходят до конца этой игры 👀',
          'Проверьте себя и получите промокод на скидку 👇',
          'https://sirena.world/fRtKqlT',
          'Kra23nNxg',
          'Реклама. ООО «Умный ритейл»',
        ],
        date: '18.07.2023, 13:59',
        messageUrl: 'https://t.me/sportsru',
      },
      {
        paragraphs: [
          'Выиграйте Олимпийские игры и заберите приз 🏆',
          'Попробуйте себя в 4 мини-играх!',
          'https://sirena.world/LwaM1oT',
          'Kra23oitQ',
          'Реклама. ООО «Умный ритейл»',
        ],
        date: '15.07.2024, 15:28',
        messageUrl: 'https://t.me/sportsru',
      },
    ],
  },
] as const;
const reportMediaMentions = [
  {
    sourceUrl: '@tanja.fil2016',
    messages: [
      {
        paragraphs: [
          'Семейный вечер — это про уют и вкусняшки!',
          'Вдруг захотелось устроить спонтанный киносеанс всей семьей, а дома ничего нет?',
          'Всего 15 минут — и курьер «Самоката» уже у вашей двери с любимым попкорном, сочными снеками и даже вкусняшками для вашего хвостика.',
          'Промокоды:',
          '78BBAWB — скидка 20% на один любой заказ от 1000 ₽ (максимальная сумма скидки 300 ₽)',
          'ARX8FJ — скидка 400 ₽ при заказе от 900 ₽. Суммируется со всеми акциями!',
          'MMTFD — скидка 50% при заказе от 700 ₽ (макс. 500 ₽). (Не суммируется с другими скидками).',
          'Закажите своё семейное счастье: https://samokat.prfl.me/tanja.fil2016',
          'Реклама. ООО «УМНЫЙ РИТЕЙЛ», ИНН: 7811657720',
        ],
        date: '12.10.2025, 07:49',
        messageUrl: 'https://samokat.prfl.me/tanja.fil2016',
      },
      {
        paragraphs: [
          'Десерты от Самоката заказываем по ссылке https://samokat.prfl.me/ruzannaita',
          'N2ATQ6 — скидка 20% от 1000 ₽ (максимум 300 ₽) на один любой заказ',
          'Реклама. ООО «Умный Ритейл», ИНН 7811657720.',
        ],
        date: '11.10.2025, 13:59',
        messageUrl: 'https://samokat.prfl.me/ruzannaita',
      },
    ],
  },
] as const;
const reportFinalAssessment = {
  riskLevel: 'low' as 'low' | 'high',
  negativeFactors: 2,
  positiveFactors: 18,
};
const reportPersonWarningText =
  'Фонд борьбы с коррупцией включён в реестр НКО, выполняющих функции иностранного агента, по решению Министерства юстиции РФ от 09.10.2019; организация признана экстремистской, её деятельность запрещена на территории России по решению Мосгорсуда от 09.06.2021';

function ReportMinusIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ReportCheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ReportTelegramIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 20L21 5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 5L2 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 20L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12.5L9 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16L9 19V13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportExternalLinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5H5V19H19V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReportContent({ item }: { item: HistoryItem }) {
  if (!uiFlags.reportViewsEnabled) {
    return null;
  }

  if (item.resultHtml) {
    return (
      <Card as="div" className={cn('overflow-hidden')}>
        <iframe
          title={`Отчёт ${item.name}`}
          srcDoc={item.resultHtml}
          sandbox=""
          className="h-[70vh] min-h-[520px] w-full rounded-[20px] border-0 bg-white"
        />
      </Card>
    );
  }

  const financeCircleRadius = 44;
  const financeStrokeWidth = 10;
  const financeCircleLength = 2 * Math.PI * financeCircleRadius;
  const financeGapTarget = 2;
  const financeGeometricGap = financeStrokeWidth + financeGapTarget;
  const financeTotalGaps = financeGeometricGap * reportFinanceMetrics.length;
  const financeDrawableLength = Math.max(0, financeCircleLength - financeTotalGaps);
  const financeShareTotal = reportFinanceMetrics.reduce((sum, segment) => sum + segment.value, 0);
  const financeDashLengths = reportFinanceMetrics.map((segment) =>
    financeShareTotal > 0 ? (segment.value / financeShareTotal) * financeDrawableLength : 0,
  );
  const isPersonReport = item.type === 'Физическое лицо';
  const showExtendedFinanceReport = item.financialReportVariant === 'extended';
  const isNegativeStatus = item.statusVariant ? item.statusVariant === 'negative' : !item.success;
  const primaryStatusText =
    item.statusText ??
    (isNegativeStatus
      ? 'Юридическое лицо признано несостоятельным (банкротом) и в отношении него открыто конкурсное производство'
      : 'Действует');
  const personStatusText = item.statusText ?? 'ИП. Данные по ИП не получены';
  const personFio = item.name
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  const expressNegativeFactors = isPersonReport ? reportExpressNegativeFactorsPerson : reportExpressNegativeFactors;
  const expressPositiveFactors = isPersonReport ? reportExpressPositiveFactorsPerson : reportExpressPositiveFactors;
  const expressNegativeCount = expressNegativeFactors.length;
  const expressPositiveCount = expressPositiveFactors.length;
  const finalRiskBadgeClassName =
    reportFinalAssessment.riskLevel === 'high'
      ? 'inline-flex items-center gap-[10px] rounded-[12px] border border-[#EB4335]/60 bg-[#2A2A2A] px-[15px] py-[10px] text-[#FDFEFF]'
      : 'inline-flex items-center gap-[10px] rounded-[12px] border border-[#34A853]/60 bg-[#2A2A2A] px-[15px] py-[10px] text-[#FDFEFF]';

  return (
    <Card
      as="div"
      className={cn('overflow-hidden text-base font-normal lg:text-[18px]')}
      contentClassName="gap-4 sm:gap-6"
    >
      <Card
        as="header"
        className={cn('relative isolate overflow-hidden bg-[#101010]')}
        contentClassName="gap-0"
        style={{ boxShadow: reportHeaderInsetShadow }}
      >
        <Fragment>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-right bg-no-repeat lg:hidden"
            style={{ backgroundImage: `url(${decorReportMob})` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 hidden bg-cover bg-right bg-no-repeat lg:block"
            style={{ backgroundImage: `url(${decorReportPc})` }}
          />
          <div className="relative z-[1] flex flex-col">
            <img
              src={logoReportSvg}
              alt="Trust Me"
              width={137}
              height={60}
              className="h-auto w-[74px] shrink-0 sm:w-[120px] lg:w-[137px] mb-[60px]"
              decoding="async"
            />
            <h3 className="uppercase m-0 text-[24px] font-semibold text-[#FDFEFF] lg:text-[36px] leading-[29px] lg:leading-[44px]">
              {item.name}
            </h3>
            <p className="m-0 mt-[30px] text-[#FDFEFF] text-[16px] lg:text-[24px]">
              {item.type === 'Юридическое лицо' ? 'Отчёт по организации' : 'Основной отчет по физическому лицу'}
            </p>
          </div>
        </Fragment>
      </Card>

      <Card
        as="section"
        title="Основная информация"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[30px]"
      >
        {isPersonReport ? (
          <div className="grid gap-y-[30px] lg:grid-cols-3 lg:gap-x-[45px]">
            <div className="flex flex-col gap-[30px]">
              <h5 className="m-0 font-semibold text-[#FDFEFF]">Статус</h5>
              <div className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px]">
                <span className={isNegativeStatus ? designTokens.colors.text.statusError : designTokens.colors.text.statusSuccess}>
                  {personStatusText}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[30px]">
              <h5 className="m-0 font-semibold text-[#FDFEFF]">ФИО</h5>
              <div className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px] text-[#FDFEFF]">{personFio || item.name}</div>
            </div>
            <div className="flex flex-col gap-[30px]">
              <h5 className="m-0 font-semibold text-[#FDFEFF]">Дата рождения</h5>
              <div className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px] text-[#FDFEFF]">{item.birthDate ?? '—'}</div>
            </div>
          </div>
        ) : (
          <div className="grid gap-y-[30px] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] lg:gap-x-[45px]">
            <div className="flex flex-col gap-[30px]">
              <h5 className="m-0 font-semibold text-[#FDFEFF]">Статус</h5>
              <div className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px]">
                <span className={isNegativeStatus ? designTokens.colors.text.statusError : designTokens.colors.text.statusSuccess}>
                  {primaryStatusText}
                </span>
              </div>
            </div>

            {reportPrimaryInfoFields.map((field) => (
              <div className="flex flex-col gap-[30px]" key={field.label}>
                <h5 className="m-0 font-semibold text-[#FDFEFF]">{field.label}</h5>
                <div className="flex flex-col gap-[15px]">
                  {field.values.map((value) => (
                    <div
                      className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px] text-[#FDFEFF]"
                      key={`${field.label}-${value}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {!isPersonReport ? (
      <Card
        as="section"
        title="Финансовый отчет"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[30px]"
      >
        <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col items-center gap-y-[40px] lg:flex-row lg:items-center lg:gap-x-[60px]">
          <div className="mx-auto">
            <div className="relative h-[198px] w-[198px] lg:h-[264px] lg:w-[264px]">
              <svg viewBox="0 0 120 120" className="h-full w-full" aria-label="Диаграмма финансового отчета">
                <g transform="rotate(180 60 60)">
                  {reportFinanceMetrics.map((segment, index) => {
                    const currentDash = financeDashLengths[index] ?? 0;
                    const previousTotal = financeDashLengths
                      .slice(0, index)
                      .reduce((sum, len) => sum + len, 0);
                    const dashOffset = -(previousTotal + financeGeometricGap * index);

                    return (
                      <circle
                        key={segment.color}
                        cx="60"
                        cy="60"
                        r={financeCircleRadius}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth={financeStrokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${currentDash} ${Math.max(0, financeCircleLength - currentDash)}`}
                        strokeDashoffset={dashOffset}
                      />
                    );
                  })}
                </g>
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-semibold text-[#FDFEFF]">
                2022 год
              </div>
            </div>
          </div>

          <div className="w-full rounded-[20px] bg-[#2A2A2A] px-[15px] py-[30px] lg:px-[30px] lg:py-[30px]">
            <div className="grid gap-y-[30px] lg:grid-cols-[max-content_max-content] lg:gap-x-[100px]">
              <div className="flex flex-col gap-[15px] lg:w-auto">
                <h5 className="m-0 font-semibold text-[#FDFEFF]">Анализ данных</h5>

                <div className="flex flex-col gap-[15px]">
                  {reportFinanceMetrics.map((metric) => (
                    <div className="flex items-center gap-[20px] lg:gap-[100px]" key={metric.label}>
                      <div className="flex items-center gap-[10px]">
                        <span className="h-[20px] w-[20px] rounded-full" style={{ backgroundColor: metric.color }} />
                        <span className="text-[#FDFEFF]">{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <span className="font-semibold text-[#FDFEFF]">{metric.amountLabel}</span>
                        {metric.deltaLabel ? (
                          <span
                            className={`rounded-[100px] px-[5px] py-[5px] text-[7px] leading-none lg:px-[16px] lg:py-[10px] lg:text-[12px] ${metric.deltaType === 'success' ? designTokens.colors.status.successBg : designTokens.colors.status.errorBg} ${designTokens.colors.text.primary}`}
                          >
                            {metric.deltaLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                <p className={`m-0 ${designTokens.colors.text.primary}`}>* по сравнению с предыдущим годом</p>
              </div>

              <div className="flex flex-col gap-[15px]">
                <h5 className="m-0 font-semibold text-[#FDFEFF]">Уставной капитал</h5>
                <div className="rounded-[16px] bg-[#3A3A3A] px-[15px] py-[15px] font-semibold text-[#FDFEFF]">
                  1.1 млн ₽
                </div>
              </div>
            </div>
          </div>
        </div>

        {showExtendedFinanceReport ? (
          <div className="flex flex-col gap-[20px] lg:gap-[30px]">
            <h5 className="m-0 font-semibold text-[#FDFEFF]">Расширенный финансовый отчёт по годам</h5>
            <div className="flex flex-wrap gap-[10px] lg:gap-[15px]">
              {reportFinanceYears.map((year) => (
                <span
                  key={year}
                  className="inline-flex min-h-[34px] min-w-[64px] items-center justify-center rounded-[100px] border border-[#FDFEFF]/20 bg-[#2A2A2A] px-[18px] py-[8px] text-[#FDFEFF]/60"
                >
                  {year}
                </span>
              ))}
            </div>

            <div className="grid gap-[20px] lg:grid-cols-3 lg:gap-[25px]">
              {reportFinanceExtendedCards.map((block) => (
                <div key={block.title} className="rounded-[20px] bg-[#2A2A2A] px-[20px] py-[20px]">
                  <h5 className="m-0 font-semibold text-[#0EB8D2]">{block.title}</h5>
                  <div className="mt-[20px] flex flex-col">
                    {block.rows.map((row, index) => (
                      <div
                        key={`${block.title}-${row.label}`}
                        className={`grid grid-cols-[1fr_auto] items-center gap-[20px] py-[10px] ${index > 0 ? 'border-t border-[#FDFEFF]/15' : ''}`}
                      >
                        <span className="text-[#FDFEFF]">{row.label}</span>
                        <span className="font-semibold text-[#FDFEFF]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-[20px] bg-[#2A2A2A] px-[20px] py-[20px] lg:col-span-1">
                <h5 className="m-0 font-semibold text-[#0EB8D2]">Чистая прибыль</h5>
                <div className="mt-[20px] grid grid-cols-[1fr_auto] items-center gap-[20px]">
                  <span className="text-[#FDFEFF]">Чистая прибыль</span>
                  <span className="font-semibold text-[#FDFEFF]">3.31 млн ₽</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        </div>
      </Card>
      ) : null}

      <Card
        as="section"
        title="Арбитражные суды"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[30px]"
      >
        <div className="grid gap-[20px] lg:grid-cols-2 lg:gap-[30px]">
          {reportArbitrationBlocks.map((block) => (
            <div className="rounded-[20px] bg-[#2A2A2A] px-[20px] py-[20px]" key={block.title}>
              <h5 className="m-0 font-semibold text-[#0EB8D2]">{block.title}</h5>
              <div className="mt-[20px] flex flex-col">
                {block.rows.map((row, index) => (
                  <div
                    className={`flex items-center justify-between py-[10px] ${index > 0 ? 'border-t border-[#FDFEFF]/15' : ''}`}
                    key={`${block.title}-${row.label}`}
                  >
                    <span className="text-[#FDFEFF]">{row.label}</span>
                    <span className="font-semibold text-[#FDFEFF]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        as="section"
        title="Экспресс-отчет"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[30px]"
      >
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[30px] lg:flex-row lg:items-center lg:justify-between">
            <h5 className="m-0 text-[16px] lg:text-[24px] font-semibold text-[#FDFEFF]">Итог экспресс-отчета</h5>
            <div className="grid gap-[15px] lg:grid-cols-2">
              <div className="inline-flex items-center gap-[10px] rounded-[12px] border border-[#EB4335]/60 bg-[#2A2A2A] px-[15px] py-[10px] text-[#FDFEFF]">
                <ReportMinusIcon className="text-[#EB4335]" />
                <span className="font-semibold">Отрицательные факторы: {expressNegativeCount}</span>
              </div>
              <div className="inline-flex items-center gap-[10px] rounded-[12px] border border-[#34A853]/60 bg-[#2A2A2A] px-[15px] py-[10px] text-[#FDFEFF]">
                <ReportCheckIcon className="text-[#34A853]" />
                <span className="font-semibold">Положительные факторы: {expressPositiveCount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[30px]">
            <h5 className="m-0 text-[16px] lg:text-[24px] font-semibold text-[#FDFEFF]">Отрицательные факторы</h5>
            <div className="grid gap-[30px] lg:grid-cols-3">
              {expressNegativeFactors.map((factor) => (
                <div className="rounded-[20px] bg-[#2A2A2A] px-[20px] py-[20px]" key={factor.title}>
                  <div className="flex items-start gap-[15px]">
                    <span className="rounded-[10px] bg-[#EB4335] p-[10px] text-[#FDFEFF]">
                      <ReportMinusIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="m-0 text-[#FDFEFF]">{factor.title}</p>
                      <div className="mt-[15px] rounded-[10px] bg-[#3A3A3A] px-[15px] py-[10px] text-[#FDFEFF]">
                        {factor.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[30px]">
            <h5 className="m-0 text-[16px] lg:text-[24px] font-semibold text-[#FDFEFF]">Положительные факторы</h5>
            <div className="grid gap-[30px] lg:grid-cols-3">
              {expressPositiveFactors.map((factor) => (
                <div className="rounded-[20px] bg-[#2A2A2A] px-[20px] py-[20px]" key={factor.title}>
                  <div className="flex items-start gap-[15px]">
                    <span className="rounded-[10px] bg-[#34A853] p-[10px] text-[#FDFEFF]">
                      <ReportCheckIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="m-0 text-[#FDFEFF]">{factor.title}</p>
                      <div className="mt-[15px] rounded-[10px] bg-[#3A3A3A] px-[15px] py-[10px] text-[#FDFEFF]">
                        {factor.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card
        as="section"
        title="Упоминания в Telegram"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[20px] lg:gap-[30px]"
      >
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          {reportTelegramMentions.map((channel) => (
            <div className="rounded-[20px] bg-[#2A2A2A] px-[15px] py-[15px] lg:px-[30px] lg:py-[30px]" key={channel.sourceUrl}>
              <div className="flex flex-col gap-[20px] lg:gap-[30px]">
                <div className="flex items-center gap-[10px] text-[#0EB8D2]">
                  <ReportTelegramIcon className="h-6 w-6 shrink-0" />
                  <span className="text-[16px] font-semibold lg:text-[20px]">{channel.sourceUrl}</span>
                </div>

                <div className="flex flex-col gap-[20px] lg:gap-[30px]">
                  {channel.messages.map((message, index) => (
                    <div className="rounded-[10px] bg-[#393939] px-[15px] py-[15px]" key={`${channel.sourceUrl}-${index}`}>
                      <div className="flex flex-col gap-[15px] lg:gap-[30px]">
                        {message.paragraphs.map((paragraph, paragraphIndex) => (
                          <p className="m-0 text-[#FDFEFF]" key={`${channel.sourceUrl}-${index}-${paragraphIndex}`}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-[15px] flex items-center justify-between gap-4">
                        <span className="text-[#FDFEFF]/70">{message.date}</span>
                        <a
                          href={message.messageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-[10px] bg-transparent p-0 font-semibold text-[#FDFEFF]"
                        >
                          <span>Перейти к сообщению</span>
                          <ReportExternalLinkIcon className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        as="section"
        title="Упоминания в СМИ"
        headerDecor={<CardHeaderDecorDivider />}
        contentClassName="gap-[20px] lg:gap-[30px]"
      >
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          {reportMediaMentions.map((channel) => (
            <div className="rounded-[20px] bg-[#2A2A2A] px-[15px] py-[15px] lg:px-[30px] lg:py-[30px]" key={channel.sourceUrl}>
              <div className="flex flex-col gap-[20px] lg:gap-[30px]">
                <div className="flex items-center gap-[10px] text-[#0EB8D2]">
                  <ReportTelegramIcon className="h-6 w-6 shrink-0" />
                  <span className="text-[16px] font-semibold lg:text-[20px]">{channel.sourceUrl}</span>
                </div>

                <div className="flex flex-col gap-[20px] lg:gap-[30px]">
                  {channel.messages.map((message, index) => (
                    <div className="rounded-[10px] bg-[#393939] px-[15px] py-[15px]" key={`${channel.sourceUrl}-${index}`}>
                      <div className="flex flex-col gap-[15px] lg:gap-[30px]">
                        {message.paragraphs.map((paragraph, paragraphIndex) => (
                          <p className="m-0 text-[#FDFEFF]" key={`${channel.sourceUrl}-${index}-${paragraphIndex}`}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-[15px] flex items-center justify-between gap-4">
                        <span className="text-[#FDFEFF]/70">{message.date}</span>
                        <a
                          href={message.messageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-[10px] bg-transparent p-0 font-semibold text-[#FDFEFF]"
                        >
                          <span>Перейти к статье</span>
                          <ReportExternalLinkIcon className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card as="section" contentClassName="gap-[20px] lg:gap-[30px]">
        <div className="flex items-center gap-[12px] lg:gap-[20px]">
          <div className="relative h-[5px] min-w-0 flex-1">
            <span className="absolute left-0 right-[2.5px] top-1/2 h-px -translate-y-1/2 bg-gradient-to-l from-[#FDFEFF]/80 to-transparent" />
            <span className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#FDFEFF]" />
          </div>
          <h3 className={cn('m-0 whitespace-nowrap', designTokens.typography.cardTitle, designTokens.colors.text.primary)}>
            ИТОГОВАЯ ОЦЕНКА
          </h3>
          <div className="relative h-[5px] min-w-0 flex-1">
            <span className="absolute left-[2.5px] right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#FDFEFF]/80 to-transparent" />
            <span className="absolute left-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#FDFEFF]" />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-[30px] text-center lg:max-w-none">
          <p className="m-0 max-w-[880px] text-[#FDFEFF]">
            На основании проведенного анализа, {isPersonReport ? personFio || item.name : `организация ${item.name}`} имеет{' '}
            {reportFinalAssessment.riskLevel === 'high' ? 'высокий' : 'низкий'} уровень риска.
            <br />
            {isPersonReport
              ? `У физического лица обнаружено ${expressNegativeCount} отрицательных факторов и ${expressPositiveCount} положительных показателей.`
              : `Обнаружено ${reportFinalAssessment.negativeFactors} отрицательных факторов и ${reportFinalAssessment.positiveFactors} положительных показателей.`}
          </p>

          <div className={finalRiskBadgeClassName}>
            {reportFinalAssessment.riskLevel === 'high' ? (
              <ReportMinusIcon className="text-[#EB4335]" />
            ) : (
              <ReportCheckIcon className="text-[#34A853]" />
            )}
            <span className="font-semibold">
              {reportFinalAssessment.riskLevel === 'high' ? 'Высокий уровень риска' : 'Низкий уровень риска'}
            </span>
          </div>
        </div>
      </Card>

      {isPersonReport ? (
        <div className="rounded-[20px] border border-[#EB4335]/60 bg-[#2A2A2A] px-[15px] py-[15px] lg:px-[30px] lg:py-[20px]">
          <div className="flex items-start gap-[10px] text-[#FDFEFF]">
            <ReportMinusIcon className="mt-[2px] shrink-0 text-[#EB4335]" />
            <p className="m-0">{reportPersonWarningText}</p>
          </div>
        </div>
      ) : null}

      <div className="">
        <p className="text-center">
          Отчет сгенерирован: {item.checkedAt}
        </p>
        <p className="text-center">
          © 2025 Система анализа юридических лиц TrustMe. Все права защищены.
        </p>
      </div>
    </Card>
  );
}
