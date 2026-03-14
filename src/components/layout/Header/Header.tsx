import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { uiTokens } from '../../ui';
import logoSvg from '../../../assets/icons/logo.svg';
import notificationsSvg from '../../../assets/icons/notifications.svg';
import accountSvg from '../../../assets/icons/account.svg';

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
      <header className={`${uiTokens.container} pt-6 pb-5 sm:pt-8`}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-10">
            <Link to="/cabinet" className="flex shrink-0" aria-label="Trust Me — на главную">
              <img src={logoSvg} alt="" width={122} height={29} className="h-7 w-auto lg:h-8" />
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-[#FDFEFF]/90 lg:text-[20px]">
              {navItems.map(([label, to]) => (
                <NavLink
                  className={({ isActive }) =>
                    `transition-colors hover:text-[#FDFEFF] ${isActive ? 'text-[#FDFEFF]' : 'text-[#FDFEFF]/85'}`
                  }
                  key={to}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[14px] font-semibold lg:text-[20px]">
            <button
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[100px] border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF]/85 transition hover:bg-[#FDFEFF]/10"
              type="button"
              onClick={() => setShowNotifications(true)}
              aria-label="Уведомления"
            >
              <img src={notificationsSvg} alt="" width={19} height={20} className="h-5 w-5" />
            </button>
            <Link
              to="/settings"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[100px] border border-[#FDFEFF]/20 bg-[#FDFEFF]/5 transition hover:bg-[#FDFEFF]/10"
              aria-label="Аккаунт"
            >
              <img src={accountSvg} alt="" width={20} height={20} className="h-5 w-5" />
            </Link>
            <Link
              className="text-[#FDFEFF]/90 transition-colors hover:text-[#FDFEFF]"
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
            className="mt-12 w-full max-w-[720px] rounded-[28px] border border-[#FDFEFF] bg-[#1A1A1A] p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-4 flex items-center justify-between gap-4 border-b border-[#FDFEFF]/15 pb-3">
              <nav className="flex flex-wrap gap-2 text-base lg:text-[24px]">
                {['Все', 'Финансы', 'Тариф', 'Аккаунт', 'Сервис'].map((label, index) => (
                  <button
                    key={label}
                    className={`rounded-[100px] px-3 py-1.5 ${
                      index === 0 ? 'bg-[#FDFEFF] text-[#1A1A1A]' : 'bg-[#FDFEFF]/5 text-[#FDFEFF]/80 hover:bg-[#FDFEFF]/10'
                    }`}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <button
                className="text-base font-medium text-[#FDFEFF]/70 underline underline-offset-4 hover:text-[#FDFEFF] lg:text-[24px]"
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
                  className="flex items-start gap-3 rounded-[28px] bg-[#2A2A2A] px-4 py-3 text-base text-[#FDFEFF]/85 sm:px-5 lg:text-[24px]"
                >
                  <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#1A1A1A]" />
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-[100px] bg-[#FDFEFF]/10 px-2 py-0.5 text-xs text-[#FDFEFF]/80">
                        {item.category}
                      </span>
                      <p className="m-0 text-[15px] leading-[1.3] text-[#FDFEFF]">{item.title}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#FDFEFF]/55">
                      <span>{item.time}</span>
                      {item.action ? (
                        <button
                          className="rounded-[100px] bg-[#FDFEFF]/10 px-3 py-1 text-xs font-medium text-[#FDFEFF] hover:bg-[#FDFEFF]/20"
                          type="button"
                        >
                          {item.action}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-1 flex shrink-0 flex-col items-center gap-3 text-[15px] text-[#FDFEFF]/65">
                    <button className="hover:text-[#FDFEFF]" type="button" aria-label="Повторить">
                      ↻
                    </button>
                    <button className="hover:text-[#FDFEFF]" type="button" aria-label="Удалить">
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
