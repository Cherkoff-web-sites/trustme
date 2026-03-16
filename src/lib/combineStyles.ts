/**
 * Простая утилита для комбинирования Tailwind‑классов.
 *
 * В отличие от `cn` не делает merge, а только склеивает строки.
 * Используется для сборки стилей из атомарных дизайн‑токенов.
 */
export function combineStyles(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

