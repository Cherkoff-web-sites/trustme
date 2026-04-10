import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { getPasswordRuleChecks } from '../../../lib/passwordRules';
import { Button, Input, Label, SectionCard, SourceBadge, ToggleSwitch, designTokens } from '../../ui';
import {
  settingsSecurityInfoCardStyles,
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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const newPasswordChecks = getPasswordRuleChecks(newPassword);
  const newPasswordRulesStarted = newPassword.length > 0;

  return (
    <>
      <SectionCard title="Смена пароля">
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <div>
            <Label id="settings-security-current-password-label">Текущий пароль</Label>
            <Input
              id="settings-security-current-password"
              aria-labelledby="settings-security-current-password-label"
              placeholder="Введите пароль"
              type="password"
              passwordToggle
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <Label id="settings-security-new-password-label">Новый пароль</Label>
            <Input
              id="settings-security-new-password"
              aria-labelledby="settings-security-new-password-label"
              placeholder="Введите пароль"
              type="password"
              passwordToggle
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={settingsSecurityRulesStyles}>
            {(
              [
                { key: 'len', label: 'Не менее 8 символов', ok: newPasswordChecks.minLength },
                { key: 'case', label: 'Минимум одна заглавная и одна строчная буква', ok: newPasswordChecks.upperAndLower },
                { key: 'digit', label: 'Минимум одна цифра', ok: newPasswordChecks.hasDigit },
              ] as const
            ).map((rule) => {
              const textClass = !newPasswordRulesStarted
                ? 'text-[#FDFEFF]'
                : rule.ok
                  ? designTokens.colors.text.statusSuccess
                  : designTokens.colors.text.statusError;
              const dotClass = !newPasswordRulesStarted
                ? 'bg-[#FDFEFF]'
                : rule.ok
                  ? designTokens.colors.status.successBg
                  : designTokens.colors.status.errorBg;

              return (
                <div key={rule.key} className="flex items-center gap-[10px]">
                  <span className={cn('h-[19px] w-[19px] shrink-0 rounded-full', dotClass)} aria-hidden />
                  <span className={cn('text-[14px] leading-[17px] lg:text-[16px] lg:leading-[19px]', textClass)}>{rule.label}</span>
                </div>
              );
            })}
          </div>

          <div>
            <Label id="settings-security-confirm-password-label">Подтверждение нового пароля</Label>
            <Input
              id="settings-security-confirm-password"
              aria-labelledby="settings-security-confirm-password-label"
              placeholder="Подтвердите новый пароль"
              type="password"
              passwordToggle
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </div>

          <div className={settingsSecurityInfoCardStyles}>
            <p className="m-0">Если вы не помните текущий пароль, то воспользуйтесь сбросом пароля.</p>
            <Button variant="ghost" className="justify-start p-0 text-base font-medium underline underline-offset-4">
              Сбросить пароль
            </Button>
          </div>

          <Button className="min-w-[240px]">Сменить пароль</Button>
        </div>
      </SectionCard>

      <SectionCard title="Электронная почта">
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <div>
            <Label id="settings-security-current-email-label">Текущая почта</Label>
            <Input id="settings-security-current-email" aria-labelledby="settings-security-current-email-label" defaultValue="user.example@gmail.com" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="min-w-[250px]">Добавить почту</Button>
            <Button variant="secondary" className="min-w-[250px]">Удалить почту</Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Номер телефона">
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <div>
            <Label id="settings-security-phone-label">Привязанный номер телефона</Label>
            <Input id="settings-security-phone" aria-labelledby="settings-security-phone-label" defaultValue="+7 (800) 555 35 35" />
          </div>

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
            <ToggleSwitch checked={twoFactorEnabled} onChange={onToggleTwoFactor} className="hidden lg:inline-flex" />
          </div>

          <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-6">
            <div>
              <h3 className="mb-2 text-[24px] font-semibold text-white">Электронная почта</h3>
              <p className="m-0 text-base text-[#FDFEFF]">
                Использовать электронную почту для двухфакторной аутентификации
              </p>
            </div>
            <ToggleSwitch checked={email2faEnabled} onChange={onToggleEmail2fa} className="hidden lg:inline-flex" />
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

            <Button
              variant="secondary"
              className="min-h-11 w-full gap-[10px] border-[#EB4335] bg-[#FDFEFF] px-[30px] py-[15px] text-[14px] font-semibold text-[#EB4335] hover:bg-[#FDFEFF] sm:w-auto sm:py-[10px] sm:text-[20px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M13.2127 9.78772C12.8979 9.47281 12.5242 9.223 12.1128 9.05257C11.7014 8.88213 11.2605 8.79441 10.8152 8.79441C10.3699 8.79441 9.92903 8.88213 9.51766 9.05257C9.10629 9.223 8.73253 9.47281 8.41772 9.78772L4.99272 13.2137C4.357 13.8496 3.99991 14.7119 4 15.6111C4.00009 16.5102 4.35737 17.3725 4.99322 18.0082C5.62908 18.6439 6.49143 19.001 7.39058 19.0009C8.28972 19.0009 9.152 18.6436 9.78772 18.0077L10.1087 17.7037M9.78772 13.2137C10.1025 13.5286 10.4763 13.7784 10.8877 13.9489C11.299 14.1193 11.7399 14.207 12.1852 14.207C12.6305 14.207 13.0714 14.1193 13.4828 13.9489C13.8942 13.7784 14.2679 13.5286 14.5827 13.2137L18.0067 9.78772C18.6426 9.152 18.9999 8.28972 18.9999 7.39058C19 6.49143 18.6429 5.62908 18.0072 4.99322C17.3715 4.35737 16.5092 4.00009 15.6101 4C14.7109 3.99991 13.8486 4.357 13.2127 4.99272L12.1847 5.95372M19.5727 20.0007L17.7857 18.2147M17.7857 18.2147L15.9997 16.4277M17.7857 18.2147L19.5727 16.4277M17.7857 18.2147L15.9997 20.0007" stroke="#EB4335" strokeWidth="2" strokeLinecap="round" />
              </svg>
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
