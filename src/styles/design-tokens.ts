/**
 * Глобальные дизайн‑токены проекта.
 *
 * ВАЖНО:
 * - Все токены АТОМАРНЫЕ: их можно свободно комбинировать.
 * - Значения — готовые Tailwind‑классы, чтобы сразу использовать в JSX.
 * - Для часто используемых сочетаний есть presets.
 */

/** Цветовые токены (background / text / border / accent / status). */
export interface ColorBackgroundTokens {
  /** Основной фон страницы. */
  page: string;
  /** Фон карточек / плиток. */
  card: string;
  /** Фон инпутов. */
  input: string;
  /** Фон контролов (фильтры, переключатели). */
  control: string;
}

export interface ColorTextTokens {
  /** Основной цвет текста. */
  primary: string;
  /** Текст плейсхолдера / второстепенный. */
  muted: string;
  /** Текст статуса «успех». */
  statusSuccess: string;
  /** Текст статуса «ошибка». */
  statusError: string;
  /** Текст статуса «предупреждение». */
  statusWarning: string;
}

export interface ColorBorderTokens {
  /** Основная граница карточек. */
  primary: string;
  /** Граница инпутов / контролов. */
  input: string;
}

export interface ColorAccentTokens {
  /** Основной акцентный фон (primary button, акценты). */
  primaryBg: string;
  /** Ховер состояния primary‑фон. */
  primaryBgHover: string;
}

export interface StatusTokens {
  successBg: string;
  errorBg: string;
  warningBg: string;
}

export interface ColorsTokens {
  background: ColorBackgroundTokens;
  text: ColorTextTokens;
  border: ColorBorderTokens;
  accent: ColorAccentTokens;
  status: StatusTokens;
}

/** Типографика: размеры и веса шрифта. */
export interface TypographyTokens {
  /** Основной текст body. */
  body: string;
  /** Заголовки страниц (h1/h2). */
  h1h2: string;
  /** Заголовки карточек (h3). */
  h3: string;
  /** Текст кнопок. */
  button: string;
  /** Текст внутри карточек. */
  cardBody: string;
  /** Заголовки карточек (дублирует h3, для удобства). */
  cardTitle: string;
  /** Текст статусов / подсказок под полями. */
  statusText: string;
  /** Текст в инпутах / фильтрах. */
  input: string;
}

/** Скругления по типам элементов. */
export interface BorderRadiusTokens {
  /** Скругление для кнопок. */
  button: string;
  /** Скругление для инпутов и контролов. */
  input: string;
  /** Скругление карточек / плиток. */
  card: string;
}

/** Отступы и расстояния. */
export interface SpacingPaddingTokens {
  /** Паддинги кнопок (вертикальные/горизонтальные). */
  button: string;
  /** Вертикальные паддинги информативных карточек. */
  cardVertical: string;
  /** Горизонтальные паддинги информативных карточек. */
  cardHorizontal: string;
  /** Вертикальные паддинги основного контента страницы (main). */
  pageMain: string;
}

export interface SpacingMarginTokens {
  /** Горизонтальные внешние отступы между блоками. */
  horizontal: string;
  /** Вертикальные внешние отступы между блоками. */
  vertical: string;
  /** Крупные вертикальные расстояния между секциями (H1 + H2 и т.п.). */
  block: string;
}

export interface SpacingGapTokens {
  /** Горизонтальный gap между карточками. */
  cardHorizontal: string;
  /** Вертикальный gap между карточками. */
  cardVertical: string;
  /** Внутренний gap внутри карточки. */
  cardInternal: string;
  /** Расстояние между кнопкой и соседним элементом. */
  buttonAdjacent: string;
  /** Расстояние между инпутом и текстом статуса. */
  inputStatus: string;
}

export interface SpacingTokens {
  padding: SpacingPaddingTokens;
  margin: SpacingMarginTokens;
  gap: SpacingGapTokens;
}

/** Готовые пресеты для часто используемых UI‑паттернов. */
export interface PresetButtonTokens {
  primary: string;
  secondary: string;
}

export interface PresetCardTokens {
  default: string;
}

export interface PresetInputTokens {
  default: string;
}

export interface PresetsTokens {
  button: PresetButtonTokens;
  card: PresetCardTokens;
  input: PresetInputTokens;
}

/** Layout-токены (гриды/шаблоны колонок). */
export interface LayoutGridTokens {
  /** Грид дашборда (3 колонки на desktop). */
  dashboard: string;
  /** Грид настроек (26% / 74% на desktop). */
  settings: string;
  /** Грид тарифа: 3 колонки на desktop. */
  tariffPlans: string;
  /** Грид тарифа: 2 колонки 2/3 + 1/3 на desktop. */
  tariffSplit: string;
}

export interface LayoutTokens {
  grid: LayoutGridTokens;
}

/** Корневой объект дизайн‑токенов. */
export interface DesignTokens {
  colors: ColorsTokens;
  typography: TypographyTokens;
  borderRadius: BorderRadiusTokens;
  spacing: SpacingTokens;
  presets: PresetsTokens;
  layout: LayoutTokens;
}

export const designTokens: DesignTokens = {
  colors: {
    background: {
      page: 'bg-[#1A1A1A]', // основной фоновый — фон страницы
      card: 'bg-[#1A1A1A]', // основной фоновый — фон карточек
      input: 'bg-[#2A2A2A]', // второстепенный фон — инпуты
      control: 'bg-[#2A2A2A]', // фон элементов управления (фильтры, тогглы)
    },
    text: {
      primary: 'text-[#FDFEFF]', // основной белый текст
      muted: 'text-[#FDFEFF]/50', // плейсхолдер / второстепенный
      statusSuccess: 'text-[#34A853]', // успех
      statusError: 'text-[#EB4335]', // ошибка
      statusWarning: 'text-[#EBA535]', // ожидание / warning
    },
    border: {
      primary: 'border-[#FDFEFF]', // границы карточек
      input: 'border-[#FDFEFF]/50', // границы инпутов / фильтров
    },
    accent: {
      primaryBg: 'bg-[#057889]', // основной акцентный фон (кнопки)
      primaryBgHover: 'hover:bg-[#068a9c]', // hover для primary‑кнопок
    },
    status: {
      successBg: 'bg-[#34A853]', // фон «успех»
      errorBg: 'bg-[#EB4335]', // фон «ошибка»
      warningBg: 'bg-[#EBA535]', // фон «ожидание/warning»
    },
  },

  typography: {
    body: 'text-[16px] lg:text-[24px] font-normal', // основной текст
    h1h2: 'text-[24px] lg:text-[48px] font-semibold', // заголовки страниц
    h3: 'text-[16px] lg:text-[24px] font-semibold', // заголовки карточек
    button: 'text-[14px] lg:text-[20px] font-semibold', // текст кнопок
    cardBody: 'text-[18px] lg:text-[16px] font-normal', // подписи внутри карточек
    cardTitle: 'text-[16px] lg:text-[24px] font-semibold', // заголовки карточек
    statusText: 'text-[12px] font-normal', // текст статусов под полями
    input: 'text-[16px] lg:text-[14px] font-normal', // инпуты / фильтры
  },

  borderRadius: {
    button: 'rounded-[100px]', // 100px — кнопки
    input: 'rounded-[10px]', // 10px — инпуты и контролы
    card: 'rounded-[28px]', // 28px — карточки / плитки
  },

  spacing: {
    padding: {
      button: 'px-[20px] py-[20px] lg:px-[60px]', // кнопки: 20px, PC: 60px по горизонтали
      cardVertical: 'py-[30px]', // плитки: 30px top/bottom
      cardHorizontal: 'px-[30px] lg:px-[15px]', // плитки: 30px / 15px left/right (mobile / desktop)
      pageMain: 'pt-[80px] pb-[80px] lg:pt-[180px] lg:pb-[240px]', // вертикальные отступы основного контента
    },
    margin: {
      horizontal: 'mx-[32px]', // 32px — расстояние между плитками по горизонтали (при inline‑использовании)
      vertical: 'my-[30px] lg:my-[20px]', // 30px / 20px — вертикальные отступы
      block: 'my-[240px] lg:my-[80px]', // крупные отступы между блоками
    },
    gap: {
      cardHorizontal: 'gap-x-[32px]', // gap между плитками по горизонтали
      cardVertical: 'gap-y-[30px] lg:gap-y-[20px]', // gap между плитками по вертикали
      cardInternal: 'gap-[30px]', // gap внутри карточки
      buttonAdjacent: 'gap-[15px]', // между кнопкой и соседним элементом
      inputStatus: 'gap-[5px]', // между инпутом и текстом статуса
    },
  },

  presets: {
    button: {
      /** Primary‑кнопка: фон, шрифт, скругление, базовые паддинги. */
      primary:
        'inline-flex items-center justify-center min-h-14 ' +
        'rounded-[100px] bg-[#057889] ' +
        'px-[20px] py-[20px] lg:px-[60px] ' +
        'text-[14px] lg:text-[20px] font-semibold text-[#FDFEFF]',

      /** Secondary‑кнопка: прозрачный фон, рамка, тот же шрифт и скругление. */
      secondary:
        'inline-flex items-center justify-center min-h-14 ' +
        'rounded-[100px] border border-[#FDFEFF]/55 ' +
        'px-[20px] py-[20px] lg:px-[60px] ' +
        'text-[14px] lg:text-[20px] font-semibold text-[#FDFEFF]',
    },

    card: {
      /** Базовая карточка: фон + рамка + скругление. */
      default: 'rounded-[28px] border border-[#FDFEFF] bg-[#1A1A1A]',
    },

    input: {
      /** Базовый инпут: фон, рамка, скругление, шрифт. */
      default:
        'bg-[#2A2A2A] border border-[#FDFEFF]/50 rounded-[10px] ' +
        'text-[16px] lg:text-[14px] font-normal text-[#FDFEFF] ' +
        'placeholder:text-[#FDFEFF]/50',
    },
  },

  layout: {
    grid: {
      dashboard: 'lg:grid-cols-[1.05fr_1.35fr_0.78fr]',
      settings: 'lg:grid-cols-[0.261fr_0.739fr]',
      tariffPlans: 'lg:grid-cols-3',
      tariffSplit: 'lg:grid-cols-[2fr_1fr]',
    },
  },
};

