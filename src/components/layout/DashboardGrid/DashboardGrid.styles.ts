import { designTokens } from '../../ui';

export const dashboardGridRootStyles = [
  'grid w-full gap-4',
  designTokens.layout.grid.dashboard,
].join(' ');

export const dashboardGridFullRowStyles = 'lg:col-span-3';
/** Вторая строка: слева «Последние запросы» на 2 колонки, справа «Статистика» — одна колонка (как Telegram). */
export const dashboardGridSecondRowLeftStyles = 'lg:col-span-2';
export const dashboardGridMiddleColumnStackStyles = 'flex h-full flex-col gap-4';

