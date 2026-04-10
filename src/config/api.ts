/** Базовый URL бэкенда без завершающего слэша (например http://host:8081). */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (raw ?? '').trim().replace(/\/$/, '');
}
