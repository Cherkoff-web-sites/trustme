import { apiRequest } from './client';
import type {
  CreateReportPaymentRequest,
  CreateReportPaymentResponse,
  CreateSubscriptionPaymentRequest,
  CreateSubscriptionPaymentResponse,
  PaymentStatusResponse,
  SubscriptionCatalogResponse,
  SubscriptionStatusResponse,
} from '../types/api';

export function getSubscriptionCatalog(accessToken: string) {
  return apiRequest<SubscriptionCatalogResponse>('/api/v1/subscription/catalog', {}, accessToken);
}

export function getSubscriptionStatus(accessToken: string) {
  return apiRequest<SubscriptionStatusResponse>('/api/v1/subscription/status', {}, accessToken);
}

export function createSubscriptionPayment(payload: CreateSubscriptionPaymentRequest | undefined, accessToken: string) {
  return apiRequest<CreateSubscriptionPaymentResponse>(
    '/api/v1/subscription/payment/subscription',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload ?? {}),
    },
    accessToken,
  );
}

export function createReportPayment(payload: CreateReportPaymentRequest, accessToken: string) {
  return apiRequest<CreateReportPaymentResponse>(
    '/api/v1/subscription/payment/report',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function getPaymentStatus(
  args: { orderId?: string | null; paymentId?: string | null },
  accessToken: string,
) {
  const params = new URLSearchParams();
  if (args.orderId) params.set('order_id', args.orderId);
  if (args.paymentId) params.set('payment_id', args.paymentId);
  const qs = params.toString();
  return apiRequest<PaymentStatusResponse>(
    `/api/v1/subscription/payment/status${qs ? `?${qs}` : ''}`,
    {},
    accessToken,
  );
}

export async function waitForPaymentActivation(
  args: { orderId?: string | null; paymentId?: string | null },
  accessToken: string,
  opts: { timeoutMs?: number; intervalMs?: number } = {},
) {
  const timeoutMs = opts.timeoutMs ?? 180_000;
  const intervalMs = opts.intervalMs ?? 4_000;
  const startedAt = Date.now();

  while (true) {
    const status = await getPaymentStatus(args, accessToken);
    const statusValue = status.status.trim().toLowerCase();
    const localStatus = (status.local_order_status ?? '').trim().toLowerCase();
    if (status.activated || ['succeeded', 'success', 'paid'].includes(statusValue) || ['paid', 'activated'].includes(localStatus)) {
      return status;
    }
    if (['failed', 'canceled', 'cancelled', 'expired'].includes(statusValue) || ['failed', 'expired'].includes(localStatus)) {
      return status;
    }
    if (Date.now() - startedAt >= timeoutMs) {
      return status;
    }
    await new Promise((resolve) => window.setTimeout(resolve, intervalMs));
  }
}
