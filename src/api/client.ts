import { getApiBaseUrl } from '../config/api';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function readResponseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function messageFromValidationDetail(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === 'string' && detail.trim()) return detail.trim();
  if (!Array.isArray(detail) || detail.length === 0) return null;
  const msgs = detail
    .map((item) => {
      if (!item || typeof item !== 'object') return '';
      const msg = (item as { msg?: unknown }).msg;
      return typeof msg === 'string' ? msg.trim() : '';
    })
    .filter(Boolean);
  return msgs.length ? msgs.join(' ') : null;
}

function toApiError(status: number, data: unknown): ApiError {
  const detail = messageFromValidationDetail(data);
  if (detail) return new ApiError(status, detail);
  if (typeof data === 'string' && data.trim()) return new ApiError(status, data.trim());
  if (status === 401) return new ApiError(status, 'Необходима авторизация');
  if (status >= 500) return new ApiError(status, 'Ошибка сервера. Попробуйте позже или сообщите в поддержку.');
  return new ApiError(status, 'Запрос не выполнен');
}

export async function apiRequest<T>(path: string, init: RequestInit = {}, accessToken?: string | null): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new ApiError(0, 'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).');
  }

  const headers = new Headers(init.headers ?? undefined);
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, 'Ошибка соединения');
  }

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toApiError(res.status, data);
  }

  return data as T;
}

export async function apiRequestVoid(path: string, init: RequestInit = {}, accessToken?: string | null): Promise<void> {
  await apiRequest<unknown>(path, init, accessToken);
}
