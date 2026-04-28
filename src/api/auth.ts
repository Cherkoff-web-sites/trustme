import { getApiBaseUrl } from '../config/api';
import type {
  AcceptRegisterRequest,
  ChangePasswordRequest,
  ConfirmationCodeRequest,
  ConfirmationCodeResponse,
  TokenResponse,
  UserResponse,
} from '../types/api';

export type { AcceptRegisterRequest, TokenResponse, UserResponse } from '../types/api';

export class AuthApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

/** Роли регистрации (UserRoleSchema). */
export type RegisterRole = 'individual' | 'company_admin' | 'company_employee';

async function readResponseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

/** FastAPI 422: первое сообщение из `detail[0].msg`. */
function messageFromValidationDetail422(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const detail = (data as { detail?: unknown }).detail;
  if (!Array.isArray(detail) || detail.length === 0) return null;
  const first = detail[0];
  if (!first || typeof first !== 'object') return null;
  const msg = (first as { msg?: unknown }).msg;
  return typeof msg === 'string' && msg.trim() ? msg.trim() : null;
}

/** Строка `detail` или первый `detail[].msg` (FastAPI). */
function messageFromFastApiDetail(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === 'string' && detail.trim()) return detail.trim();
  return messageFromValidationDetail422(data);
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
  if (status === 422) {
    const first422 = messageFromValidationDetail422(data);
    if (first422) {
      return new AuthApiError(status, first422);
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

export async function authLogin(email: string, password: string): Promise<TokenResponse> {
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

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
  } catch {
    throw new AuthApiError(0, 'Ошибка соединения');
  }

  const data = await readResponseBody(res);
  if (!res.ok) {
    if (res.status === 401) {
      throw new AuthApiError(401, 'Неверный email или пароль');
    }
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

export async function fetchCurrentUser(accessToken: string): Promise<UserResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    throw new AuthApiError(0, 'Ошибка соединения');
  }

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toAuthApiError(res.status, data);
  }

  if (!data || typeof data !== 'object') {
    throw new AuthApiError(res.status, 'Некорректный ответ профиля');
  }
  return data as UserResponse;
}

export async function authRegister(input: {
  email: string;
  password: string;
  role: RegisterRole;
  /** Только для `company_employee` — ID пригласившего / компании. Для `individual` и `company_admin` не передаётся. */
  parent_id?: number;
}): Promise<UserResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const body: Record<string, unknown> = {
    email: input.email.trim(),
    password: input.password,
    role: input.role,
  };
  if (input.role === 'company_employee' && input.parent_id != null && Number.isFinite(input.parent_id)) {
    body.parent_id = input.parent_id;
  }

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
  return data as UserResponse;
}

/** Подтверждение регистрации: `PUT /api/v1/auth/accept` (без Bearer). Ответ 200 — профиль пользователя. */
export async function authAcceptRegister(
  user_id: number,
  code: string,
): Promise<UserResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const numericCode = Number(code);
  if (!Number.isFinite(numericCode)) {
    throw new AuthApiError(422, 'Неверный код');
  }
  const payload: AcceptRegisterRequest = { user_id, code: numericCode };

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/auth/accept`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AuthApiError(0, 'Ошибка соединения');
  }

  const data = await readResponseBody(res);
  if (!res.ok) {
    if (res.status === 401) {
      const fromApi = messageFromFastApiDetail(data);
      throw new AuthApiError(
        401,
        fromApi ?? 'Не удалось подтвердить код. Проверьте код или запросите новый.',
      );
    }
    if (res.status === 422) {
      const first422 = messageFromValidationDetail422(data);
      throw new AuthApiError(422, first422 ?? 'Неверный код');
    }
    throw toAuthApiError(res.status, data);
  }

  if (!data || typeof data !== 'object') {
    throw new AuthApiError(res.status, 'Некорректный ответ при подтверждении регистрации');
  }
  return data as UserResponse;
}

export async function authChangePassword(payload: ChangePasswordRequest, accessToken: string): Promise<UserResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const res = await fetch(`${base}/api/v1/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toAuthApiError(res.status, data);
  }
  return data as UserResponse;
}

export async function authConfirmCode(
  payload: ConfirmationCodeRequest,
  accessToken: string,
): Promise<ConfirmationCodeResponse> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new AuthApiError(
      0,
      'Не задан VITE_API_BASE_URL — укажите базовый URL API в .env (см. .env.example).',
    );
  }

  const res = await fetch(`${base}/api/v1/auth/confirmation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await readResponseBody(res);
  if (!res.ok) {
    throw toAuthApiError(res.status, data);
  }
  return data as ConfirmationCodeResponse;
}
