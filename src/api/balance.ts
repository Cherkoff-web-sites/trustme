import { apiRequest, apiRequestVoid } from './client';
import type { TopupRequest, TransactionResponse } from '../types/api';

export function topupBalance(payload: TopupRequest, accessToken: string) {
  return apiRequestVoid(
    '/api/v1/balance/topup',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function listTransactions(accessToken: string) {
  return apiRequest<TransactionResponse[]>('/api/v1/balance/transactions', {}, accessToken);
}
