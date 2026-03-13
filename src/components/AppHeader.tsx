import { Link, NavLink, useLocation } from 'react-router-dom';

const containerClassName = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';

export function AppHeader({ onNotificationsClick }: { onNotificationsClick?: () => void }) {
  const location = useLocation();
  const navItems = [
    ['Личный кабинет', '/cabinet'],
    ['История запросов', '/cabinet/history'],
    ['Новая проверка', '/cabinet/check'],
    ['Тариф', '/cabinet/tariff'],
    ['Баланс', '/cabinet/balance'],
    ['Настройки', '/cabinet/settings'],
  ] as const;

  return (
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
            onClick={onNotificationsClick}
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
            to={`/login?from=${encodeURIComponent(location.pathname)}`}
          >
            user.example@gmail.com
          </Link>
        </div>
      </div>
    </header>
  );
}
