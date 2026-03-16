import { MoreDetailsSection, OptionIndicator, SectionCard, ToggleSwitch } from '../../ui';
import {
  settingsTariffFactorsGridStyles,
  settingsTariffWrapStyles,
} from './SettingsTariff.styles';

export interface SettingsTariffProps {
  personalizationFactors: string[];
  factorsEnabled: boolean;
  onToggleFactors: () => void;
  mentionsMediaEnabled: boolean;
  onToggleMentionsMedia: () => void;
  mentionsTelegramEnabled: boolean;
  onToggleMentionsTelegram: () => void;
}

export function SettingsTariff({
  personalizationFactors,
  factorsEnabled,
  onToggleFactors,
  mentionsMediaEnabled,
  onToggleMentionsMedia,
  mentionsTelegramEnabled,
  onToggleMentionsTelegram,
}: SettingsTariffProps) {
  return (
    <SectionCard title="Настроить текущий тариф: Индивидуальный">
      <div className={settingsTariffWrapStyles}>
        <p className="max-w-[820px] text-base leading-[1.45] text-white/80">
          Вы можете дополнительно отредактировать текущий тариф, исключив модули проверки, для корректного
          отображения итогового отчета
        </p>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-2 text-[24px] font-semibold text-white">Факторы проверки</h3>
            <p className="m-0 text-base text-white/75">Исключите или добавьте факторы проверки в отчет</p>
          </div>
          <ToggleSwitch checked={factorsEnabled} onChange={onToggleFactors} />
        </div>

        <MoreDetailsSection>
          <div className={settingsTariffFactorsGridStyles}>
            {personalizationFactors.map((factor) => (
              <label className="flex items-center gap-3" key={factor}>
                <OptionIndicator type="checkbox" checked={false} />
                <span>{factor}</span>
              </label>
            ))}
          </div>
        </MoreDetailsSection>

        <div className="space-y-5 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[22px] font-semibold text-white">Упоминания в СМИ</span>
            <ToggleSwitch checked={mentionsMediaEnabled} onChange={onToggleMentionsMedia} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[22px] font-semibold text-white">Упоминания в Telegram</span>
            <ToggleSwitch checked={mentionsTelegramEnabled} onChange={onToggleMentionsTelegram} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
