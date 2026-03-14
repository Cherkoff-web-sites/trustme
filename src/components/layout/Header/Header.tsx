import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const containerClassName = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    ['Личный кабинет', '/cabinet'],
    ['История запросов', '/history'],
    ['Новая проверка', '/new-check'],
    ['Тариф', '/tariff'],
    ['Баланс', '/balance'],
    ['Настройки', '/settings'],
  ] as const;

  return (
    <>
      <header className={`${containerClassName} pt-6 pb-5 sm:pt-8`}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-10">
            <Link className="text-[22px] leading-none font-semibold uppercase tracking-[-0.03em]" to="/cabinet">
              Trust Me
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
              {navItems.map(([label, to]) => (
                <NavLink
                  className={({ isActive }) =>
                    `transition-colors hover:text-white ${isActive ? 'text-white' : 'text-white/85'}`
                  }
                  key={to}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 text-lg text-white/85 transition hover:bg-white/10"
              type="button"
              onClick={() => setShowNotifications(true)}
              aria-label="Уведомления"
            >
              🔔
            </button>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
              1
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
              U
            </span>
            <Link
              className="text-white/90 transition-colors hover:text-white"
              to="/settings"
            >
              user.example@gmail.com
            </Link>
          </div>
        </div>
      </header>

      {showNotifications && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 px-4 py-8 sm:px-6 sm:py-12"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="mt-12 w-full max-w-[720px] rounded-[28px] border border-white/80 bg-[#151515]/98 p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-4 flex items-center justify-between gap-4 border-b border-white/15 pb-3">
              <nav className="flex flex-wrap gap-2 text-sm">
                {['Все', 'Финансы', 'Тариф', 'Аккаунт', 'Сервис'].map((label, index) => (
                  <button
                    key={label}
                    className={`rounded-full px-3 py-1.5 ${
                      index === 0 ? 'bg-white text-[#151515]' : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <button
                className="text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
                type="button"
              >
                Очистить
              </button>
            </header>

            <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
              {[
                {
                  title: 'Добавлен новый сотрудник: Иванов Иван',
                  category: 'Аккаунт',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Аккаунт user@company.ru заблокирован. Превышен лимит доступных проверок',
                  category: 'Аккаунт',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тарифный план учетной записи user@company.ru истекает через 3 дня',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                  action: 'Продлить',
                },
                {
                  title: 'Списано 490 ₽ за проверку юр.лица «ООО УМНЫЙ РИТЕЙЛ»',
                  category: 'Финансы',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Баланс успешно пополнен на 10 000 ₽',
                  category: 'Финансы',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тариф «Индивидуальный» активирован',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тариф «Индивидуальный» изменен',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl bg-[#131313] px-4 py-3 text-sm text-white/85 sm:px-5"
                >
                  <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#393939]" />
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                        {item.category}
                      </span>
                      <p className="m-0 text-[15px] leading-[1.3] text-white">{item.title}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/55">
                      <span>{item.time}</span>
                      {item.action ? (
                        <button
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20"
                          type="button"
                        >
                          {item.action}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-1 flex shrink-0 flex-col items-center gap-3 text-[15px] text-white/65">
                    <button className="hover:text-white" type="button" aria-label="Повторить">
                      ↻
                    </button>
                    <button className="hover:text-white" type="button" aria-label="Удалить">
                      🗑
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
