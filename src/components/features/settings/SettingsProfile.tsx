import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { bindTelegram, updateUserThemes } from '../../../api/users';
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
  const { accessToken, refreshUser, user } = useAuth();
  const profileEmail = user?.email?.trim() ?? '';
  const [personType, setPersonType] = useState<'legal' | 'individual'>('individual');
  const [consentPromo, setConsentPromo] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [telegramUserId, setTelegramUserId] = useState(user?.telegram_id ? String(user.telegram_id) : '');
  const [profileApiMessage, setProfileApiMessage] = useState<string | null>(null);
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

  const handleSaveProfileApiSettings = async () => {
    if (!accessToken || !user) return;
    try {
      await updateUserThemes(
        {
          ui_theme: user.ui_theme,
          report_theme: user.report_theme,
        },
        accessToken,
      );
      const telegramId = Number(telegramUserId.replace(/\D/g, ''));
      if (telegramId) {
        await bindTelegram({ telegram_user_id: telegramId }, accessToken);
      }
      await refreshUser();
      setProfileApiMessage('Профильные API-настройки сохранены.');
    } catch (error) {
      setProfileApiMessage(error instanceof Error ? error.message : 'Не удалось сохранить профильные API-настройки.');
    }
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

            {personType === 'legal' ? (
              <div>
                <Label id="settings-profile-inn-label">ИНН</Label>
                <Input
                  id="settings-profile-inn"
                  aria-labelledby="settings-profile-inn-label"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="Введите ИНН"
                />
              </div>
            ) : null}

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

            {personType === 'individual' ? (
              <MoreDetailsSection className="mt-1">
                <div className="flex flex-col gap-[20px] lg:gap-[30px]">
                  <div>
                    <Label id="settings-profile-details-inn-label">ИНН</Label>
                    <Input
                      id="settings-profile-details-inn"
                      aria-labelledby="settings-profile-details-inn-label"
                      inputMode="numeric"
                      maxLength={12}
                      placeholder="Введите ИНН"
                    />
                  </div>

                  <div>
                    <Label id="settings-profile-details-fullname-label">ФИО</Label>
                    <Input
                      id="settings-profile-details-fullname"
                      aria-labelledby="settings-profile-details-fullname-label"
                      placeholder="Введите ФИО"
                    />
                  </div>

                  <div>
                    <Label id="settings-profile-details-birthdate-label">Дата рождения</Label>
                    <Input
                      id="settings-profile-details-birthdate"
                      aria-labelledby="settings-profile-details-birthdate-label"
                      type="date"
                      className="h-[60px]"
                    />
                  </div>
                </div>
              </MoreDetailsSection>
            ) : null}

            <div className="mt-2 flex justify-end">
              <Button className="w-full min-w-0 lg:w-auto lg:min-w-[260px]">Сохранить изменения</Button>
            </div>

            <div className="rounded-[16px] bg-[#2A2A2A] px-[15px] py-[15px]">
              <div className="flex flex-col gap-[20px]">
                <div>
                  <Label id="settings-profile-telegram-label">Telegram user ID</Label>
                  <Input
                    id="settings-profile-telegram"
                    aria-labelledby="settings-profile-telegram-label"
                    inputMode="numeric"
                    placeholder="Введите Telegram ID"
                    value={telegramUserId}
                    onChange={(event) => setTelegramUserId(event.target.value)}
                  />
                </div>
                <Button type="button" className="w-full lg:w-auto lg:self-start" onClick={handleSaveProfileApiSettings}>
                  Сохранить API-настройки профиля
                </Button>
                {profileApiMessage ? <p className="m-0 text-[#FDFEFF]">{profileApiMessage}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
