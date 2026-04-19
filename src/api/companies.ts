import { apiRequest } from './client';
import type { CompanyCreateRequest, CompanyResponse } from '../types/api';

export function createCompany(payload: CompanyCreateRequest, accessToken: string) {
  return apiRequest<CompanyResponse>(
    '/api/v1/companies/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function attachUserToCompany(companyId: number, userId: number, accessToken: string) {
  return apiRequest<CompanyResponse>(
    `/api/v1/companies/${companyId}/users/${userId}`,
    { method: 'POST' },
    accessToken,
  );
}
