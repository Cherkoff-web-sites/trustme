import { Button, Input, SectionCard, SourceBadge, ToggleSwitch, uiTokens } from '../../ui';
import {
  settingsSecurityInfoCardStyles,
  settingsSecurityListStyles,
  settingsSecurityRulesStyles,
} from './SettingsSecurity.styles';

export interface SettingsSecurityProps {
  twoFactorEnabled: boolean;
  onToggleTwoFactor: () => void;
  email2faEnabled: boolean;
  onToggleEmail2fa: () => void;
}

export function SettingsSecurity({
  twoFactorEnabled,
  onToggleTwoFactor,
  email2faEnabled,
  onToggleEmail2fa,
}: SettingsSecurityProps) {
  return (
    <>
      <SectionCard title="Смена пароля">
        <div className={settingsSecurityListStyles}>
          <label className="flex flex-col gap-2.5">
            <span className={uiTokens.formLabel}>Текущий пароль</span>
            <Input placeholder="Введите пароль" type="password" />
          </label>

          <label className="flex flex-col gap-2.5">
            <span className={uiTokens.formLabel}>Новый пароль</span>
            <Input placeholder="Введите пароль" type="password" />
          </label>

          <div className={settingsSecurityRulesStyles}>
            <div className="flex items-center gap-2.5">
              <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
              <span>Не менее 8 символов</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
              <span>Минимум одна заглавная и одна строчная буква</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
              <span>Минимум одна цифра</span>
            </div>
          </div>

          <label className="flex flex-col gap-2.5">
            <span className={uiTokens.formLabel}>Подтверждение нового пароля</span>
            <Input placeholder="Подтвердите новый пароль" type="password" />
          </label>

          <div className={settingsSecurityInfoCardStyles}>
            <p className="m-0">Если вы не помните текущий пароль, то воспользуйтесь сбросом пароля.</p>
            <Button variant="ghost" className="mt-2 text-base font-medium underline underline-offset-4">
              Сбросить пароль
            </Button>
          </div>

          <Button className="min-w-[240px]">Сменить пароль</Button>
        </div>
      </SectionCard>

      <SectionCard title="Электронная почта">
        <div className="space-y-5">
          <label className="flex flex-col gap-2.5">
            <span className={uiTokens.formLabel}>Текущая почта</span>
            <Input defaultValue="user.example@gmail.com" />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="min-w-[250px]">Добавить почту</Button>
            <Button variant="secondary" className="min-w-[250px]">Удалить почту</Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Номер телефона">
        <div className="space-y-5">
          <label className="flex flex-col gap-2.5">
            <span className={uiTokens.formLabel}>Привязанный номер телефона</span>
            <Input defaultValue="+7 (800) 555 35 35" />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="min-w-[290px]">Добавить номер телефона</Button>
            <Button variant="secondary" className="min-w-[290px]">Удалить номер телефона</Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Двухфакторная аутентификация (2FA)">
        <div className="space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="m-0 text-base text-[#FDFEFF]">
                Двухфакторная аутентификация (2FA) обеспечит более надежную защиту вашего аккаунта
              </p>
            </div>
            <ToggleSwitch checked={twoFactorEnabled} onChange={onToggleTwoFactor} />
          </div>

          <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-6">
            <div>
              <h3 className="mb-2 text-[24px] font-semibold text-white">Электронная почта</h3>
              <p className="m-0 text-base text-[#FDFEFF]">
                Использовать электронную почту для двухфакторной аутентификации
              </p>
            </div>
            <ToggleSwitch checked={email2faEnabled} onChange={onToggleEmail2fa} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Связанные аккаунты">
        <div className="rounded-[20px] border border-white/10 bg-white/[0.08] p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <SourceBadge source="telegram" />
              <div>
                <div className="text-[20px] font-semibold text-white">Telegram</div>
                <div className="text-sm text-[#FDFEFF]">@llllllllkk_01</div>
              </div>
            </div>

            <Button className="min-h-11 bg-[#F8E9E6] px-5 text-base font-semibold text-[#D66D63] hover:bg-[#F8E9E6]">
              Отвязать
            </Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Удалить аккаунт">
        <Button variant="secondary" className="min-h-12 text-base">Удалить аккаунт</Button>
      </SectionCard>
    </>
  );
}
