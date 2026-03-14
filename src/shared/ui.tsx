import { Button, SectionCard } from '../components/ui';

export function DashboardCard({
  title,
  aside,
  children,
  className = '',
}: {
  title: string;
  aside?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SectionCard title={title} aside={aside} className={className}>
      {children}
    </SectionCard>
  );
}

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-[34px] leading-[0.95] font-semibold uppercase sm:text-[56px]">{title}</h1>
        <span className="h-2.5 w-2.5 rounded-full bg-[#0EB8D2]" />
        <span className="hidden h-px w-[160px] bg-[linear-gradient(90deg,#0EB8D2,transparent)] sm:block" />
      </div>

      <p className="max-w-[900px] text-base leading-[1.45] text-white/75 sm:text-[22px]">{description}</p>
    </div>
  );
}

export function SupportSection() {
  return (
    <section className="pt-10 sm:pt-16">
      <div className="rounded-[28px] border border-white/85 bg-[linear-gradient(90deg,rgba(14,184,210,0.28),rgba(14,184,210,0.12)_55%,rgba(14,184,210,0.18))] px-5 py-7 sm:px-8 sm:py-9">
        <h2 className="mb-5 text-[28px] leading-[1] font-semibold uppercase text-white sm:text-[44px]">
          Остались вопросы?
        </h2>
        <p className="mb-5 text-base font-semibold leading-[1.4] text-white sm:text-[24px]">
          Напишите в службу поддержки и мы вам поможем
        </p>
        <p className="max-w-[980px] text-base leading-[1.45] text-white/85 sm:text-[20px]">
          В рамках тестового запуска web-версии сервиса для проверки контрагентов все пользователи получают неограниченный
          бесплатный доступ
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row">
        <Button className="min-w-[260px]">
          Написать в поддержку
        </Button>
        <Button className="min-w-[260px]">
          Запросить тестовый доступ
        </Button>
      </div>
    </section>
  );
}
