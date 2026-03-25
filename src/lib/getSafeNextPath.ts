const DEFAULT_AFTER_LOGIN = '/cabinet';

/**
 * Разрешаем только относительные пути приложения (без open-redirect на внешние URL).
 */
export function getSafeNextPath(nextParam: string | null): string {
  if (!nextParam) return DEFAULT_AFTER_LOGIN;
  try {
    const decoded = decodeURIComponent(nextParam.trim());
    if (
      decoded.startsWith('/') &&
      !decoded.startsWith('//') &&
      !decoded.includes('://')
    ) {
      return decoded || DEFAULT_AFTER_LOGIN;
    }
  } catch {
    // ignore malformed encoding
  }
  return DEFAULT_AFTER_LOGIN;
}
