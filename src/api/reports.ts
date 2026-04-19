import { apiRequest } from './client';
import type {
  ReportCreateRequestLegal,
  ReportCreateRequestPhys,
  ReportResponse,
  ReportStatusSchema,
  SubjectTypeSchema,
} from '../types/api';

export type ListReportsFilters = {
  subject_type?: SubjectTypeSchema | '';
  status?: ReportStatusSchema | '';
  date_from?: string;
  date_to?: string;
};

function toQueryString(filters: ListReportsFilters): string {
  const params = new URLSearchParams();
  if (filters.subject_type) params.set('subject_type', filters.subject_type);
  if (filters.status) params.set('status', filters.status);
  if (filters.date_from) params.set('date_from', filters.date_from);
  if (filters.date_to) params.set('date_to', filters.date_to);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function createLegalReport(payload: ReportCreateRequestLegal, accessToken: string) {
  return apiRequest<ReportResponse>(
    '/api/v1/reports/legal',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function createPhysicalReport(payload: ReportCreateRequestPhys, accessToken: string) {
  return apiRequest<ReportResponse>(
    '/api/v1/reports/phys',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function listReports(filters: ListReportsFilters, accessToken: string) {
  return apiRequest<ReportResponse[]>(`/api/v1/reports/${toQueryString(filters)}`, {}, accessToken);
}

export async function waitForReportResolution(
  reportId: number,
  accessToken: string,
  opts: { timeoutMs?: number; intervalMs?: number } = {},
): Promise<ReportResponse> {
  const timeoutMs = opts.timeoutMs ?? 60_000;
  const intervalMs = opts.intervalMs ?? 2_500;
  const startedAt = Date.now();

  while (true) {
    const reports = await listReports({}, accessToken);
    const report = reports.find((item) => item.id === reportId);
    if (report && (report.status === 'ready' || report.status === 'failed')) {
      return report;
    }
    if (Date.now() - startedAt >= timeoutMs) {
      return report ?? {
        id: reportId,
        user_id: 0,
        subject_type: 'legal',
        query: {},
        result_html: null,
        status: 'processing',
        price: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    await new Promise((resolve) => window.setTimeout(resolve, intervalMs));
  }
}
