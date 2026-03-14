export type HistoryItem = {
  type: string;
  name: string;
  dotColor: string;
  document: string;
  birthDate?: string;
  checkedAt: string;
  duration: string;
  source: 'telegram' | 'web';
  success: boolean;
};

export function ReportContent({ item }: { item: HistoryItem }) {
  return (
    <div className="text-base font-normal lg:text-[18px]">
      <header className="border-b border-white/15 bg-[#101010] px-5 pb-4 pt-5 sm:px-7">
        <div className="mb-4 h-10 w-full rounded-[18px] bg-[#1F1F1F]" />
        <p className="uppercase tracking-[0.12em] text-white/55">Отчёт по организации</p>
        <h3 className="mt-2 text-[16px] leading-tight font-semibold text-[#FDFEFF] lg:text-[24px]">{item.name}</h3>
      </header>

      <section className="space-y-6 px-5 py-5 sm:px-7 sm:py-6">
        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Основная информация</h3>
          <div className="grid gap-3 text-white/80 sm:grid-cols-3">
            <div className="space-y-1.5">
              <p className="text-white/45">Статус</p>
              <div className="inline-flex min-h-8 items-center rounded-full bg-[#1E2D21] px-3 text-[#45C857]">
                Действует
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Документ</p>
              <p className="m-0">{item.document}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Руководитель</p>
              <p className="m-0">Иванов Иван Иванович</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Адрес</p>
              <p className="m-0">г. Москва, ул. Примерная, д. 1</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Учредители</p>
              <div className="inline-flex min-h-8 items-center rounded-full border border-white/25 bg-transparent px-3">
                Место под кнопку
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Финансовый отчёт</h3>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-[#0EB8D2] border-r-[#2A2A2A] border-t-[#2A2A2A]">
                <span className="text-white/75">2022 год</span>
              </div>
            </div>
            <div className="space-y-3 text-white/80">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white/55">Выручка</p>
                  <p className="mt-1 font-semibold text-white">68,19 млрд ₽</p>
                  <p className="mt-1 text-[#45C857]">+92,96% к прошлому году</p>
                </div>
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white/55">Прибыль</p>
                  <p className="mt-1 font-semibold text-white">10,69 млрд ₽</p>
                  <p className="mt-1 text-[#45C857]">+11,39% к прошлому году</p>
                </div>
              </div>
              <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                <p className="text-white/55">Уставной капитал</p>
                <p className="mt-1 font-semibold text-white">1,1 млн ₽</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Арбитражные суды</h3>
          <div className="grid gap-4 text-white/80 sm:grid-cols-2">
            <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
              <p className="text-white/55">За последний год</p>
              <p className="mt-1">Исков: 10,02 млн ₽</p>
              <p className="mt-1">Ответчик: 22,65 млн ₽</p>
            </div>
            <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
              <p className="text-white/55">За всё время</p>
              <p className="mt-1">Исков: 44,3 млн ₽</p>
              <p className="mt-1">Ответчик: 36,8 млн ₽</p>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Экспресс-отчёт</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-white/80">
              Отрицательные факторы: 2
            </span>
            <span className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-[#45C857]">
              Положительные факторы: 18
            </span>
          </div>
          <div className="space-y-4 text-white/80">
            <div>
              <p className="mb-3 text-white/55">Отрицательные факторы</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white">Исполнительные производства</p>
                  <p className="mt-1 text-white/70">Найдены 39/72 тыс.</p>
                </div>
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white">Количество арбитражных дел</p>
                  <p className="mt-1 text-white/70">5,21 млн ₽</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-white/55">Положительные факторы</p>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                    <p className="text-white">Фактор #{index + 1}</p>
                    <p className="mt-1 text-white/70">Не найдено</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Упоминания в Telegram</h3>
          <div className="space-y-3 text-white/80">
            {Array.from({ length: 2 }).map((_, index) => (
              <article key={index} className="rounded-[14px] bg-[#1C1C1C] px-3 py-3">
                <div className="mb-2 flex items-center gap-2 text-[#057889]">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111111]" />
                  <span>https://t.me/example_{index + 1}</span>
                </div>
                <p className="mb-2 leading-snug text-white/80">
                  Место под текст сообщения с упоминанием компании. Здесь будет отображаться полный текст публикации из Telegram.
                </p>
                <div className="flex items-center justify-between text-white/55">
                  <span>30.07.2024, 15:25</span>
                  <span className="inline-flex h-5 items-center rounded-full border border-white/35 px-2">Кнопка перехода</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Упоминания в СМИ</h3>
          <div className="space-y-3 text-white/80">
            <article className="rounded-[14px] bg-[#1C1C1C] px-3 py-3">
              <div className="mb-2 flex items-center gap-2 text-[#057889]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111111]" />
                <span>@example_media</span>
              </div>
              <p className="mb-2 leading-snug text-white/80">
                Место под текст публикации в СМИ. Здесь будет отображаться часть статьи c упоминанием компании.
              </p>
              <div className="flex items-center justify-between text-white/55">
                <span>12.10.2025, 07:49</span>
                <span className="inline-flex h-5 items-center rounded-full border border-white/35 px-2">Кнопка перехода</span>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Итоговая оценка</h3>
          <p className="mb-3 text-white/75">
            На основании проведённого анализа организация имеет низкий уровень риска. Обнаружено 2 отрицательных фактора в 18 положительных показателях.
          </p>
          <div className="inline-flex min-h-9 items-center rounded-full bg-[#1E2D21] px-4 text-xs text-[#45C857]">
            Низкий уровень риска
          </div>
          <p className="mt-4 text-white/50">
            Отчёт сгенерирован: 27.10.2025 09:32. Система анализа юридических лиц «TrustMe».
          </p>
        </section>
      </section>
    </div>
  );
}
