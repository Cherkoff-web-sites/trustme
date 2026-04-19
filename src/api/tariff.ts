import { apiRequest } from './client';
import type { TariffRequest, TariffResponse } from '../types/api';

export function getTariff(accessToken: string) {
  return apiRequest<TariffResponse>('/api/v1/tariff/', {}, accessToken);
}

export function setTariff(payload: TariffRequest, accessToken: string) {
  return apiRequest<TariffResponse>(
    '/api/v1/tariff/',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}
