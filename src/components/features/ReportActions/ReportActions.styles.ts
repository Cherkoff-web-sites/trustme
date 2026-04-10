/** База: без `justify-*` — задаётся в компоненте (с «Удалить» — `between`, без — `center`). */
export const reportActionsWrapBaseStyles =
  'w-full flex flex-col gap-4 sm:flex-row sm:items-center';

export const reportActionsPrimaryStyles = 'flex flex-col gap-[20px] sm:flex-row sm:gap-[30px]';

/** Мобильная колонка: `self-end` — текст справа; с `sm` — в общем ряду центр по вертикали (`sm:items-center` у обёртки). */
export const reportActionsDeleteStyles =
  'self-end text-[16px] lg:text-[20px] text-[#FDFEFF] transition-colors hover:text-[#057889] sm:self-auto';
