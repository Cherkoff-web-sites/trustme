import { useMemo, useState } from 'react';
import { Checkbox, Label, MoreDetailsSection, SectionCard, ToggleSwitch } from '../../ui';
import {
  settingsTariffFactorsGridStyles,
  settingsTariffWrapStyles,
} from './SettingsTariff.styles';

export interface SettingsTariffProps {
  personalizationFactors: string[];
  currentTariffLabel?: string;
  factorsEnabled: boolean;
  onToggleFactors: () => void;
  mentionsMediaEnabled: boolean;
  onToggleMentionsMedia: () => void;
  mentionsTelegramEnabled: boolean;
  onToggleMentionsTelegram: () => void;
}

export function SettingsTariff({
  personalizationFactors,
  currentTariffLabel = 'Индивидуальный',
  factorsEnabled,
  onToggleFactors,
  mentionsMediaEnabled,
  onToggleMentionsMedia,
  mentionsTelegramEnabled,
  onToggleMentionsTelegram,
}: SettingsTariffProps) {
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const selectedFactorSet = useMemo(() => new Set(selectedFactors), [selectedFactors]);

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factor)
        ? prev.filter((value) => value !== factor)
        : [...prev, factor],
    );
  };

  return (
    <SectionCard
      title={
        <>
          <span>Настроить текущий тариф: </span>
          <span className="text-[#0EB8D2]">{currentTariffLabel}</span>
        </>
      }
    >
      <div className={settingsTariffWrapStyles}>
        <p className="mb-[60px] text-[16px] leading-[19px] text-[#FDFEFF] lg:text-[18px] lg:leading-[22px]">
          Вы можете дополнительно отредактировать текущий тариф, исключив модули проверки, для корректного
          отображения итогового отчета
        </p>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-[15px]">
            <h3 className="m-0 text-[16px] font-semibold text-white lg:text-[20px]">Факторы проверки</h3>
            <p className="m-0 text-[16px] leading-[19px] text-[#FDFEFF] lg:text-[18px] lg:leading-[22px]">
              Исключите или добавьте факторы проверки в отчет
            </p>
          </div>
          <ToggleSwitch checked={factorsEnabled} onChange={onToggleFactors} className="inline-flex shrink-0" />
        </div>

        <MoreDetailsSection className="mb-[30px]">
          <div className="px-[15px] lg:px-[30px]">
            <div className={settingsTariffFactorsGridStyles}>
            {personalizationFactors.map((factor) => (
              <Label variant="inline" className="gap-3 text-[16px] leading-normal lg:text-[18px]" key={factor}>
                <Checkbox
                  className="h-[19px] w-[19px] lg:h-6 lg:w-6"
                  checked={selectedFactorSet.has(factor)}
                  onChange={() => toggleFactor(factor)}
                />
                <span>{factor}</span>
              </Label>
            ))}
            </div>
          </div>
        </MoreDetailsSection>

        <div className="space-y-[30px]">
          <div className="flex items-center justify-between gap-4 opacity-70">
            <span className="text-[16px] font-semibold text-white lg:text-[20px]">Упоминания в СМИ</span>
            <ToggleSwitch
              checked={mentionsMediaEnabled}
              onChange={onToggleMentionsMedia}
              className="inline-flex shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 opacity-70">
            <span className="text-[16px] font-semibold text-white lg:text-[20px]">Упоминания в Telegram</span>
            <ToggleSwitch
              checked={mentionsTelegramEnabled}
              onChange={onToggleMentionsTelegram}
              className="inline-flex shrink-0"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
