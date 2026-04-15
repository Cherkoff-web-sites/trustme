import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { PersonTypeSwitcher } from '../PersonTypeSwitcher';
import {
  Button,
  Checkbox,
  Input,
  Label,
  MoreDetailsSection,
  SectionCard,
  designTokens,
} from '../../ui';
import { useAuth } from '../../../context/AuthContext';
import { combineStyles } from '../../../lib/combineStyles';
import userAvatarPlaceholder from '../../../assets/icons/user.svg';
import {
  settingsProfileAvatarStyles,
  settingsProfileAvatarWrapStyles,
  settingsProfileLayoutStyles,
} from './SettingsProfile.styles';

export function SettingsProfile() {
  const { user } = useAuth();
  const profileEmail = user?.email?.trim() ?? '';
  const [personType, setPersonType] = useState<'legal' | 'individual'>('individual');
  const [consentPromo, setConsentPromo] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (profilePhotoUrl?.startsWith('blob:')) URL.revokeObjectURL(profilePhotoUrl);
    };
  }, [profilePhotoUrl]);

  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setProfilePhotoUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return url;
    });
    e.target.value = '';
  };

  return (
    <SectionCard title="Основная информация">
      <div className={settingsProfileLayoutStyles}>
        <div className={settingsProfileAvatarWrapStyles}>
          <input
            ref={avatarFileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleAvatarFileChange}
            tabIndex={-1}
          />
          <div className={settingsProfileAvatarStyles}>
            <img
              src={profilePhotoUrl ?? userAvatarPlaceholder}
              alt={profilePhotoUrl ? 'Фото профиля' : 'Аватар по умолчанию'}
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            className={combineStyles('text-lg font-medium hover:text-[#057889]', designTokens.colors.text.primary)}
            onClick={() => avatarFileInputRef.current?.click()}
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

          <div className="flex flex-col gap-[20px] lg:gap-[30px]">
            <div>
              <Label id="settings-profile-nickname-label">Никнейм</Label>
              <Input
                key={`settings-profile-nickname-${user?.id ?? 0}`}
                id="settings-profile-nickname"
                aria-labelledby="settings-profile-nickname-label"
                defaultValue={profileEmail}
              />
            </div>

            <div>
              <Label id="settings-profile-email-label">Текущая почта</Label>
              <Input
                key={`settings-profile-email-${user?.id ?? 0}`}
                id="settings-profile-email"
                aria-labelledby="settings-profile-email-label"
                defaultValue={profileEmail}
              />
            </div>

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
