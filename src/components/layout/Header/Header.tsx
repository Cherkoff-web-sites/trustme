import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MAIN_NAV_ITEMS } from '../../../shared/navConfig';
import { uiTokens } from '../../ui';
import logoSvg from '../../../assets/icons/logo.svg';
import notificationsSvg from '../../../assets/icons/notifications.svg';
import accountSvg from '../../../assets/icons/account.svg';
import chevronSvg from '../../../assets/icons/chevron.svg';

export function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('user.example@gmail.com');

  const accounts = [
    'user1.example@gmail.com',
    'user2.example@gmail.com',
    'user3.example@gmail.com',
  ] as const;

  const handleLogout = () => {
    setShowAccountMenu(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  useEffect(() => {
    if (!showMobileMenu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  return (
    <>
      <header className={`${uiTokens.container} pt-6 pb-5 sm:pt-8`}>
        {/* Mobile header (<= lg) */}
        <div className="grid grid-cols-[44px_1fr_88px] items-center lg:hidden">
          <button
            type="button"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Открыть меню"
            className="inline-flex h-11 w-11 items-center justify-center text-[#FDFEFF]"
          >
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden>
              <path d="M1 1H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M1 10H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M1 19H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link to="/cabinet" className="justify-self-center" aria-label="Trust Me — на главную">
            <span className="block text-center text-[36px] font-black tracking-[0.08em] text-[#FDFEFF]">
              TRUST&nbsp;ME
            </span>
          </Link>

          <div className="flex items-center justify-end gap-3">
            <button
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-[100px] border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF]/85"
              type="button"
              onClick={() => setShowNotifications(true)}
              aria-label="Уведомления"
            >
              <img src={notificationsSvg} alt="" width={19} height={20} className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF3B30] px-1 text-[12px] font-semibold text-white">
                1
              </span>
            </button>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-[100px] border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF]/85"
              type="button"
              onClick={() => setShowAccountMenu((current) => !current)}
              aria-label="Аккаунт"
            >
              <img src={accountSvg} alt="" width={20} height={20} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop header (lg+) */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-10">
            <Link to="/cabinet" className="flex shrink-0" aria-label="Trust Me — на главную">
              <img src={logoSvg} alt="" width={122} height={29} className="h-7 w-auto lg:h-8" />
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-[#FDFEFF]/90 lg:text-[20px]">
              {MAIN_NAV_ITEMS.map(([label, to]) => (
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
            <div className="relative">
              {showAccountMenu ? (
                <button
                  type="button"
                  className="fixed inset-0 z-30 cursor-default"
                  onClick={() => setShowAccountMenu(false)}
                  aria-label="Закрыть меню аккаунта"
                />
              ) : null}
              <button
                type="button"
                onClick={() => setShowAccountMenu((current) => !current)}
                className={`relative z-40 inline-flex items-center gap-2 bg-transparent p-0 transition-colors ${
                  showAccountMenu ? 'text-[#0EB8D2]' : 'text-[#FDFEFF]/90 hover:text-[#FDFEFF]'
                }`}
                aria-haspopup="menu"
                aria-expanded={showAccountMenu}
              >
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[100px] border border-[#FDFEFF]/20 bg-[#FDFEFF]/5">
                  <img src={accountSvg} alt="" width={20} height={20} className="h-5 w-5" />
                </span>
                <span>{currentAccount}</span>
                <img
                  src={chevronSvg}
                  alt=""
                  width={16}
                  height={16}
                  className={`h-4 w-4 shrink-0 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`}
                />
              </button>

              {showAccountMenu ? (
                <div
                  className="absolute right-0 top-full z-40 mt-4 w-[320px] rounded-[18px] border border-[#FDFEFF]/65 bg-[#1A1A1A] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                  role="menu"
                >
                  <div className="max-h-[180px] space-y-3 overflow-y-auto pr-2">
                    {accounts.map((account) => (
                      <button
                        key={account}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setCurrentAccount(account);
                          setShowAccountMenu(false);
                        }}
                        className="flex w-full items-center border-b border-[#FDFEFF]/15 pb-3 text-left text-base text-[#FDFEFF]/92 transition hover:text-[#FDFEFF] lg:text-[18px]"
                      >
                        {account}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 flex w-full items-center gap-3 rounded-[12px] bg-[#2A2A2A] px-4 py-4 text-left text-base text-[#FDFEFF] transition hover:bg-[#333333] lg:text-[18px]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 19V5C20 4.44772 19.5523 4 19 4H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Выход из аккаунта</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {showMobileMenu ? (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A] lg:hidden">
          <div className={`${uiTokens.container} flex h-full flex-col py-8`}>
            <div className="flex items-center justify-between">
              <img src={logoSvg} alt="" className="h-7 w-auto" />
              <button
                type="button"
                onClick={() => setShowMobileMenu(false)}
                aria-label="Закрыть меню"
                className="inline-flex h-11 w-11 items-center justify-center text-[#FDFEFF]"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                  <path d="M7 7L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M21 7L7 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="mt-14 flex flex-1 flex-col items-center justify-start gap-10 text-center text-[22px] font-semibold text-[#FDFEFF]">
              {MAIN_NAV_ITEMS.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? 'text-[#FDFEFF]' : 'text-[#FDFEFF]'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="pb-2">
              <button
                type="button"
                onClick={() => setShowAccountMenu((v) => !v)}
                className="flex w-full items-center justify-between rounded-[999px] border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 px-6 py-5 text-[18px] font-semibold text-[#FDFEFF]"
                aria-haspopup="menu"
                aria-expanded={showAccountMenu}
              >
                <span className="truncate">{currentAccount}</span>
                <img
                  src={chevronSvg}
                  alt=""
                  width={20}
                  height={20}
                  className={`h-5 w-5 shrink-0 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`}
                />
              </button>

              {showAccountMenu ? (
                <div className="mt-3 max-h-[180px] overflow-y-auto rounded-[24px] border border-[#FDFEFF]/15 bg-[#121212] px-6 py-4">
                  <div className="space-y-3">
                    {accounts.map((account) => (
                      <button
                        key={account}
                        type="button"
                        onClick={() => {
                          setCurrentAccount(account);
                          setShowAccountMenu(false);
                        }}
                        className="block w-full border-b border-[#FDFEFF]/10 pb-3 text-left text-[16px] text-[#FDFEFF]/92"
                      >
                        {account}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-[999px] border border-[#FDFEFF]/20 bg-transparent px-6 py-5 text-[18px] font-semibold text-[#FDFEFF]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16.5 3.5A2.121 2.121 0 0 1 19.5 6.5L8 18l-4 1 1-4 11.5-11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Добавить учетную запись</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-[999px] bg-[#F6E6E6] px-6 py-5 text-[20px] font-semibold text-[#FF3B30]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 19V5C20 4.44772 19.5523 4 19 4H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

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
