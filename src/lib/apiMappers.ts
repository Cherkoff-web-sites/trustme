import type { TransactionRow } from '../components/features/balance/TransactionTable';
import type { HistoryItem } from '../shared/ReportContent';
import type {
  PaymentStatusResponse,
  ReportResponse,
  SubscriptionCatalogResponse,
  SubscriptionStatusResponse,
  TariffResponse,
  TransactionResponse,
} from '../types/api';

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}, ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
}

function formatAmount(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function extractString(input: unknown): string | null {
  return typeof input === 'string' && input.trim() ? input.trim() : null;
}

export function getReportSource(report: ReportResponse): 'telegram' | 'web' {
  const source = extractString((report.query as Record<string, unknown>).source);
  return source === 'telegram' ? 'telegram' : 'web';
}

function getReportName(report: ReportResponse): string {
  const query = report.query as Record<string, unknown>;
  if (report.subject_type === 'legal') {
    return extractString(query.company_name) ?? extractString(query.name) ?? extractString(query.inn) ?? `Отчёт #${report.id}`;
  }

  const parts = [extractString(query.lastname), extractString(query.firstname), extractString(query.middlename)].filter(Boolean);
  if (parts.length) return parts.join(' ').toUpperCase();
  return extractString(query.fio) ?? extractString(query.inn) ?? `Отчёт #${report.id}`;
}

function getReportDocument(report: ReportResponse): string {
  const query = report.query as Record<string, unknown>;
  const inn = extractString(query.inn);
  if (inn) return `ИНН: ${inn}`;
  const fullname = [extractString(query.lastname), extractString(query.firstname), extractString(query.middlename)]
    .filter(Boolean)
    .join(' ');
  if (fullname) return `ФИО: ${fullname}`;
  return `Запрос #${report.id}`;
}

function getReportBirthDate(report: ReportResponse): string | undefined {
  const birthday = extractString((report.query as Record<string, unknown>).birthday);
  if (!birthday) return undefined;
  const date = new Date(birthday);
  if (!Number.isNaN(date.getTime())) return formatDate(birthday);
  const normalized = birthday.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!normalized) return birthday;
  return `${normalized[3]}.${normalized[2]}.${normalized[1]}`;
}

export function getReportDotColor(report: ReportResponse): string {
  if (report.status === 'failed') return 'bg-[#F45353]';
  if (report.status === 'ready') return 'bg-[#45C857]';
  return 'bg-[#E6B344]';
}

export function mapReportToHistoryItem(report: ReportResponse): HistoryItem {
  return {
    id: report.id,
    type: report.subject_type === 'legal' ? 'Юридическое лицо' : 'Физическое лицо',
    name: getReportName(report),
    dotColor: getReportDotColor(report),
    document: getReportDocument(report),
    birthDate: getReportBirthDate(report),
    checkedAt: formatDateTime(report.created_at),
    duration: report.status === 'ready' ? 'Готово' : report.status === 'failed' ? 'Ошибка' : 'В обработке',
    source: getReportSource(report),
    success: report.status === 'ready',
    resultHtml: report.result_html,
  };
}

export function mapTransactionToRow(item: TransactionResponse): TransactionRow {
  const source = item.description.toLowerCase().includes('telegram') ? 'telegram' : 'web';
  return {
    date: formatDate(item.created_at),
    type: item.type === 'charge' ? 'Списание' : 'Поступление',
    source,
    amount: formatAmount(item.amount),
  };
}

export function getTariffLabel(tariff: TariffResponse | null): string {
  if (!tariff) return '—';
  const includedCount = [tariff.include_factors, tariff.include_media, tariff.include_telegram].filter(Boolean).length;
  if (includedCount >= 3) return 'Профессиональный';
  if (tariff.include_factors && includedCount === 1) return 'Базовый';
  return 'Индивидуальный';
}

export function getTariffFeatureItems(tariff: TariffResponse | null) {
  if (!tariff) return [];
  return [
    { label: 'Упоминания в Telegram', positive: tariff.include_telegram },
    { label: 'Упоминания в СМИ', positive: tariff.include_media },
    { label: 'Все факторы проверок', positive: tariff.include_factors },
  ];
}

export function getSubscriptionBanner(status: SubscriptionStatusResponse | null): string | null {
  if (!status?.has_active_subscription || !status.subscription_expires_at) return null;
  const expiry = new Date(status.subscription_expires_at);
  if (Number.isNaN(expiry.getTime())) return null;
  const diffMs = expiry.getTime() - Date.now();
  const daysLeft = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  if (daysLeft < 0) return 'Подписка истекла. Продлите тариф, чтобы сохранить доступ к сервису.';
  return `Подписка действует еще ${daysLeft} дн. Продлите тариф заранее, чтобы избежать перерыва в доступе.`;
}

export function getCatalogMonthPrice(catalog: SubscriptionCatalogResponse | null, months: 1 | 3 | 6 | 12): number {
  if (!catalog) return 0;
  if (months === 1) return catalog.subscription_price_1_month;
  if (months === 3) return catalog.subscription_price_3_months;
  if (months === 6) return catalog.subscription_price_6_months;
  return catalog.subscription_price_12_months;
}

export function isPaymentSuccessful(status: PaymentStatusResponse): boolean {
  const normalized = status.status.trim().toLowerCase();
  const local = (status.local_order_status ?? '').trim().toLowerCase();
  return Boolean(status.activated) || ['succeeded', 'success', 'paid'].includes(normalized) || ['paid', 'activated'].includes(local);
}

export function downloadHtmlReport(report: ReportResponse | null) {
  if (!report?.result_html) return;
  const blob = new Blob([report.result_html], { type: 'text/html;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `report-${report.id}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}
