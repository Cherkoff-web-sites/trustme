import { PersonTypeSwitcher } from '../PersonTypeSwitcher';
import { Button, Input, MoreDetailsSection, OptionIndicator, SectionCard, uiTokens, designTokens } from '../../ui';
import { combineStyles } from '../../../lib/combineStyles';
import userPng from '../../../assets/user.png';
import {
  settingsProfileAvatarStyles,
  settingsProfileAvatarWrapStyles,
  settingsProfileLayoutStyles,
} from './SettingsProfile.styles';

export function SettingsProfile() {
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
            value="individual"
            onChange={() => {}}
            options={[
              { value: 'legal', label: 'Юридическое лицо' },
              { value: 'individual', label: 'Физическое лицо' },
            ]}
          />

          <div className="space-y-4">
            <label className="flex flex-col gap-2.5">
              <span className={uiTokens.formLabel}>Никнейм</span>
              <Input defaultValue="user.example@gmail.com" />
            </label>

            <label className="flex flex-col gap-2.5">
              <span className={uiTokens.formLabel}>Текущая почта</span>
              <Input defaultValue="user.example@gmail.com" />
            </label>

            <label
              className={combineStyles(
                'flex items-start gap-3',
                designTokens.colors.text.muted,
              )}
            >
              <OptionIndicator type="checkbox" checked={false} className="mt-0.5" />
              <span>Я даю согласие на получение рекламных материалов на указанный адрес электронной почты</span>
            </label>

            <MoreDetailsSection className="mt-1">
              <p
                className={combineStyles(
                  'text-sm',
                  designTokens.colors.text.muted,
                )}
              >
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
