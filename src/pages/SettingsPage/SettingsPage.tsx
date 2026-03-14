import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { containerClassName, labelClassName } from '../../shared/constants';
import { cardClassName } from '../../shared/constants';
import { PersonTypeSwitcher } from '../../components/features/PersonTypeSwitcher';
import { SettingsSidebarNav } from '../../components/features/SettingsSidebarNav';
import { Button, Input, OptionIndicator, SectionCard, SourceBadge, ToggleSwitch } from '../../components/ui';
import { PageTitle } from '../../shared/ui';

type SettingsTab = 'profile' | 'security' | 'tariff';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [email2faEnabled, setEmail2faEnabled] = useState(false);
  const [factorsEnabled, setFactorsEnabled] = useState(true);
  const [mentionsMediaEnabled, setMentionsMediaEnabled] = useState(false);
  const [mentionsTelegramEnabled, setMentionsTelegramEnabled] = useState(false);

  const personalizationFactors = [
    'Розыск МВД',
    'Банкротство',
    'Налоговая задолженность',
    'Приостановка счетов',
    'Спонсор ФБК',
    'Реестр коррупционеров',
    'Обременения',
    'Торги',
    'Перечень террористов и экстремистов',
    'Реестр иностранных агентов',
    'Реестр дисквалифицированных лиц',
    'Организация в реестре недобросовестных поставщиков',
    'Реестр субсидиарных ответчиков',
    'Задолженность перед ФССП',
  ];

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle title="Настройки аккаунта" description="Управляйте настройками аккаунта" />

          <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
            <aside className={`${cardClassName} h-fit p-3`}>
              <SettingsSidebarNav
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  { key: 'profile', label: 'Профиль' },
                  { key: 'security', label: 'Безопасность и вход' },
                  { key: 'tariff', label: 'Персонализация тарифа' },
                ]}
              />
            </aside>

            <div className="space-y-4">
              {activeTab === 'profile' ? (
                <SectionCard title="Основная информация">
                  <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full text-[32px] font-semibold text-[#151515]">
                        <img src="/user.png" alt="Аватар пользователя" />
                      </div>
                      <Button variant="ghost" className="text-lg font-medium text-white hover:text-[#0EB8D2]">
                        Изменить фото
                      </Button>
                    </div>

                    <div>
                      <PersonTypeSwitcher
                        className="mb-5 sm:gap-8"
                        value="individual"
                        onChange={() => {}}
                        options={[
                          { value: 'legal', label: 'Юридическое лицо' },
                          { value: 'individual', label: 'Физическое лицо' },
                        ]}
                      />

                      <div className="space-y-4">
                        <label className="flex flex-col gap-2.5">
                          <span className={labelClassName}>Никнейм</span>
                          <Input defaultValue="user.example@gmail.com" />
                        </label>

                        <label className="flex flex-col gap-2.5">
                          <span className={labelClassName}>Текущая почта</span>
                          <Input defaultValue="user.example@gmail.com" />
                        </label>

                        <label className="flex items-start gap-3 text-sm text-white/75">
                          <OptionIndicator type="checkbox" checked={false} className="mt-0.5" />
                          <span>Я даю согласие на получение рекламных материалов на указанный адрес электронной почты</span>
                        </label>

                        <Button variant="ghost" className="gap-2 text-sm text-white/85">
                          Подробнее
                          <span>▾</span>
                        </Button>

                        <div className="flex justify-end">
                          <Button className="min-w-[260px]">
                            Сохранить изменения
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              ) : null}

              {activeTab === 'security' ? (
                <>
                  <SectionCard title="Смена пароля">
                    <div className="space-y-4">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Текущий пароль</span>
                        <Input placeholder="Введите пароль" type="password" />
                      </label>

                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Новый пароль</span>
                        <Input placeholder="Введите пароль" type="password" />
                      </label>

                      <div className="space-y-1.5 text-sm text-white/70">
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Не менее 8 символов</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Минимум одна заглавная и одна строчная буква</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Минимум одна цифра</span>
                        </div>
                      </div>

                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Подтверждение нового пароля</span>
                        <Input placeholder="Подтвердите новый пароль" type="password" />
                      </label>

                      <div className="rounded-xl border border-[#0EB8D2]/90 bg-white/[0.03] px-4 py-4 text-base leading-[1.45] text-white/85">
                        <p className="m-0">Если вы не помните текущий пароль, то воспользуйтесь сбросом пароля.</p>
                        <Button variant="ghost" className="mt-2 text-base font-medium underline underline-offset-4">
                          Сбросить пароль
                        </Button>
                      </div>

                      <Button className="min-w-[240px]">
                        Сменить пароль
                      </Button>
                    </div>
                  </SectionCard>

                  <SectionCard title="Электронная почта">
                    <div className="space-y-5">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Текущая почта</span>
                        <Input defaultValue="user.example@gmail.com" />
                      </label>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button className="min-w-[250px]">
                          Добавить почту
                        </Button>
                        <Button variant="secondary" className="min-w-[250px]">
                          Удалить почту
                        </Button>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Номер телефона">
                    <div className="space-y-5">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Привязанный номер телефона</span>
                        <Input defaultValue="+7 (800) 555 35 35" />
                      </label>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Button className="min-w-[290px]">
                          Добавить номер телефона
                        </Button>
                        <Button variant="secondary" className="min-w-[290px]">
                          Удалить номер телефона
                        </Button>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Двухфакторная аутентификация (2FA)">
                    <div className="space-y-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="m-0 text-base text-white/80">
                            Двухфакторная аутентификация (2FA) обеспечит более надежную защиту вашего аккаунта
                          </p>
                        </div>
                        <ToggleSwitch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled((value) => !value)} />
                      </div>

                      <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-6">
                        <div>
                          <h3 className="mb-2 text-[24px] font-semibold text-white">Электронная почта</h3>
                          <p className="m-0 text-base text-white/80">
                            Использовать электронную почту для двухфакторной аутентификации
                          </p>
                        </div>
                        <ToggleSwitch checked={email2faEnabled} onChange={() => setEmail2faEnabled((value) => !value)} />
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Связанные аккаунты">
                    <div className="rounded-[20px] border border-white/10 bg-white/[0.08] p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <SourceBadge source="telegram" />
                          <div>
                            <div className="text-[20px] font-semibold text-white">Telegram</div>
                            <div className="text-sm text-white/70">@llllllllkk_01</div>
                          </div>
                        </div>

                        <Button className="min-h-11 bg-[#F8E9E6] px-5 text-base font-semibold text-[#D66D63] hover:bg-[#F8E9E6]">
                          Отвязать
                        </Button>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Удалить аккаунт">
                    <Button variant="secondary" className="min-h-12 text-base">
                      Удалить аккаунт
                    </Button>
                  </SectionCard>
                </>
              ) : null}

              {activeTab === 'tariff' ? (
                <SectionCard title="Настроить текущий тариф: Индивидуальный">
                  <div className="space-y-6">
                    <p className="max-w-[820px] text-base leading-[1.45] text-white/80">
                      Вы можете дополнительно отредактировать текущий тариф, исключив модули проверки, для корректного
                      отображения итогового отчета
                    </p>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-2 text-[24px] font-semibold text-white">Факторы проверки</h3>
                        <p className="m-0 text-base text-white/75">Исключите или добавьте факторы проверки в отчет</p>
                      </div>
                      <ToggleSwitch checked={factorsEnabled} onChange={() => setFactorsEnabled((value) => !value)} />
                    </div>

                    <Button variant="ghost" className="gap-2 text-base text-white/85">
                      Подробнее
                      <span>▴</span>
                    </Button>

                    <div className="grid gap-3 text-base text-white/80 sm:grid-cols-2">
                      {personalizationFactors.map((factor) => (
                        <label className="flex items-center gap-3" key={factor}>
                          <OptionIndicator type="checkbox" checked={false} />
                          <span>{factor}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-5 border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[22px] font-semibold text-white">Упоминания в СМИ</span>
                        <ToggleSwitch
                          checked={mentionsMediaEnabled}
                          onChange={() => setMentionsMediaEnabled((value) => !value)}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[22px] font-semibold text-white">Упоминания в Telegram</span>
                        <ToggleSwitch
                          checked={mentionsTelegramEnabled}
                          onChange={() => setMentionsTelegramEnabled((value) => !value)}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
