import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import {
  SettingsProfile,
  SettingsSecurity,
  SettingsTariff,
} from '../../components/features/settings';
import { SettingsSidebarNav } from '../../components/features/SettingsSidebarNav';
import { Card } from '../../components/ui';
import profileSettingsSvg from '../../assets/icons/profile_settings.svg';
import safetySvg from '../../assets/icons/safety.svg';
import customSvg from '../../assets/icons/custom.svg';

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
      <PageSection title="Настройки аккаунта" description="Управляйте настройками аккаунта">
        <div className="flex flex-col gap-[30px] lg:flex-row">
          <Card className="h-fit w-full !p-[15px] lg:w-[410px] lg:shrink-0" variant="settings" as="aside">
            <SettingsSidebarNav
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                { key: 'profile', label: 'Профиль', icon: profileSettingsSvg },
                { key: 'security', label: 'Безопасность и вход', icon: safetySvg },
                { key: 'tariff', label: 'Персонализация тарифа', icon: customSvg },
              ]}
            />
          </Card>

          <div className="flex-1 space-y-4">
            {activeTab === 'profile' ? <SettingsProfile /> : null}

            {activeTab === 'security' ? (
              <SettingsSecurity
                twoFactorEnabled={twoFactorEnabled}
                onToggleTwoFactor={() => setTwoFactorEnabled((value) => !value)}
                email2faEnabled={email2faEnabled}
                onToggleEmail2fa={() => setEmail2faEnabled((value) => !value)}
              />
            ) : null}

            {activeTab === 'tariff' ? (
              <SettingsTariff
                personalizationFactors={personalizationFactors}
                factorsEnabled={factorsEnabled}
                onToggleFactors={() => setFactorsEnabled((value) => !value)}
                mentionsMediaEnabled={mentionsMediaEnabled}
                onToggleMentionsMedia={() => setMentionsMediaEnabled((value) => !value)}
                mentionsTelegramEnabled={mentionsTelegramEnabled}
                onToggleMentionsTelegram={() => setMentionsTelegramEnabled((value) => !value)}
              />
            ) : null}
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
