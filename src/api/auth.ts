import { getApiBaseUrl } from '../config/api';

export type LoginSuccess = {
  access_token: string;
  token_type: string;
};

export type RegisterSuccessUser = {
  id: number;
  email: string;
  role: string;
  balance: number;
  telegram_id: number;
  ui_theme: string;
  report_theme: string;
  company_id: number;
};

export class AuthApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

/** Роль по умолчанию для регистрации; уточняйте у бэка при 500/422. */
export const DEFAULT_REGISTER_ROLE =
  (import.meta.env.VITE_REGISTER_ROLE as string | undefined)?.trim() || 'company_admin';

export const DEFAULT_REGISTER_PARENT_ID = 0;

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
  if (!Array.isArray(detail)) return null;
  const msgs = detail
    .map((item) => {
      if (!item || typeof item !== 'object') return '';
      const msg = (item as { msg?: unknown }).msg;
      return typeof msg === 'string' ? msg : '';
    })
    .filter(Boolean);
  return msgs.length ? msgs.join(' ') : null;
}

function toAuthApiError(status: number, data: unknown): AuthApiError {
  if (status === 401 && data && typeof data === 'object') {
    const d = (data as { detail?: unknown }).detail;
    if (typeof d === 'string' && d.trim()) {
      return new AuthApiError(status, d);
    }
  }
  const validationMsg = messageFromValidationDetail(data);
  if (validationMsg) {
    return new AuthApiError(status, validationMsg);
  }
  if (status >= 500) {
    return new AuthApiError(status, 'Ошибка сервера. Попробуйте позже или сообщите в поддержку.');
  }
  if (typeof data === 'string' && data.trim()) {
    return new AuthApiError(status, data);
  }
  return new AuthApiError(status, 'Запрос не выполнен');
}

export async function authLogin(email: string, password: string): Promise<LoginSuccess> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const params = new URLSearchParams();
  params.set('username', email.trim());
  params.set('password', password);
  params.set('grant_type', 'password');

  const res = await fetch(`${base}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toAuthApiError(res.status, data);
  }

  if (!data || typeof data !== 'object') {
    throw new AuthApiError(res.status, 'Некорректный ответ сервера при входе');
  }
  const token = (data as { access_token?: unknown }).access_token;
  if (typeof token !== 'string' || !token) {
    throw new AuthApiError(res.status, 'В ответе нет access_token');
  }
  const tokenType = (data as { token_type?: unknown }).token_type;
  return {
    access_token: token,
    token_type: typeof tokenType === 'string' ? tokenType : 'bearer',
  };
}

export async function authRegister(input: {
  email: string;
  password: string;
  role?: string;
  parent_id?: number;
}): Promise<RegisterSuccessUser> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const body = {
    email: input.email.trim(),
    password: input.password,
    role: input.role ?? DEFAULT_REGISTER_ROLE,
    parent_id: input.parent_id ?? DEFAULT_REGISTER_PARENT_ID,
  };

  const res = await fetch(`${base}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toAuthApiError(res.status, data);
  }

  if (!data || typeof data !== 'object') {
    throw new AuthApiError(res.status, 'Некорректный ответ сервера при регистрации');
  }
  return data as RegisterSuccessUser;
}
