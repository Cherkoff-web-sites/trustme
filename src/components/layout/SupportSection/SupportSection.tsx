import { Button, Card } from '../../ui';
import {
  supportSectionActionsStyles,
  supportSectionCardStyles,
  supportSectionLeadStyles,
  supportSectionTextStyles,
  supportSectionTitleStyles,
  supportSectionWrapStyles,
} from './SupportSection.styles';

export function SupportSection() {
  const supportHref = 'https://t.me/trstme_support';

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
          <a href={supportHref} target="_blank" rel="noopener noreferrer">
            Написать в поддержку
          </a>
        </Button>
        <Button asChild className="min-w-[260px] w-full lg:w-auto lg:px-[60px]">
          <a href={supportHref} target="_blank" rel="noopener noreferrer">
            Запросить тестовый доступ
          </a>
        </Button>
      </div>
    </section>
  );
}

