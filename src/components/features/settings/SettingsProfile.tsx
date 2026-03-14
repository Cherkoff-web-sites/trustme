import { PersonTypeSwitcher } from '../PersonTypeSwitcher';
import { Button, Input, OptionIndicator, SectionCard, uiTokens } from '../../ui';
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
              <span className={uiTokens.formLabel}>Никнейм</span>
              <Input defaultValue="user.example@gmail.com" />
            </label>

            <label className="flex flex-col gap-2.5">
              <span className={uiTokens.formLabel}>Текущая почта</span>
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
              <Button className="min-w-[260px]">Сохранить изменения</Button>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
