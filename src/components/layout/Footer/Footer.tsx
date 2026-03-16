import { Link } from 'react-router-dom';
import {
  MAIN_NAV_ITEMS,
  FOOTER_SUPPORT_LINKS,
  FOOTER_EXTRA_LINKS,
} from '../../../shared/navConfig';
import { uiTokens } from '../../ui';
import supportSvg from '../../../assets/icons/support.svg';
import arrowUpSvg from '../../../assets/icons/arrow_up.svg';
import footerDecorMob from '../../../assets/footer_decor_mob.svg';
import footerDecor from '../../../assets/footer_decor.svg';

const EmailIcon = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 lg:h-[29px] lg:w-[29px]">
    <path d="M24.1667 3.625H4.83337C2.83147 3.625 1.20837 5.24809 1.20837 7.25V21.75C1.20837 23.7519 2.83147 25.375 4.83337 25.375H24.1667C26.1686 25.375 27.7917 23.7519 27.7917 21.75V7.25C27.7917 5.24809 26.1686 3.625 24.1667 3.625ZM24.1667 6.04167C24.3063 6.04167 24.4404 6.06523 24.5649 6.10903L14.5 14.1611L4.43523 6.10903C4.56317 6.0642 4.6978 6.04142 4.83337 6.04167H24.1667ZM24.1667 22.9583H4.83337C4.5129 22.9583 4.20556 22.831 3.97895 22.6044C3.75235 22.3778 3.62504 22.0705 3.62504 21.75V8.5556L13.7451 16.6517C13.9657 16.8285 14.2327 16.9167 14.5 16.9167C14.7674 16.9167 15.0344 16.8285 15.2549 16.6517L25.375 8.5556V21.75C25.375 22.0705 25.2477 22.3778 25.0211 22.6044C24.7945 22.831 24.4872 22.9583 24.1667 22.9583Z" fill="currentColor" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 lg:h-[29px] lg:w-[29px]">
    <path d="M26.9031 2.93369C26.559 2.64748 26.1438 2.4599 25.7017 2.39091C25.2595 2.32193 24.8069 2.37412 24.392 2.54193L2.73759 11.2846C2.2745 11.4752 1.8803 11.802 1.60732 12.2219C1.33433 12.6417 1.19548 13.1346 1.20918 13.6351C1.22288 14.1357 1.38848 14.6203 1.68402 15.0245C1.97955 15.4288 2.39104 15.7336 2.86386 15.8985L7.24407 17.4219L9.68551 25.4955C9.71869 25.6034 9.76684 25.706 9.82855 25.8005C9.83791 25.815 9.85112 25.8258 9.86108 25.8399C9.93238 25.9394 10.0185 26.0273 10.1166 26.1006C10.1444 26.1218 10.1711 26.1418 10.2009 26.1606C10.3156 26.2367 10.4427 26.2924 10.5764 26.3251L10.5907 26.3263L10.5988 26.3298C10.6792 26.3461 10.761 26.3544 10.8431 26.3546C10.851 26.3546 10.858 26.3508 10.8658 26.3506C10.9896 26.3485 11.1123 26.3272 11.2296 26.2874C11.2569 26.2781 11.2803 26.2626 11.3067 26.2514C11.3942 26.2151 11.4771 26.1687 11.5536 26.113C11.6149 26.0613 11.6762 26.0097 11.7375 25.9581L15.0026 22.3531L19.8725 26.1256C20.3013 26.4594 20.829 26.6409 21.3723 26.6413C21.9417 26.6406 22.4935 26.4441 22.9352 26.0849C23.3769 25.7257 23.6817 25.2255 23.7985 24.6683L27.7409 5.31496C27.8302 4.87938 27.7995 4.4277 27.6519 4.00826C27.5043 3.58881 27.2455 3.21738 26.9031 2.93369ZM11.3222 17.8066C11.1547 17.9735 11.0401 18.1861 10.993 18.4178L10.619 20.2352L9.67158 17.1019L14.5838 14.5439L11.3222 17.8066ZM21.3535 24.2152L15.5986 19.7571C15.3578 19.571 15.0558 19.4825 14.7527 19.5092C14.4495 19.5359 14.1676 19.6758 13.9631 19.9011L12.9174 21.0553L13.2869 19.2591L21.8455 10.7005C22.0498 10.4965 22.1743 10.2261 22.1964 9.93819C22.2185 9.65033 22.1368 9.36407 21.966 9.13126C21.7953 8.89846 21.5468 8.7345 21.2656 8.6691C20.9844 8.60369 20.689 8.64117 20.4331 8.77472L8.15002 15.17L3.64975 13.5231L25.3738 4.83231L21.3535 24.2152Z" fill="currentColor" />
  </svg>
);

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 bg-[#1A1A1A] py-[30px] mx-4 rounded-[28px] border border-[#FDFEFF] lg:mx-0 lg:py-20 lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:border-[#FDFEFF]"
    >
      <div className={uiTokens.container}>
        {/* Row: contacts (col-lg-5) + nav (col-lg-7) */}
        <div className="mb-10 grid grid-cols-1 gap-8 lg:mb-5 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="mb-10 lg:mb-10">
              <div className="space-y-10 lg:space-y-10">
              <div>
                <a
                  href="mailto:admin@trstme.com"
                  className="footer__contact__link inline-flex items-center gap-[11px] font-semibold leading-[100%] text-[#FDFEFF] transition-colors hover:text-[#0EB8D2] active:text-[#057889] mb-5 lg:mb-5"
                >
                  <EmailIcon />
                  admin@trstme.com
                </a>
                <p className="text-base leading-[100%] text-[#FDFEFF]/80 lg:text-[18px]">Запросите тестовый доступ уже сегодня</p>
              </div>
              <div>
                <a
                  href="https://t.me/ceo_trustme"
                  className="footer__contact__link inline-flex items-center gap-[11px] font-semibold leading-[100%] text-[#FDFEFF] transition-colors hover:text-[#0EB8D2] active:text-[#057889] mb-5 lg:mb-5"
                >
                  <TelegramIcon />
                  ceo_trustme
                </a>
                <p className="text-base leading-[100%] text-[#FDFEFF]/80 lg:text-[18px]">Запросите тестовый доступ уже сегодня</p>
              </div>
              </div>
            </div>
          </div>

          <nav className="flex flex-col justify-between gap-10 lg:col-span-7 lg:flex-row">
            <div>
              <h3 className="mb-[30px] inline-block border-b border-[#FDFEFF] pb-[15px] text-base font-semibold normal-case text-[#FDFEFF] whitespace-nowrap lg:text-[24px] md:pb-0 md:border-b-0">
                Навигация
              </h3>
              <ul className="flex flex-col gap-[15px] text-[18px]">
                {MAIN_NAV_ITEMS.map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-[#FDFEFF]/80 transition hover:text-[#0EB8D2] hover:underline active:underline active:text-[#057889]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-[30px] inline-block border-b border-[#FDFEFF] pb-[15px] text-base font-semibold normal-case text-[#FDFEFF] whitespace-nowrap lg:text-[24px] md:pb-0 md:border-b-0">
                Служба поддержки
              </h3>
              <ul className="flex flex-col gap-[15px] text-[18px]">
                {FOOTER_SUPPORT_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[#FDFEFF]/80 transition hover:text-[#0EB8D2] hover:underline active:underline active:text-[#057889]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-[30px] inline-block border-b border-[#FDFEFF] pb-[15px] text-base font-semibold normal-case text-[#FDFEFF] whitespace-nowrap lg:text-[24px] md:pb-0 md:border-b-0">
                Дополнительно
              </h3>
              <ul className="flex flex-col gap-[15px] text-[18px]">
                {FOOTER_EXTRA_LINKS.map(({ label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="text-[#FDFEFF]/80 transition hover:text-[#0EB8D2] hover:underline active:underline active:text-[#057889]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Row: legal + scroll top */}
        <div className="flex flex-col gap-4 border-t border-[#FDFEFF]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-col gap-[3px] text-base text-[#FDFEFF]/80">
            <li>ИП Гуженков Н.П</li>
            <li>ИНН 302500352845</li>
            <li>ОГРН 325508100615523</li>
          </ul>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[100px] bg-[#057889] text-[#FDFEFF] transition hover:shadow-[0_0_20px_#0EB8D2] active:shadow-[0_0_20px_#0EB8D2] md:flex"
            aria-label="Наверх"
          >
            <img src={arrowUpSvg} alt="" width={22} height={27} className="h-6 w-5" />
          </button>
        </div>

        {/* Footer cut: decor + brand + description */}
        <div className="relative mt-10 pt-10 lg:mt-[90px] lg:pt-[60px]">
          {/* Decor line: mobile */}
          <div
            className="absolute top-0 left-0 right-0 h-[11px] bg-contain bg-center bg-no-repeat lg:hidden"
            style={{ backgroundImage: `url(${footerDecorMob})` }}
            aria-hidden
          />
          {/* Decor line: desktop */}
          <div
            className="absolute top-0 left-0 right-0 hidden h-[11px] bg-contain bg-center bg-no-repeat lg:block"
            style={{ backgroundImage: `url(${footerDecor})` }}
            aria-hidden
          />

          <div className="mb-10 flex flex-col justify-between gap-5 lg:mb-[60px] lg:flex-row lg:items-center md:mb-10 md:items-start">
            <h3 className="text-[24px] font-semibold uppercase tracking-[-0.03em] text-[#FDFEFF] lg:text-[48px] mb-0">
              Trust Me
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-2.5 rounded-[100px] border border-[#FDFEFF] px-[15px] py-[15px] text-base font-semibold leading-[100%] text-[#FDFEFF] transition hover:bg-gradient-to-b hover:from-[#0EB8D2] active:bg-gradient-to-b active:from-[#0EB8D2] lg:text-[24px] md:items-start md:text-left md:text-[20px] md:leading-[120%]"
            >
              <img src={supportSvg} alt="" width={29} height={29} className="h-5 w-5 lg:h-[29px] lg:w-[29px]" />
              Служба поддержки с&nbsp;10:00&nbsp;до&nbsp;22:00
            </button>
          </div>
          <p className="max-w-[880px] text-[18px] leading-[1.45] text-[#FDFEFF]/80">
            По&nbsp;Вашему запросу мы&nbsp;можем предоставить примеры отчётов, кейсы из&nbsp;практики или провести онлайн‑демонстрацию
          </p>
        </div>
      </div>
    </footer>
  );
}
