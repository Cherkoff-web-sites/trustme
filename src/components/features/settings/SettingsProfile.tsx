import { useState } from 'react';
import { PersonTypeSwitcher } from '../PersonTypeSwitcher';
import {
  Button,
  Checkbox,
  Input,
  Label,
  LabelCaption,
  MoreDetailsSection,
  SectionCard,
  designTokens,
} from '../../ui';
import { combineStyles } from '../../../lib/combineStyles';
import userPng from '../../../assets/user.png';
import {
  settingsProfileAvatarStyles,
  settingsProfileAvatarWrapStyles,
  settingsProfileLayoutStyles,
} from './SettingsProfile.styles';

export function SettingsProfile() {
  const [personType, setPersonType] = useState<'legal' | 'individual'>('individual');
  const [consentPromo, setConsentPromo] = useState(false);

  return (
    <SectionCard title="Основная информация">
      <div className={settingsProfileLayoutStyles}>
        <div className={settingsProfileAvatarWrapStyles}>
          <div className={settingsProfileAvatarStyles}>
            <img src={userPng} alt="Аватар пользователя" />
          </div>
          <Button
            variant="ghost"
            className={combineStyles('text-lg font-medium hover:text-[#057889]', designTokens.colors.text.primary)}
          >
            Изменить фото
          </Button>
        </div>

        <div>
          <PersonTypeSwitcher
            className="mb-5 sm:gap-8"
            value={personType}
            onChange={(v) => {
              if (v !== null) setPersonType(v);
            }}
            indicatorMode="settings"
            options={[
              { value: 'legal', label: 'Юридическое лицо' },
              { value: 'individual', label: 'Физическое лицо' },
            ]}
          />

          <div className="space-y-4">
            <Label variant="stack">
              <LabelCaption>Никнейм</LabelCaption>
              <Input defaultValue="user.example@gmail.com" />
            </Label>

            <Label variant="stack">
              <LabelCaption>Текущая почта</LabelCaption>
              <Input defaultValue="user.example@gmail.com" />
            </Label>

            <Label
              variant="inlineStart"
              className={combineStyles('gap-3', designTokens.colors.text.muted)}
            >
              <Checkbox
                checked={consentPromo}
                onChange={(e) => setConsentPromo(e.target.checked)}
              />
              <span>Я даю согласие на получение рекламных материалов на указанный адрес электронной почты</span>
            </Label>

            <MoreDetailsSection className="mt-1">
              <p className="m-0 text-[16px] font-normal leading-normal text-[#FDFEFF] lg:text-[20px]">
                Здесь можно вывести дополнительную информацию или подсказки по настройкам профиля.
              </p>
            </MoreDetailsSection>

            <div className="mt-2 flex justify-end">
              <Button className="min-w-[260px]">Сохранить изменения</Button>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
