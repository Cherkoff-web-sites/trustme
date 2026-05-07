import { apiRequest } from './client';
import type { TariffFactorsRequest, TariffFactorsResponse, TariffRequest, TariffResponse } from '../types/api';

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

export function getTariffFactors(accessToken: string) {
  return apiRequest<TariffFactorsResponse>('/api/v1/tariff/factors', {}, accessToken);
}

export function setTariffFactors(payload: TariffFactorsRequest, accessToken: string) {
  return apiRequest<TariffFactorsResponse>(
    '/api/v1/tariff/factors',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}
