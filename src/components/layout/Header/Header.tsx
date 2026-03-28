import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useAuthModalUi } from '../../../context/AuthModalUiContext';
import { MAIN_NAV_ITEMS } from '../../../shared/navConfig';
import { uiTokens, Button } from '../../ui';
import logoSvg from '../../../assets/icons/logo.svg';
import notificationsSvg from '../../../assets/icons/notifications.svg';
import accountSvg from '../../../assets/icons/account.svg';
import chevronSvg from '../../../assets/icons/chevron.svg';

// === ИМПОРТЫ ИКОНОК ДЛЯ УВЕДОМЛЕНИЙ (размести SVG файлы в эти папки) ===
// Иконки категорий (слева в карточке):
import employeeIcon from '../../../assets/new_staff.png';      // Человек/сотрудник
import warningIcon from '../../../assets/icons/notifications/warning.svg';        // Восклицательный знак/блокировка
import calendarIcon from '../../../assets/icons/notifications/calendar.svg';      // Календарь/тариф
import documentIcon from '../../../assets/icons/notifications/document.svg';      // Документ/списание
import moneyIcon from '../../../assets/icons/notifications/money.svg';            // Пополнение/деньги
import tariffIcon from '../../../assets/icons/notifications/tariff.svg';          // Тариф/галочка
import editIcon from '../../../assets/icons/notifications/edit.svg';              // Карандаш/изменение

// Иконки действий (справа в карточке):
import checkReadIcon from '../../../assets/icons/notifications/check-read.svg';   // Галочка "прочитано"
import trashIcon from '../../../assets/icons/notifications/trash.svg';            // Мусорка "удалить"

// Типы уведомлений
type NotificationCategory = 'all' | 'finance' | 'tariff' | 'account' | 'service';

interface Notification {
  id: string;
  title: string;
  titleHighlight?: string; // Текст, который нужно выделить цветом (имена, суммы, email)
  category: 'account' | 'tariff' | 'finance' | 'service';
  time: string;
  icon: string; // путь к иконке
  action?: string; // Текст кнопки действия ("Продлить" и т.д.)
  isRead?: boolean;
}

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { openAuthModal } = useAuthModalUi();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState<NotificationCategory>('all');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('user.example@gmail.com');

  // === ДАННЫЕ УВЕДОМЛЕНИЙ (потом заменишь на API) ===
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Добавлен новый сотрудник: Иванов Иван',
      titleHighlight: 'Иванов Иван',
      category: 'account',
      time: '11 февраля 2026 в 02:49',
      icon: employeeIcon,
    },
    {
      id: '2',
      title: 'Аккаунт user@company.ru заблокирован. Превышен лимит доступных проверок',
      titleHighlight: 'user@company.ru',
      category: 'account',
      time: '11 февраля 2026 в 02:49',
      icon: warningIcon,
    },
    {
      id: '3',
      title: 'Тарифный план учетной записи user@company.ru истекает через 3 дня',
      titleHighlight: 'user@company.ru',
      category: 'tariff',
      time: '11 февраля 2026 в 02:49',
      icon: calendarIcon,
      action: 'Продлить',
    },
    {
      id: '4',
      title: 'Списано 490 ₽ за проверку юр.лица «ООО УМНЫЙ РИТЕЙЛ»',
      titleHighlight: '490 ₽',
      category: 'finance',
      time: '11 февраля 2026 в 02:49',
      icon: documentIcon,
    },
    {
      id: '5',
      title: 'Баланс успешно пополнен на 10 000 ₽',
      titleHighlight: '10 000 ₽',
      category: 'finance',
      time: '11 февраля 2026 в 02:49',
      icon: moneyIcon,
    },
    {
      id: '6',
      title: 'Тариф «Индивидуальный» активирован',
      titleHighlight: 'активирован',
      category: 'tariff',
      time: '11 февраля 2026 в 02:49',
      icon: tariffIcon,
    },
    {
      id: '7',
      title: 'Тариф «Индивидуальный» изменен',
      titleHighlight: 'изменен',
      category: 'tariff',
      time: '11 февраля 2026 в 02:49',
      icon: editIcon,
    },
  ];

  const accounts = [
    'user1.example@gmail.com',
    'user2.example@gmail.com',
    'user3.example@gmail.com',
  ] as const;

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    setShowMobileMenu(false);
    navigate('/');
  };

  // Фильтрация уведомлений по табу
  const filteredNotifications = activeNotificationTab === 'all'
    ? notifications
    : notifications.filter(n => n.category === activeNotificationTab);

  // Подсветка текста (разбивает строку и выделяет цветом часть)
  const renderTitle = (notification: Notification) => {
    if (!notification.titleHighlight) {
      return <span className="text-[15px] leading-[1.4] text-[#FDFEFF]">{notification.title}</span>;
    }

    const parts = notification.title.split(notification.titleHighlight);
    return (
      <span className="text-[15px] leading-[1.4] text-[#FDFEFF]">
        {parts[0]}
        <span className="text-[#0EB8D2]">{notification.titleHighlight}</span>
        {parts[1]}
      </span>
    );
  };

  useEffect(() => {
    if (!showMobileMenu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  if (!isAuthenticated) {
    return (
      <>
        <header className={`${uiTokens.container} pt-6 pb-5 sm:pt-8`}>
          <div className="flex w-full items-center justify-between gap-4">
            <Link to="/" className="flex shrink-0" aria-label="Trust Me — на главную">
              <img src={logoSvg} alt="" width={122} height={29} className="w-[122px] h-auto" />
            </Link>
            <Button
              type="button"
              variant="primary"
              className="min-h-0 text-[14px] leading-[17px] lg:text-[18px] lg:leading-[22px] px-[30px] py-[10px]"
              onClick={openAuthModal}
            >
              Войти
            </Button>
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      <header className={`${uiTokens.container} pt-6 pb-5 sm:pt-8`}>
        {/* Mobile header (<= lg) */}
        <div className="relative flex items-center lg:hidden w-full justify-between">
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

          <Link
            to="/cabinet"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="Trust Me — на главную"
          >
            <img src={logoSvg} alt="" width={122} height={29} className="w-[122px] h-auto" />
          </Link>

          <div className="flex items-center justify-end gap-3">
            <button
              className="relative inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF]"
              type="button"
              onClick={() => setShowNotifications(true)}
              aria-label="Уведомления"
            >
              <img src={notificationsSvg} alt="" className="h-auto w-[18px]" width={19} height={20} />
            </button>
            <button
              className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF]"
              type="button"
              onClick={() => setShowAccountMenu((current) => !current)}
              aria-label="Аккаунт"
            >
              <img src={accountSvg} alt="" className="h-auto w-[18px]" width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Desktop header (lg+) */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-10">
            <Link to="/cabinet" className="flex shrink-0" aria-label="Trust Me — на главную">
              <img src={logoSvg} alt="" width={122} height={29} className="w-[122px] h-auto" />
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-[#FDFEFF] lg:text-[20px]">
              {MAIN_NAV_ITEMS.map(([label, to]) => (
                <NavLink
                  className={({ isActive }) =>
                    `transition-colors hover:text-[#FDFEFF] ${isActive ? 'text-[#FDFEFF]' : 'text-[#FDFEFF]'}`
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
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[100px] border border-[#FDFEFF]/25 bg-[#FDFEFF]/5 text-[#FDFEFF] transition hover:bg-[#FDFEFF]/10"
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
                  showAccountMenu ? 'text-[#FDFEFF]' : 'text-[#FDFEFF] hover:text-[#FDFEFF]'
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
                        className="flex w-full items-center border-b border-[#FDFEFF]/15 pb-3 text-left text-base text-[#FDFEFF] transition hover:text-[#FDFEFF] lg:text-[18px]"
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
          <div
            className={`${uiTokens.container} flex h-full flex-col overflow-y-auto overscroll-contain py-8 [-webkit-overflow-scrolling:touch]`}
          >
            <div className="flex items-center justify-between">
              <img src={logoSvg} alt="" width={122} height={29} className="w-[122px] h-auto" />
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

            <nav className="mt-[40px] mb-[60px] flex flex-col items-center justify-start gap-[28px] text-center text-[16px] font-semibold text-[#FDFEFF]">
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
                className="flex w-full items-center justify-between rounded-[999px] border border-[#FDFEFF]/25 bg-[#1A1A1A] px-6 py-5 text-[18px] font-semibold text-[#FDFEFF]"
                aria-haspopup="menu"
                aria-expanded={showAccountMenu}
              >
                <span className="flex-1 truncate text-center">{currentAccount}</span>
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
                        className="block w-full border-b border-[#FDFEFF]/10 pb-3 text-left text-[16px] text-[#FDFEFF]"
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
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3161_8717)">
                  <path d="M7 17V13L17 3L21 7L11 17H7Z" stroke="#FDFEFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 6L18 10" stroke="#FDFEFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3161_8717">
                  <rect width="18" height="18" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
                <span>Добавить учетную запись</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-[999px] bg-[#F6E6E6] px-6 py-5 text-[20px] font-semibold text-[#FF3B30]"
              >
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.11111 0C7.33767 0.000251296 7.55558 0.0870037 7.72033 0.242532C7.88507 0.39806 7.98421 0.610625 7.99749 0.836795C8.01076 1.06297 7.93718 1.28567 7.79177 1.45941C7.64635 1.63314 7.44008 1.7448 7.21511 1.77156L7.11111 1.77778H2.66667C2.44895 1.77781 2.23881 1.85774 2.07611 2.00241C1.91342 2.14709 1.80947 2.34644 1.784 2.56267L1.77778 2.66667V13.3333C1.77781 13.5511 1.85774 13.7612 2.00241 13.9239C2.14709 14.0866 2.34644 14.1905 2.56267 14.216L2.66667 14.2222H6.66667C6.89323 14.2225 7.11114 14.3092 7.27588 14.4648C7.44063 14.6203 7.53976 14.8328 7.55304 15.059C7.56632 15.2852 7.49273 15.5079 7.34732 15.6816C7.20191 15.8554 6.99564 15.967 6.77067 15.9938L6.66667 16H2.66667C1.98648 16 1.33199 15.7402 0.837101 15.2735C0.342216 14.8069 0.0443489 14.1688 0.00444455 13.4898L4.14262e-09 13.3333V2.66667C-3.7886e-05 1.98648 0.259845 1.33199 0.726474 0.837101C1.1931 0.342216 1.83121 0.0443489 2.51022 0.00444455L2.66667 0H7.11111ZM12.184 4.85689L14.6978 7.37156C14.8644 7.53825 14.958 7.7643 14.958 8C14.958 8.2357 14.8644 8.46175 14.6978 8.62844L12.184 11.1431C12.0172 11.3098 11.791 11.4034 11.5552 11.4033C11.3194 11.4032 11.0933 11.3095 10.9267 11.1427C10.76 10.9759 10.6664 10.7497 10.6665 10.5139C10.6666 10.2781 10.7603 10.052 10.9271 9.88533L11.9236 8.88889H7.11111C6.87536 8.88889 6.64927 8.79524 6.48257 8.62854C6.31587 8.46184 6.22222 8.23575 6.22222 8C6.22222 7.76425 6.31587 7.53816 6.48257 7.37146C6.64927 7.20476 6.87536 7.11111 7.11111 7.11111H11.9236L10.9271 6.11467C10.7603 5.94799 10.6666 5.72189 10.6665 5.48609C10.6664 5.2503 10.76 5.02413 10.9267 4.85733C11.0933 4.69054 11.3194 4.59679 11.5552 4.59671C11.791 4.59663 12.0172 4.69022 12.184 4.85689Z" fill="#EB4335"/>
                </svg>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* === МОДАЛКА УВЕДОМЛЕНИЙ (доработанная под скриншот) === */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 py-8 sm:px-6 sm:py-12"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="mt-12 w-full max-w-[800px] rounded-[28px] border border-[#FDFEFF]/20 bg-[#1A1A1A] p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Шапка с табами и кнопкой Очистить */}
            <header className="mb-5 flex items-center justify-between gap-4 border-b border-[#FDFEFF]/10 pb-4">
              <nav className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Все' },
                  { id: 'finance', label: 'Финансы' },
                  { id: 'tariff', label: 'Тариф' },
                  { id: 'account', label: 'Аккаунт' },
                  { id: 'service', label: 'Сервис' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveNotificationTab(tab.id as NotificationCategory)}
                    className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                      activeNotificationTab === tab.id
                        ? 'bg-[#FDFEFF] text-[#1A1A1A]'
                        : 'bg-[#FDFEFF]/5 text-[#FDFEFF] hover:bg-[#FDFEFF]/10'
                    }`}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <button
                className="shrink-0 text-[14px] font-medium text-[#FDFEFF] underline underline-offset-4 hover:text-[#0EB8D2]"
                type="button"
                onClick={() => console.log('Очистить все')}
              >
                Очистить
              </button>
            </header>

            {/* Список уведомлений */}
            <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center text-[#FDFEFF]/50">
                  Нет уведомлений
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-start gap-4 rounded-[20px] bg-[#2A2A2A] p-4"
                  >
                    {/* Иконка слева */}
                    <div className="shrink-0">
                      <img
                        src={item.icon}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>

                    {/* Контент */}
                    <div className="min-w-0 flex-1">
                      {/* Текст уведомления */}
                      <div className="mb-1">
                        {renderTitle(item)}
                      </div>

                      {/* Время и доп.действие */}
                      <div className="flex flex-wrap items-center gap-3">
                        <time className="text-[13px] text-[#FDFEFF]/50">
                          {item.time}
                        </time>

                        {item.action && (
                          <button
                            className="rounded-full border border-[#FDFEFF]/30 bg-transparent px-3 py-1 text-[13px] font-medium text-[#FDFEFF] transition hover:bg-[#FDFEFF]/10"
                            type="button"
                            onClick={() => console.log('Action:', item.action)}
                          >
                            {item.action}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Кнопки действий справа */}
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FDFEFF]/60 transition hover:text-[#0EB8D2]"
                        type="button"
                        aria-label="Отметить прочитанным"
                        title="Отметить прочитанным"
                      >
                        <img src={checkReadIcon} alt="" className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FDFEFF]/60 transition hover:text-[#FF3B30]"
                        type="button"
                        aria-label="Удалить"
                        title="Удалить"
                      >
                        <img src={trashIcon} alt="" className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
