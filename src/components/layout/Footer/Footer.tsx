import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../lib/cn';
import {
  MAIN_NAV_ITEMS,
  FOOTER_SUPPORT_LINKS,
  FOOTER_EXTRA_LINKS,
} from '../../../shared/navConfig';
import { uiTokens, designTokens } from '../../ui';
import { combineStyles } from '../../../lib/combineStyles';
import logoSvg from '../../../assets/icons/logo.svg';
import footerDecorMob from '../../../assets/footer_decor_mob.svg';
import footerDecor from '../../../assets/footer_decor.svg';
import {
  footerBrandRowClassName,
  footerContactCaptionClassName,
  footerContactLinkClassName,
  footerDecorImgClassName,
  footerDecorStripClassName,
  footerDescriptionClassName,
  footerLegalListClassName,
  footerLogoImgClassName,
  footerNavColumnTitleClassName,
  footerNavLinkClassName,
  footerNavListClassName,
  footerScrollTopButtonClassName,
  footerSupportHoursButtonClassName,
} from './Footer.styles';

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

const ICON_LIGHT = '#FDFEFF';

const ArrowUpIcon = () => (
  <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-5" aria-hidden>
    <path
      d="M12.0086 25.3515L12.0086 4.5553L19.071 11.6177C19.1944 11.7439 19.3416 11.8443 19.504 11.9132C19.6665 11.9821 19.841 12.018 20.0175 12.019C20.194 12.02 20.3689 11.9859 20.5321 11.9188C20.6954 11.8517 20.8437 11.7529 20.9684 11.6281C21.0932 11.5033 21.192 11.355 21.2591 11.1918C21.3261 11.0285 21.3601 10.8536 21.3591 10.6772C21.3581 10.5007 21.3221 10.3262 21.2532 10.1637C21.1843 10.0012 21.0838 9.85405 20.9577 9.73067L11.6176 0.39066C11.3674 0.140521 11.0281 8.32599e-07 10.6743 8.05887e-07C10.3205 7.79176e-07 9.98117 0.140521 9.73096 0.39066L0.390949 9.73067C0.266837 9.85446 0.168409 10.0016 0.101318 10.1635C0.0342269 10.3254 -0.000204568 10.4991 2.13412e-06 10.6743C5.84536e-05 10.9382 0.0783433 11.1961 0.22496 11.4155C0.371578 11.6349 0.579944 11.8058 0.823718 11.9068C1.06749 12.0078 1.33573 12.0342 1.59452 11.9827C1.85331 11.9313 2.09103 11.8042 2.27763 11.6177L9.34001 4.5553L9.34001 25.3515C9.34001 25.7054 9.48059 26.0448 9.73081 26.295C9.98104 26.5452 10.3204 26.6858 10.6743 26.6858C11.0282 26.6858 11.3676 26.5452 11.6178 26.295C11.868 26.0448 12.0086 25.7054 12.0086 25.3515Z"
      fill={ICON_LIGHT}
    />
  </svg>
);

const SupportHeadsetIcon = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 lg:h-[29px] lg:w-[29px]" aria-hidden>
    <g clipPath="url(#footer-support-clip)">
      <path
        d="M23.0949 13.809C22.8486 13.809 22.6125 13.7111 22.4383 13.537C22.2642 13.3629 22.1663 13.1267 22.1663 12.8804V10.2581C22.1663 6.54383 18.7343 3.5724 14.5149 3.5724C10.2955 3.5724 6.86349 6.58098 6.86349 10.2581V12.8804C6.86349 13.1267 6.76566 13.3629 6.59152 13.537C6.41738 13.7111 6.18119 13.809 5.93492 13.809C5.68865 13.809 5.45246 13.7111 5.27832 13.537C5.10418 13.3629 5.00635 13.1267 5.00635 12.8804V10.2581C5.00635 5.53355 9.27778 1.68555 14.5149 1.68555C19.7521 1.68555 24.0235 5.53355 24.0235 10.2581V12.8804C24.0245 13.0026 24.0011 13.1238 23.9548 13.2369C23.9085 13.35 23.8401 13.4528 23.7537 13.5392C23.6673 13.6256 23.5645 13.694 23.4514 13.7403C23.3383 13.7866 23.2171 13.81 23.0949 13.809Z"
        fill={ICON_LIGHT}
      />
      <path
        d="M20.5841 22.5455C20.3378 22.5455 20.1016 22.4477 19.9275 22.2736C19.7533 22.0994 19.6555 21.8632 19.6555 21.617V12.7992C19.6632 12.5582 19.7645 12.3295 19.9378 12.1618C20.1111 11.994 20.3429 11.9003 20.5841 11.9004C23.7858 11.9004 26.3932 14.2998 26.3932 17.2415C26.3932 20.1832 23.7858 22.5455 20.5841 22.5455ZM21.5126 13.8244V20.5918C22.3256 20.4572 23.0681 20.0486 23.6167 19.4337C24.1654 18.8189 24.4872 18.0348 24.5286 17.2118C24.4888 16.3875 24.1678 15.6017 23.619 14.9854C23.0702 14.369 22.3268 13.9593 21.5126 13.8244ZM8.41608 22.5455C5.21436 22.5455 2.60693 20.1535 2.60693 17.2118C2.60693 14.2701 5.21436 11.9004 8.41608 11.9004C8.66235 11.9004 8.89853 11.9982 9.07268 12.1724C9.24682 12.3465 9.34465 12.5827 9.34465 12.829V21.617C9.34465 21.8632 9.24682 22.0994 9.07268 22.2736C8.89853 22.4477 8.66235 22.5455 8.41608 22.5455ZM7.48751 13.8244C6.67334 13.9593 5.92996 14.369 5.38118 14.9854C4.8324 15.6017 4.51135 16.3875 4.4715 17.2118C4.513 18.0348 4.83479 18.8189 5.38343 19.4337C5.93206 20.0486 6.67453 20.4572 7.48751 20.5918V13.8244Z"
        fill={ICON_LIGHT}
      />
      <path
        d="M20.2794 25.5684H17.204C16.9577 25.5684 16.7215 25.4705 16.5474 25.2964C16.3732 25.1223 16.2754 24.8861 16.2754 24.6398C16.2754 24.3935 16.3732 24.1574 16.5474 23.9832C16.7215 23.8091 16.9577 23.7112 17.204 23.7112H20.2794C20.7601 23.7112 21.2211 23.5203 21.5611 23.1803C21.901 22.8404 22.092 22.3794 22.092 21.8987V21.4901C22.092 21.2438 22.1898 21.0076 22.3639 20.8335C22.5381 20.6594 22.7743 20.5615 23.0205 20.5615C23.2668 20.5615 23.503 20.6594 23.6771 20.8335C23.8513 21.0076 23.9491 21.2438 23.9491 21.4901V21.8987C23.9491 22.8719 23.5625 23.8053 22.8743 24.4935C22.1861 25.1818 21.2527 25.5684 20.2794 25.5684Z"
        fill={ICON_LIGHT}
      />
      <path
        d="M15.6142 27.3144H13.7793C13.1055 27.3144 12.4593 27.0468 11.9829 26.5703C11.5064 26.0939 11.2388 25.4477 11.2388 24.7739V24.6699C11.2407 23.9973 11.5093 23.353 11.9855 22.8782C12.4617 22.4034 13.1068 22.1367 13.7793 22.1367H15.6142C16.286 22.1367 16.9303 22.4036 17.4054 22.8787C17.8805 23.3537 18.1473 23.998 18.1473 24.6699V24.7739C18.1473 25.4464 17.8807 26.0915 17.4059 26.5677C16.931 27.0439 16.2867 27.3125 15.6142 27.3144ZM13.7942 23.9939C13.6142 23.9939 13.4415 24.0648 13.3135 24.1914C13.1856 24.318 13.1127 24.4899 13.1108 24.6699V24.7739C13.1108 24.9551 13.1828 25.129 13.3109 25.2571C13.4391 25.3853 13.6129 25.4573 13.7942 25.4573H15.6142C15.7942 25.4553 15.9661 25.3825 16.0927 25.2545C16.2192 25.1266 16.2902 24.9538 16.2902 24.7739V24.6699C16.2902 24.4906 16.219 24.3186 16.0922 24.1919C15.9654 24.0651 15.7935 23.9939 15.6142 23.9939H13.7942Z"
        fill={ICON_LIGHT}
      />
    </g>
    <defs>
      <clipPath id="footer-support-clip">
        <rect width="26" height="26" fill="white" transform="translate(1.5 1.5)" />
      </clipPath>
    </defs>
  </svg>
);

const FOOTER_CONTACT_CAPTION = 'Запросите тестовый доступ уже сегодня';

/** Блоки почта / Telegram — правьте здесь, разметка одна. */
const FOOTER_CONTACT_ROWS: readonly {
  href: string;
  label: string;
  Icon: ComponentType;
}[] = [
  { href: 'mailto:admin@trstme.com', label: 'admin@trstme.com', Icon: EmailIcon },
  { href: 'https://t.me/ceo_trustme', label: 'ceo_trustme', Icon: TelegramIcon },
];

type FooterNavLinkItem =
  | { kind: 'router'; key: string; label: string; to: string }
  | { kind: 'href'; key: string; label: string; href: string; external?: boolean };

/** Заголовки колонок и привязка к данным из `navConfig`. */
const FOOTER_NAV_COLUMNS: { title: string; items: FooterNavLinkItem[] }[] = [
  {
    title: 'Информация',
    items: MAIN_NAV_ITEMS.map(([label, to]) => ({
      kind: 'router' as const,
      key: to,
      label,
      to,
    })),
  },
  {
    title: 'Служба поддержки',
    items: FOOTER_SUPPORT_LINKS.map(({ label, href }) => ({
      kind: 'href' as const,
      key: href,
      label,
      href,
    })),
  },
  {
    title: 'Дополнительно',
    items: FOOTER_EXTRA_LINKS.map(({ label, href, external }) => ({
      kind: 'href' as const,
      key: href,
      label,
      href,
      external,
    })),
  },
];

const FOOTER_LEGAL_LINES = ['ИП Гуженков Н.П', 'ИНН 302500352845', 'ОГРН 325508100615523'] as const;

const linkColor = combineStyles(footerNavLinkClassName, designTokens.colors.text.primary);

export function Footer() {
  return (
    <footer
      id="footer"
      className={combineStyles(
        'relative z-10 max-lg:mb-[56px] max-lg:mx-4 max-lg:px-[15px] py-[30px] max-lg:border lg:py-20 lg:rounded-none lg:border-t',
        designTokens.borderRadius.card,
        designTokens.colors.background.page,
        designTokens.colors.border.primary,
      )}
    >
      <div className={uiTokens.container}>
        <div className="max-lg:mb-[40px] grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="mb-10 lg:mb-10">
              <div className="space-y-10 lg:space-y-10">
                {FOOTER_CONTACT_ROWS.map(({ href, label, Icon }) => (
                  <div key={href}>
                    <a
                      href={href}
                      className={combineStyles(footerContactLinkClassName, designTokens.colors.text.primary)}
                    >
                      <Icon />
                      {label}
                    </a>
                    <p className={footerContactCaptionClassName}>{FOOTER_CONTACT_CAPTION}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <nav className="flex flex-col justify-between gap-10 lg:col-span-7 lg:flex-row">
            {FOOTER_NAV_COLUMNS.map(({ title, items }) => (
              <div key={title}>
                <h3 className={footerNavColumnTitleClassName}>{title}</h3>
                <ul className={footerNavListClassName}>
                  {items.map((item) => (
                    <li key={item.key}>
                      {item.kind === 'router' ? (
                        <Link to={item.to} className={linkColor}>
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noreferrer' : undefined}
                          className={linkColor}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className={footerLegalListClassName}>
            {FOOTER_LEGAL_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={combineStyles(
              footerScrollTopButtonClassName,
              designTokens.colors.accent.primaryBg,
              designTokens.colors.accent.secondaryGlowShadow,
            )}
            aria-label="Наверх"
          >
            <ArrowUpIcon />
          </button>
        </div>

        <div className="relative pt-[40px] lg:pt-[60px] mt-[40px] lg:mt-[90px]">
          <div className={footerDecorStripClassName} aria-hidden>
            <img
              src={footerDecorMob}
              alt=""
              width={298}
              height={11}
              decoding="async"
              className={cn(footerDecorImgClassName, 'lg:hidden')}
            />
            <img
              src={footerDecor}
              alt=""
              width={1600}
              height={11}
              decoding="async"
              className={cn(footerDecorImgClassName, 'hidden lg:block')}
            />
          </div>

          <div className={footerBrandRowClassName}>
            <img
              src={logoSvg}
              alt="Trust Me"
              width={122}
              height={29}
              className={footerLogoImgClassName}
            />
            <button
              type="button"
              className={combineStyles(
                footerSupportHoursButtonClassName,
                designTokens.colors.accent.secondaryGradientFromHover,
              )}
            >
              <SupportHeadsetIcon />
              Служба поддержки с&nbsp;10:00&nbsp;до&nbsp;22:00
            </button>
          </div>
          <p className={footerDescriptionClassName}>
            По&nbsp;Вашему запросу мы&nbsp;можем предоставить примеры отчётов, кейсы из&nbsp;практики или провести онлайн‑демонстрацию
          </p>
        </div>
      </div>
    </footer>
  );
}
