/** ISO `yyyy-mm-dd` → отображение `dd/mm/yyyy`. */
export function isoDateToDdMmYyyy(iso: string): string {
  const m = iso.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return '';
  return `${m[3]}/${m[2]}/${m[1]}`;
}

/** Парсинг `dd/mm/yyyy` или `dd.mm.yyyy` → ISO `yyyy-mm-dd` или `null`. */
export function parseDdMmYyyyToIso(raw: string): string | null {
  const t = raw.trim().replace(/\./g, '/');
  const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = Number(m[1]);
  const mo = Number(m[2]);
  const y = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 1000 || y > 9999) return null;
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/**
 * Подпись чипа периода для фильтров.
 * Только начало: `с 31/03/2026`; оба: `с 31/03/2026 по 01/04/2026`; только конец: `по 01/04/2026`.
 */
export function formatPeriodFilterChipLabel(dateFromIso: string, dateToIso: string): string | null {
  const from = dateFromIso.trim();
  const to = dateToIso.trim();
  if (!from && !to) return null;
  const fromDisp = from ? isoDateToDdMmYyyy(from) : '';
  const toDisp = to ? isoDateToDdMmYyyy(to) : '';
  if (from && to) return `с ${fromDisp} по ${toDisp}`;
  if (from) return `с ${fromDisp}`;
  return `по ${toDisp}`;
}
