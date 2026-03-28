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
        <h2 className={supportSectionTitleStyles}>Остались вопросы?</h2>
        <div className="">
          <p className={supportSectionLeadStyles}>Напишите в службу поддержки и мы вам поможем</p>
          <p className={supportSectionTextStyles}>
            В рамках тестового запуска web-версии сервиса для проверки контрагентов все пользователи получают
            неограниченный бесплатный доступ
          </p>
        </div>
      </Card>

      <div className={supportSectionActionsStyles}>
        <Button className="min-w-[260px] w-full lg:w-auto lg:px-[60px]">Написать в поддержку</Button>
        <Button className="min-w-[260px] w-full lg:w-auto lg:px-[60px]">Запросить тестовый доступ</Button>
      </div>
    </section>
  );
}

