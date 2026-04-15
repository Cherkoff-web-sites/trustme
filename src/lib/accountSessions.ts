/** Несколько залогиненных аккаунтов в этом браузере: email + access_token на каждый. */
export const ACCOUNT_SESSIONS_KEY = 'trstme_account_sessions';

export type AccountSession = {
  email: string;
  accessToken: string;
};

export function readAccountSessions(): AccountSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACCOUNT_SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (row): row is AccountSession =>
          Boolean(row) &&
          typeof row === 'object' &&
          typeof (row as AccountSession).email === 'string' &&
          typeof (row as AccountSession).accessToken === 'string',
      )
      .map((row) => ({
        email: (row as AccountSession).email.trim(),
        accessToken: (row as AccountSession).accessToken,
      }))
      .filter((s) => s.email.length > 0 && s.accessToken.length > 0);
  } catch {
    return [];
  }
}

export function writeAccountSessions(sessions: AccountSession[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCOUNT_SESSIONS_KEY, JSON.stringify(sessions));
}

/** Новый или обновлённый вход — аккаунт в начале списка. */
export function upsertAccountSession(
  sessions: AccountSession[],
  email: string,
  accessToken: string,
): AccountSession[] {
  const norm = email.trim().toLowerCase();
  const filtered = sessions.filter((s) => s.email.trim().toLowerCase() !== norm);
  return [{ email: email.trim(), accessToken }, ...filtered];
}

export function removeAccountSession(sessions: AccountSession[], email: string): AccountSession[] {
  const norm = email.trim().toLowerCase();
  return sessions.filter((s) => s.email.trim().toLowerCase() !== norm);
}
