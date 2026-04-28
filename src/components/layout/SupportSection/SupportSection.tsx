import { Button, Card } from '../../ui';
import {
  supportSectionActionsStyles,
  supportSectionCardStyles,
  supportSectionLeadStyles,
  supportSectionTextStyles,
  supportSectionTitleStyles,
  supportSectionWrapStyles,
} from './SupportSection.styles';
import { SUPPORT_TELEGRAM_URL } from '../../../shared/supportLinks';

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
        <Button asChild className="min-w-[260px] w-full lg:w-auto lg:px-[60px]">
          <a href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            Написать в поддержку
          </a>
        </Button>
        <Button asChild className="min-w-[260px] w-full lg:w-auto lg:px-[60px]">
          <a href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            Запросить тестовый доступ
          </a>
        </Button>
      </div>
    </section>
  );
}

