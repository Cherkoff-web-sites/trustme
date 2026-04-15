export type UserRole = 'company_admin' | 'company_employee' | 'individual';

export type Theme = 'light' | 'dark';

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: UserRole;
  balance: number;
  telegram_id: number | null;
  ui_theme: Theme;
  report_theme: Theme;
  company_id: number | null;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

/** Тело `PUT /api/v1/auth/accept` — подтверждение регистрации по коду из письма. */
export interface AcceptRegisterRequest {
  user_id: number;
  /** Строка из письма (например 8 цифр), без потери ведущих нулей. */
  code: string;
}
