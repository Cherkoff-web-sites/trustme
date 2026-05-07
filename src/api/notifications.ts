import { apiRequest, apiRequestVoid } from './client';
import type { NotificationResponse } from '../types/api';

export function listNotifications(accessToken: string) {
  return apiRequest<NotificationResponse[]>('/api/v1/notifications/', {}, accessToken);
}

export function listNotificationsNoSlash(accessToken: string) {
  return apiRequest<NotificationResponse[]>('/api/v1/notifications', {}, accessToken);
}

export function markNotificationRead(notificationId: string, accessToken: string) {
  return apiRequest<NotificationResponse | null>(
    `/api/v1/notifications/${encodeURIComponent(notificationId)}/read`,
    { method: 'PATCH' },
    accessToken,
  );
}

export function markAllNotificationsRead(accessToken: string) {
  return apiRequest<NotificationResponse[]>('/api/v1/notifications/read-all', { method: 'PATCH' }, accessToken);
}

export function deleteNotification(notificationId: string, accessToken: string) {
  return apiRequestVoid(
    `/api/v1/notifications/${encodeURIComponent(notificationId)}`,
    { method: 'DELETE' },
    accessToken,
  );
}
