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
  return (
    <section className={supportSectionWrapStyles}>
      <Card className={supportSectionCardStyles} divider={false}>
        <h2 className={supportSectionTitleStyles}>Остались вопросы?</h2>
        <p className={supportSectionLeadStyles}>Напишите в службу поддержки и мы вам поможем</p>
        <p className={supportSectionTextStyles}>
          В рамках тестового запуска web-версии сервиса для проверки контрагентов все пользователи получают
          неограниченный бесплатный доступ
        </p>

        <div className={supportSectionActionsStyles}>
          <Button className="min-w-[260px]">Написать в поддержку</Button>
          <Button className="min-w-[260px]">Запросить тестовый доступ</Button>
        </div>
      </Card>
    </section>
  );
}

