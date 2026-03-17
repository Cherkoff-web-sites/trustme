import { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Grid } from '../../components/layout/Grid/Grid';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import {
  SettingsProfile,
  SettingsSecurity,
  SettingsTariff,
} from '../../components/features/settings';
import { SettingsSidebarNav } from '../../components/features/SettingsSidebarNav';
import { Card, uiTokens } from '../../components/ui';

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
        <Grid preset="settings" className={uiTokens.container}>
          <Card className="h-fit p-3" variant="settings" as="aside">
            <SettingsSidebarNav
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                { key: 'profile', label: 'Профиль' },
                { key: 'security', label: 'Безопасность и вход' },
                { key: 'tariff', label: 'Персонализация тарифа' },
              ]}
            />
          </Card>

          <div className="space-y-4">
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
        </Grid>
      </PageSection>
    </PageLayout>
  );
}
