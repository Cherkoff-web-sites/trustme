import { apiRequest, apiRequestVoid } from './client';
import type {
  BindTelegramRequest,
  EmailConfirmRequest,
  EmailManageRequest,
  GenericOkResponse,
  PhoneConfirmRequest,
  PhoneRequestCodeRequest,
  SetThemesRequest,
  UserPatchRequest,
  UserResponse,
  UserSecurityPatchRequest,
  UserSecurityResponse,
} from '../types/api';

export function updateCurrentUser(payload: UserPatchRequest, accessToken: string) {
  return apiRequest<UserResponse>(
    '/api/v1/users/me',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function updateUserThemes(payload: SetThemesRequest, accessToken: string) {
  return apiRequest<UserResponse>(
    '/api/v1/users/me/themes',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function bindTelegram(payload: BindTelegramRequest, accessToken: string) {
  return apiRequest<UserResponse>(
    '/api/v1/users/me/telegram',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function unbindTelegram(accessToken: string) {
  return apiRequest<UserResponse>('/api/v1/users/me/telegram', { method: 'DELETE' }, accessToken);
}

export function uploadAvatar(file: File, accessToken: string) {
  const formData = new FormData();
  formData.append('file', file);
  return apiRequest<GenericOkResponse>(
    '/api/v1/users/me/avatar',
    {
      method: 'POST',
      body: formData,
    },
    accessToken,
  );
}

export function deleteAvatar(accessToken: string) {
  return apiRequest<GenericOkResponse>('/api/v1/users/me/avatar', { method: 'DELETE' }, accessToken);
}

export function addEmail(payload: EmailManageRequest, accessToken: string) {
  return apiRequest<GenericOkResponse>(
    '/api/v1/users/me/emails',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function confirmEmail(payload: EmailConfirmRequest, accessToken: string) {
  return apiRequest<GenericOkResponse>(
    '/api/v1/users/me/emails/confirm',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function deleteEmail(email: string, accessToken: string) {
  return apiRequestVoid(`/api/v1/users/me/emails/${encodeURIComponent(email)}`, { method: 'DELETE' }, accessToken);
}

export function requestPhoneCode(payload: PhoneRequestCodeRequest, accessToken: string) {
  return apiRequest<GenericOkResponse>(
    '/api/v1/users/me/phone/request-code',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function confirmPhone(payload: PhoneConfirmRequest, accessToken: string) {
  return apiRequest<GenericOkResponse>(
    '/api/v1/users/me/phone/confirm',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function deletePhone(accessToken: string) {
  return apiRequest<GenericOkResponse>('/api/v1/users/me/phone', { method: 'DELETE' }, accessToken);
}

export function getUserSecurity(accessToken: string) {
  return apiRequest<UserSecurityResponse>('/api/v1/users/me/security', {}, accessToken);
}

export function setUserSecurity2fa(payload: UserSecurityPatchRequest, accessToken: string) {
  return apiRequest<UserSecurityResponse>(
    '/api/v1/users/me/security/2fa',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}

export function setUserSecurityEmail2fa(payload: UserSecurityPatchRequest, accessToken: string) {
  return apiRequest<UserSecurityResponse>(
    '/api/v1/users/me/security/2fa/email',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
    accessToken,
  );
}
