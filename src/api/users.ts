import { apiRequest } from './client';
import type { BindTelegramRequest, SetThemesRequest, UserResponse } from '../types/api';

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
