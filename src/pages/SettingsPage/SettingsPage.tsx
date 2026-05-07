import { useEffect, useState } from 'react';
import { getTariff, getTariffFactors, setTariff, setTariffFactors } from '../../api/tariff';
import { PageLayout } from '../../components/layout/PageLayout';
import { PageSection } from '../../components/layout/PageSection/PageSection';
import {
  SettingsProfile,
  SettingsSecurity,
  SettingsTariff,
} from '../../components/features/settings';
import { SettingsSidebarNav } from '../../components/features/SettingsSidebarNav';
import { useAuth } from '../../context/AuthContext';
import { getTariffLabel } from '../../lib/apiMappers';
import { Card } from '../../components/ui';
import profileSettingsSvg from '../../assets/icons/profile_settings.svg';
import safetySvg from '../../assets/icons/safety.svg';
import customSvg from '../../assets/icons/custom.svg';

type SettingsTab = 'profile' | 'security' | 'tariff';

export function SettingsPage() {
  const { accessToken } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [email2faEnabled, setEmail2faEnabled] = useState(false);
  const [factorsEnabled, setFactorsEnabled] = useState(true);
  const [mentionsMediaEnabled, setMentionsMediaEnabled] = useState(false);
  const [mentionsTelegramEnabled, setMentionsTelegramEnabled] = useState(false);
  const [currentTariffLabel, setCurrentTariffLabel] = useState('Индивидуальный');
  const [selectedFactorKeys, setSelectedFactorKeys] = useState<string[]>([]);

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

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    Promise.all([getTariff(accessToken), getTariffFactors(accessToken).catch(() => null)])
      .then(([tariff, factors]) => {
        if (cancelled) return;
        setFactorsEnabled(tariff.include_factors);
        setMentionsMediaEnabled(tariff.include_media);
        setMentionsTelegramEnabled(tariff.include_telegram);
        setCurrentTariffLabel(getTariffLabel(tariff));
        if (factors) {
          setSelectedFactorKeys(factors.factors.filter((factor) => factor.enabled !== false).map((factor) => factor.title));
        }
      })
      .catch(() => {
        if (cancelled) return;
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const persistTariff = async (next: {
    factorsEnabled: boolean;
    mentionsMediaEnabled: boolean;
    mentionsTelegramEnabled: boolean;
  }) => {
    if (!accessToken) return;
    try {
      const updated = await setTariff(
        {
          include_factors: next.factorsEnabled,
          include_media: next.mentionsMediaEnabled,
          include_telegram: next.mentionsTelegramEnabled,
        },
        accessToken,
      );
      setFactorsEnabled(updated.include_factors);
      setMentionsMediaEnabled(updated.include_media);
      setMentionsTelegramEnabled(updated.include_telegram);
      setCurrentTariffLabel(getTariffLabel(updated));
    } catch {
      // Если сохранение не удалось, UI останется в последнем локальном состоянии до следующей перезагрузки профиля.
    }
  };

  const persistFactors = async (nextSelected: string[]) => {
    if (!accessToken) return;
    setSelectedFactorKeys(nextSelected);
    try {
      await setTariffFactors(
        {
          factors: personalizationFactors.map((title) => ({
            key: title,
            title,
            enabled: nextSelected.includes(title),
          })),
        },
        accessToken,
      );
    } catch {
      // UI останется локально выбранным, следующая загрузка подтянет актуальные данные API.
    }
  };

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
                currentTariffLabel={currentTariffLabel}
                factorsEnabled={factorsEnabled}
                onToggleFactors={() => {
                  const next = !factorsEnabled;
                  setFactorsEnabled(next);
                  void persistTariff({
                    factorsEnabled: next,
                    mentionsMediaEnabled,
                    mentionsTelegramEnabled,
                  });
                }}
                mentionsMediaEnabled={mentionsMediaEnabled}
                onToggleMentionsMedia={() => {
                  const next = !mentionsMediaEnabled;
                  setMentionsMediaEnabled(next);
                  void persistTariff({
                    factorsEnabled,
                    mentionsMediaEnabled: next,
                    mentionsTelegramEnabled,
                  });
                }}
                mentionsTelegramEnabled={mentionsTelegramEnabled}
                onToggleMentionsTelegram={() => {
                  const next = !mentionsTelegramEnabled;
                  setMentionsTelegramEnabled(next);
                  void persistTariff({
                    factorsEnabled,
                    mentionsMediaEnabled,
                    mentionsTelegramEnabled: next,
                  });
                }}
                selectedFactorKeys={selectedFactorKeys}
                onSelectedFactorsChange={(next) => void persistFactors(next)}
              />
            ) : null}
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
