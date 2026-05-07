import { apiRequest } from './client';
import type {
  CompanyCreateRequest,
  CompanyInviteCreateRequest,
  CompanyInviteResponse,
  CompanyResponse,
  CompanyUserPatchRequest,
  CompanyUserResponse,
} from '../types/api';

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

export function updateCompanyUser(companyId: number, userId: number, payload: CompanyUserPatchRequest, accessToken: string) {
  return apiRequest<CompanyUserResponse>(
    `/api/v1/companies/${companyId}/users/${userId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function detachCompanyUser(companyId: number, userId: number, accessToken: string) {
  return apiRequest<CompanyResponse>(
    `/api/v1/companies/${companyId}/users/${userId}`,
    { method: 'DELETE' },
    accessToken,
  );
}

export function getMyCompany(accessToken: string) {
  return apiRequest<CompanyResponse | null>('/api/v1/companies/me', {}, accessToken);
}

export function getCompany(companyId: number, accessToken: string) {
  return apiRequest<CompanyResponse>(`/api/v1/companies/${companyId}`, {}, accessToken);
}

export function listCompanyUsers(companyId: number, accessToken: string) {
  return apiRequest<CompanyUserResponse[]>(`/api/v1/companies/${companyId}/users`, {}, accessToken);
}

export function createCompanyInvite(companyId: number, payload: CompanyInviteCreateRequest, accessToken: string) {
  return apiRequest<CompanyInviteResponse>(
    `/api/v1/companies/${companyId}/invites`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function listCompanyInvites(companyId: number, accessToken: string) {
  return apiRequest<CompanyInviteResponse[]>(`/api/v1/companies/${companyId}/invites`, {}, accessToken);
}

export function acceptCompanyInvite(token: string, accessToken: string) {
  return apiRequest<CompanyInviteResponse>(
    `/api/v1/companies/invites/${encodeURIComponent(token)}/accept`,
    { method: 'POST' },
    accessToken,
  );
}
