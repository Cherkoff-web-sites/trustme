export type UserRole = 'company_admin' | 'company_employee' | 'individual';

export type Theme = 'light' | 'dark';
export type SubjectTypeSchema = 'legal' | 'person';
export type ReportStatusSchema = 'pending' | 'processing' | 'ready' | 'failed';
export type SearchTypePhys = 'fio' | 'fio_inn' | 'fio_inn_birthday';
export type TransactionTypeSchema = 'topup' | 'charge';
export type TypeConfirmationCodeSchema =
  | 'authorization'
  | 'change_password'
  | 'change_email'
  | 'restore_password';

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

export interface SetThemesRequest {
  ui_theme: Theme;
  report_theme: Theme;
}

export interface BindTelegramRequest {
  telegram_user_id: number;
}

export interface CompanyCreateRequest {
  name: string;
}

export interface CompanyResponse {
  id: number;
  name: string;
  owner_id: number;
}

/** OpenAPI содержит опечатку `ReportCreateRequesLegal`; оставляем совместимость с контрактом. */
export interface ReportCreateRequestLegal {
  inn: string;
}

export type ReportCreateRequesLegal = ReportCreateRequestLegal;

export interface ReportCreateRequestPhys {
  lastname: string;
  firstname: string;
  middlename: string;
  search_type: SearchTypePhys;
  birthday?: string | null;
  inn?: string | null;
}

export interface ReportResponse {
  id: number;
  user_id: number;
  subject_type: SubjectTypeSchema;
  query: Record<string, unknown>;
  result_html: string | null;
  status: ReportStatusSchema;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface TopupRequest {
  amount: number;
  description?: string | null;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  type: TransactionTypeSchema;
  description: string;
  related_report_id: number | null;
  created_at: string;
}

export interface TariffRequest {
  include_factors?: boolean;
  include_media?: boolean;
  include_telegram?: boolean;
  subscription_price?: number;
}

export interface TariffResponse {
  include_factors: boolean;
  include_media: boolean;
  include_telegram: boolean;
  subscription_price: number;
}

export interface SubscriptionCatalogResponse {
  subscription_price_1_month: number;
  subscription_price_3_months: number;
  subscription_price_6_months: number;
  subscription_price_12_months: number;
  legal_report_price: number;
  physical_report_price: number;
}

export interface SubscriptionStatusResponse {
  id?: number | null;
  tg_id?: string | null;
  user_id?: string | null;
  has_active_subscription?: boolean;
  subscription_expires_at?: string | null;
  active_subscription_category?: string | null;
  legal_reports_left?: number;
  physical_reports_left?: number;
}

export interface CreateSubscriptionPaymentRequest {
  months?: 1 | 3 | 6 | 12;
}

export interface CreateSubscriptionPaymentResponse {
  payment_url: string;
  order_id: string;
  payment_id?: string | null;
  internal_payment_id: number;
  amount: number;
  subscription_days: number;
  subscription_months: number;
}

export interface CreateReportPaymentRequest {
  report_type: 'legal' | 'physical';
}

export interface CreateReportPaymentResponse {
  payment_url: string;
  order_id: string;
  payment_id?: string | null;
  internal_payment_id: number;
  amount: number;
  report_type: string;
}

export interface PaymentStatusResponse {
  order_id: string;
  payment_id?: string | null;
  status: string;
  payment_type: string;
  report_type?: string | null;
  activated?: boolean;
  local_order_status?: string | null;
}
