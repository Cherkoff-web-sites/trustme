/**
 * Центральные переключатели UI. Верните `true`, когда блоки снова понадобятся в интерфейсе.
 */
export const uiFlags = {
  /** Модалка уведомлений по иконке колокольчика в шапке */
  notificationsPanelEnabled: true,
  /** Модалка отчёта, встроенный `ReportContent`, кнопки «Открыть отчёт» / «Открыть» */
  reportViewsEnabled: true,
} as const;
