import { Button, Card } from '../../ui';
import titleDecorMob from '../../../assets/title_decor_mob.svg';
import titleDecorPc from '../../../assets/title_decor_pc.svg';
import {
  supportSectionActionsStyles,
  supportSectionCardStyles,
  supportSectionLeadStyles,
  supportSectionTextStyles,
  supportSectionTitleStyles,
  supportSectionTitleWrapStyles,
  supportSectionWrapStyles,
} from './SupportSection.styles';

export function SupportSection() {
  return (
    <section className={supportSectionWrapStyles}>
      <Card className={supportSectionCardStyles}>
        <div className={supportSectionTitleWrapStyles}>
          <h2 className={supportSectionTitleStyles}>Остались вопросы?</h2>
          <img
            src={titleDecorMob}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[calc(100%+20px)] top-1/2 h-auto w-[76px] -translate-y-1/2 lg:hidden"
          />
          <img
            src={titleDecorMob}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[calc(100%+20px)] top-1/2 h-auto w-[76px] -translate-y-1/2 scale-x-[-1] lg:hidden"
          />
          <img
            src={titleDecorPc}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[calc(100%+30px)] top-1/2 hidden h-auto w-[267px] -translate-y-1/2 shrink-0 lg:block"
          />
        </div>
        <div className="">
          <p className={supportSectionLeadStyles}>Напишите в службу поддержки и мы вам поможем</p>
          <p className={supportSectionTextStyles}>
            В рамках тестового запуска web-версии сервиса для проверки контрагентов все пользователи получают
            неограниченный бесплатный доступ
          </p>
        </div>
      </Card>

      <div className={supportSectionActionsStyles}>
        <Button className="min-w-[260px] w-full lg:w-auto">Написать в поддержку</Button>
        <Button className="min-w-[260px] w-full lg:w-auto">Запросить тестовый доступ</Button>
      </div>
    </section>
  );
}

