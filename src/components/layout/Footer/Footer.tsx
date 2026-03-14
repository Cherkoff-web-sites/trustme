const containerClassName = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';
const footerLinkClassName = 'text-white/85 transition-colors hover:text-white';
const footerSectionTitleClassName = 'mb-4 text-[18px] font-semibold text-white';

export function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 py-10 sm:mt-14 sm:py-14" id="footer">
      <div className={containerClassName}>
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-5">
            <div>
              <a className="inline-flex items-center gap-3 text-[18px] font-medium text-white" href="mailto:admin@trstme.com">
                <span className="inline-flex h-[29px] w-[29px] items-center justify-center rounded-full border border-white/25 text-sm">
                  @
                </span>
                admin@trstme.com
              </a>
              <p className="mt-2 text-sm leading-[1.4] text-white/70">Запросите тестовый доступ уже сегодня</p>
            </div>

            <div>
              <a className="inline-flex items-center gap-3 text-[18px] font-medium text-white" href="https://t.me/ceo_trustme">
                <span className="inline-flex h-[29px] w-[29px] items-center justify-center rounded-full border border-white/25 text-sm">
                  tg
                </span>
                ceo_trustme
              </a>
              <p className="mt-2 text-sm leading-[1.4] text-white/70">Запросите тестовый доступ уже сегодня</p>
            </div>
          </div>

          <nav className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className={footerSectionTitleClassName}>Информация</h3>
              <ul className="grid gap-3 text-sm">
                <li><a className={footerLinkClassName} href="#goals">О проекте</a></li>
                <li><a className={footerLinkClassName} href="#features">Функции</a></li>
                <li><a className={footerLinkClassName} href="#advantages">Преимущества</a></li>
                <li><a className={footerLinkClassName} href="#launch">Запуск</a></li>
                <li><a className={footerLinkClassName} href="#footer">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h3 className={footerSectionTitleClassName}>Служба поддержки</h3>
              <ul className="grid gap-3 text-sm">
                <li><a className={footerLinkClassName} href="mailto:support@trstme.com">support@trstme.com</a></li>
                <li><a className={footerLinkClassName} href="https://t.me/trstme_support">t.me/trstme_support</a></li>
                <li><a className={footerLinkClassName} href="https://t.me/trustme_supportbot">@trustme_supportbot</a></li>
              </ul>
            </div>

            <div>
              <h3 className={footerSectionTitleClassName}>Дополнительно</h3>
              <ul className="grid gap-3 text-sm">
                <li><a className={footerLinkClassName} href="https://trstme.com/docs/refund.pdf" target="_blank" rel="noreferrer">Политика возврата средств</a></li>
                <li><a className={footerLinkClassName} href="https://trstme.com/docs/offer.pdf" target="_blank" rel="noreferrer">Публичная оферта</a></li>
                <li><a className={footerLinkClassName} href="https://trstme.com/docs/confidentiality.pdf" target="_blank" rel="noreferrer">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            <li>ИП Гуженков Н.П</li>
            <li>ИНН 302500352845</li>
            <li>ОГРН 325508100615523</li>
          </ul>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg text-white/85 transition hover:bg-white/5"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
            aria-label="Наверх"
          >
            ↑
          </button>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[28px] font-semibold uppercase tracking-[-0.03em] text-white">Trust Me</h3>
            <button
              className="inline-flex w-full items-center justify-center rounded-full border border-white px-4 py-3 text-sm text-white sm:w-auto"
              type="button"
            >
              Служба поддержки с 10:00 до 22:00
            </button>
          </div>
          <p className="max-w-[880px] text-sm leading-[1.45] text-white/70">
            По Вашему запросу мы можем предоставить примеры отчётов, кейсы из практики или провести онлайн-демонстрацию
          </p>
        </div>
      </div>
    </footer>
  );
}
