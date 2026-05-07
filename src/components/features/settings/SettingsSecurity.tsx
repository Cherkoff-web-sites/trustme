import { useEffect, useMemo, useState } from 'react';
import {
  authChangePassword,
  authConfirmCode,
  authPasswordResetConfirm,
  authPasswordResetRequest,
  authResendConfirmation,
} from '../../../api/auth';
import {
  addEmail,
  confirmEmail,
  confirmPhone,
  deleteEmail,
  deletePhone,
  getUserSecurity,
  requestPhoneCode,
  setUserSecurity2fa,
  setUserSecurityEmail2fa,
} from '../../../api/users';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../lib/cn';
import { getPasswordRuleChecks } from '../../../lib/passwordRules';
import { authModalEmailInfoBoxStyles } from '../AuthModal/AuthModal.styles';
import { Button, Input, Label, SectionCard, SourceBadge, ToggleSwitch, designTokens } from '../../ui';
import {
  settingsSecurityInfoCardStyles,
  settingsSecurityRulesStyles,
} from './SettingsSecurity.styles';
import { OtpDigitInputs } from './OtpDigitInputs';

const CHANGE_PASSWORD_EMAIL_CODE_LEN = 8;
const PHONE_ACCESS_CODE_LEN = 5;

function maskEmailForDisplay(email: string): string {
  const t = email.trim();
  if (!t) return '…';
  const at = t.indexOf('@');
  if (at < 1) return '***';
  const local = t.slice(0, at);
  const rest = t.slice(at + 1);
  const dot = rest.lastIndexOf('.');
  const dom = dot >= 0 ? rest.slice(0, dot) : rest;
  const tld = dot >= 0 ? rest.slice(dot + 1) : '';
  const loc =
    local.length <= 1
      ? `${local}*`
      : `${local[0]}${'*'.repeat(Math.min(10, local.length - 1))}`;
  const dm =
    dom.length <= 1 ? `${dom || '*'}**` : `${dom[0]}${'*'.repeat(Math.min(3, dom.length - 1))}`;
  const td =
    tld.length <= 1 ? `${tld || '*'}*` : `${tld[0]}${'*'.repeat(Math.min(2, tld.length - 1))}`;
  return `${loc}@${dm}.${td}`;
}

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
  const { accessToken, refreshUser, user } = useAuth();
  const profileEmail = user?.email?.trim() ?? '';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [changePwdStep, setChangePwdStep] = useState<'credentials' | 'emailCode' | 'success'>('credentials');
  const [emailCode, setEmailCode] = useState('');
  const [passwordActionMessage, setPasswordActionMessage] = useState<string | null>(null);
  const [securityActionMessage, setSecurityActionMessage] = useState<string | null>(null);
  const [phoneFlowStep, setPhoneFlowStep] = useState<'idle' | 'enterPhone' | 'smsSent' | 'enterCode'>('idle');
  const [phoneCandidate, setPhoneCandidate] = useState('+7 (800) 555 35 35');
  const [phoneAccessCode, setPhoneAccessCode] = useState('');
  const [emailFlowStep, setEmailFlowStep] = useState<
    'idle' | 'addEmail' | 'needsConfirmation' | 'confirmationSent'
  >('idle');
  const [newEmailDraft, setNewEmailDraft] = useState('');
  const [emailFlowDisplay, setEmailFlowDisplay] = useState('');
  const newPasswordChecks = getPasswordRuleChecks(newPassword);
  const newPasswordRulesStarted = newPassword.length > 0;

  useEffect(() => {
    if (!accessToken) return;
    getUserSecurity(accessToken).catch(() => undefined);
  }, [accessToken]);

  const passwordsValid = useMemo(() => {
    if (currentPassword.length === 0 || newPassword.length === 0) return false;
    if (newPassword !== newPasswordConfirm) return false;
    return (
      newPasswordChecks.minLength &&
      newPasswordChecks.upperAndLower &&
      newPasswordChecks.hasDigit
    );
  }, [
    currentPassword.length,
    newPassword,
    newPasswordConfirm,
    newPasswordChecks.minLength,
    newPasswordChecks.upperAndLower,
    newPasswordChecks.hasDigit,
  ]);

  const handleCredentialsContinue = () => {
    if (!passwordsValid) return;
    setPasswordActionMessage(null);
    setChangePwdStep('emailCode');
  };

  const handleEmailCodeConfirm = async () => {
    if (emailCode.length !== CHANGE_PASSWORD_EMAIL_CODE_LEN) return;
    if (!accessToken || !user) {
      setPasswordActionMessage('Необходима авторизация.');
      return;
    }
    try {
      await authConfirmCode(
        {
          user_id: user.id,
          code: Number(emailCode),
          type_code: 'change_password',
        },
        accessToken,
      );
      await authChangePassword(
        {
          old_pswd: currentPassword,
          new_pswd: newPassword,
          email: user.email,
        },
        accessToken,
      );
      await refreshUser();
      setChangePwdStep('success');
      setEmailCode('');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      setPasswordActionMessage(null);
    } catch (error) {
      setPasswordActionMessage(error instanceof Error ? error.message : 'Не удалось изменить пароль.');
    }
  };

  const handlePasswordResetRequest = async () => {
    if (!profileEmail) {
      setPasswordActionMessage('Укажите email аккаунта.');
      return;
    }
    try {
      await authPasswordResetRequest({ email: profileEmail });
      setPasswordActionMessage('Код/ссылка для сброса пароля отправлены на почту.');
      setChangePwdStep('emailCode');
    } catch (error) {
      setPasswordActionMessage(error instanceof Error ? error.message : 'Не удалось запросить сброс пароля.');
    }
  };

  const handlePasswordResetConfirm = async () => {
    if (!profileEmail || !newPassword || emailCode.length !== CHANGE_PASSWORD_EMAIL_CODE_LEN) return;
    try {
      await authPasswordResetConfirm({ email: profileEmail, code: emailCode, new_password: newPassword });
      setPasswordActionMessage('Пароль сброшен и сохранён.');
      setChangePwdStep('success');
      setEmailCode('');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error) {
      setPasswordActionMessage(error instanceof Error ? error.message : 'Не удалось подтвердить сброс пароля.');
    }
  };

  const handleResendPasswordCode = async () => {
    if (!profileEmail) return;
    try {
      await authResendConfirmation({ email: profileEmail });
      setPasswordActionMessage('Код отправлен повторно.');
    } catch (error) {
      setPasswordActionMessage(error instanceof Error ? error.message : 'Не удалось отправить код повторно.');
    }
  };

  const resetPhoneFlow = () => {
    setPhoneFlowStep('idle');
    setPhoneAccessCode('');
  };

  const resetEmailFlow = () => {
    setEmailFlowStep('idle');
    setNewEmailDraft('');
    setEmailFlowDisplay('');
  };

  const emailSectionTitle =
    emailFlowStep === 'addEmail'
      ? 'Добавить новую электронную почту'
      : 'Электронная почта';

  const changePasswordSectionTitle =
    changePwdStep === 'emailCode' ? (
      <>
        Код подтверждения был отправлен на почту:{' '}
        <span className="font-semibold">{maskEmailForDisplay(profileEmail)}</span>
      </>
    ) : (
      'Смена пароля'
    );

  return (
    <>
      <SectionCard title={changePasswordSectionTitle}>
        <div className="relative">
          <div
            className={cn(
              'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
              changePwdStep === 'credentials'
                ? 'relative z-10 translate-y-0 opacity-100'
                : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
            )}
            aria-hidden={changePwdStep !== 'credentials'}
          >
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
            <Button
              type="button"
              variant="ghost"
              className="justify-start p-0 text-base font-medium underline underline-offset-4"
              onClick={handlePasswordResetRequest}
            >
              Сбросить пароль
            </Button>
          </div>

            <Button
              type="button"
              className="min-w-[240px] w-full lg:w-auto lg:flex-none lg:self-start disabled:opacity-100"
              disabled={!passwordsValid}
              onClick={handleCredentialsContinue}
            >
              Сменить пароль
            </Button>
          </div>

          <div
            className={cn(
              'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
              changePwdStep === 'emailCode'
                ? 'relative z-10 translate-y-0 opacity-100'
                : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 -translate-y-1 overflow-hidden opacity-0',
            )}
            aria-hidden={changePwdStep !== 'emailCode'}
          >
            <div>
              <Label id="settings-security-email-code-label">Код доступа</Label>
              {changePwdStep === 'emailCode' ? (
                <OtpDigitInputs
                  key="settings-security-pwd-otp"
                  length={CHANGE_PASSWORD_EMAIL_CODE_LEN}
                  value={emailCode}
                  onChange={setEmailCode}
                  idPrefix="settings-security-email-code"
                  ariaLabelledBy="settings-security-email-code-label"
                  compact
                  transparentCells
                  className="mt-[15px]"
                />
              ) : null}
            </div>

            <div className={authModalEmailInfoBoxStyles}>
              <p className="m-0">Введите полученный код подтверждения смены пароля.</p>
              <p className="m-0">
                Не приходит код подтверждения?{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="inline h-auto min-h-0 p-0 align-baseline underline underline-offset-4"
                  onClick={handleResendPasswordCode}
                >
                  Отправить повторно
                </Button>
              </p>
            </div>

            <Button
              type="button"
              className="min-w-[240px] w-full lg:w-auto lg:flex-none lg:self-start disabled:opacity-100"
              disabled={emailCode.length !== CHANGE_PASSWORD_EMAIL_CODE_LEN}
              onClick={handleEmailCodeConfirm}
            >
              Сохранить изменения
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="min-w-[240px] w-full lg:w-auto lg:flex-none lg:self-start"
              disabled={!newPassword || emailCode.length !== CHANGE_PASSWORD_EMAIL_CODE_LEN}
              onClick={handlePasswordResetConfirm}
            >
              Подтвердить сброс пароля
            </Button>
            {passwordActionMessage ? <p className="m-0 text-[#EB4335]">{passwordActionMessage}</p> : null}
          </div>

          <div
            className={cn(
              'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
              changePwdStep === 'success'
                ? 'relative z-10 translate-y-0 opacity-100'
                : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
            )}
            aria-hidden={changePwdStep !== 'success'}
          >
            <div className="rounded-[10px] border border-[#0EB8D2] bg-[#2A2A2A] px-[20px] py-[16px]">
              <p className="m-0 font-normal leading-normal text-[#FDFEFF]">
                Ваш пароль успешно изменен.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title={emailSectionTitle}>
        {emailFlowStep === 'idle' ? (
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <div>
            <Label id="settings-security-current-email-label">Текущая почта</Label>
              <Input
                key={`settings-security-email-${user?.id ?? 0}`}
                id="settings-security-current-email"
                aria-labelledby="settings-security-current-email-label"
                defaultValue={profileEmail}
              />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="min-w-[250px]" onClick={() => setEmailFlowStep('addEmail')}>
                Добавить почту
              </Button>
              <Button
                variant="secondary"
                className="min-w-[250px]"
                onClick={async () => {
                  if (!accessToken || !profileEmail) return;
                  try {
                    await deleteEmail(profileEmail, accessToken);
                    await refreshUser();
                    setSecurityActionMessage('Почта удалена.');
                  } catch (error) {
                    setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось удалить почту.');
                  }
                }}
              >
                Удалить почту
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                emailFlowStep === 'addEmail'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={emailFlowStep !== 'addEmail'}
            >
              <div>
                <Label id="settings-security-new-email-label">Почта</Label>
                <Input
                  id="settings-security-new-email"
                  aria-labelledby="settings-security-new-email-label"
                  type="email"
                  placeholder="IvanIvanov1999@mail.ru"
                  value={newEmailDraft}
                  onChange={(e) => setNewEmailDraft(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="min-w-[240px] w-full lg:w-auto lg:flex-none lg:self-start disabled:opacity-100"
                  disabled={!newEmailDraft.trim()}
                  onClick={async () => {
                    const next = newEmailDraft.trim();
                    if (!next) return;
                    if (!accessToken) return;
                    try {
                      await addEmail({ email: next }, accessToken);
                      setEmailFlowDisplay(next);
                      setEmailFlowStep('needsConfirmation');
                      setSecurityActionMessage('Письмо для подтверждения email отправлено.');
                    } catch (error) {
                      setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось добавить почту.');
                    }
                  }}
                >
                  Сохранить почту
                </Button>
                <Button type="button" variant="secondary" className="min-w-[150px]" onClick={resetEmailFlow}>
                  Назад
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                emailFlowStep === 'needsConfirmation'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 -translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={emailFlowStep !== 'needsConfirmation'}
            >
              <div>
                <Label id="settings-security-flow-email-label">Текущая почта</Label>
                <Input
                  id="settings-security-flow-email"
                  aria-labelledby="settings-security-flow-email-label"
                  readOnly
                  value={emailFlowDisplay}
                />
              </div>
              <div className="rounded-[10px] border border-[#0EB8D2] bg-[#2A2A2A] p-[15px]">
                <p className="m-0 text-base font-normal leading-normal text-[#FDFEFF] lg:text-[20px]">
                  Ваш аккаунт не подтверждён. Нажмите «Отправить подтверждение» после чего проследуйте инструкциям в
                  письме
                </p>
              </div>
              <Button
                type="button"
                className="w-full lg:w-auto lg:flex-none lg:self-start"
                onClick={async () => {
                  if (!accessToken || !emailFlowDisplay) return;
                  try {
                    await confirmEmail({ email: emailFlowDisplay }, accessToken);
                    await refreshUser();
                    setEmailFlowStep('confirmationSent');
                    setSecurityActionMessage('Email подтверждён.');
                  } catch (error) {
                    setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось подтвердить email.');
                  }
                }}
              >
                Отправить подтверждение
              </Button>
            </div>

            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                emailFlowStep === 'confirmationSent'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={emailFlowStep !== 'confirmationSent'}
            >
              <div>
                <Label id="settings-security-flow-email-sent-label">Текущая почта</Label>
                <Input
                  id="settings-security-flow-email-sent"
                  aria-labelledby="settings-security-flow-email-sent-label"
                  readOnly
                  value={emailFlowDisplay}
                />
              </div>
              <div className="rounded-[10px] border border-[#0EB8D2] bg-[#2A2A2A] p-[15px]">
                <p className="m-0 text-base font-normal leading-normal text-[#FDFEFF] lg:text-[20px]">
                  На вашу электронную почту отправлено письмо с подтверждением. Проследуйте инструкциям в письме
                </p>
              </div>
              <Button type="button" className="w-full lg:w-auto lg:flex-none lg:self-start" onClick={resetEmailFlow}>
                Подтвердить
              </Button>
          </div>
        </div>
        )}
      </SectionCard>

      <SectionCard title={phoneFlowStep === 'idle' ? 'Номер телефона' : 'Добавить номер телефона'}>
        {phoneFlowStep === 'idle' ? (
        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <div>
            <Label id="settings-security-phone-label">Привязанный номер телефона</Label>
            <Input id="settings-security-phone" aria-labelledby="settings-security-phone-label" defaultValue="+7 (800) 555 35 35" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="min-w-[290px]" onClick={() => setPhoneFlowStep('enterPhone')}>Добавить номер телефона</Button>
            <Button
              variant="secondary"
              className="min-w-[290px]"
              onClick={async () => {
                if (!accessToken) return;
                try {
                  await deletePhone(accessToken);
                  setSecurityActionMessage('Телефон удалён.');
                } catch (error) {
                  setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось удалить телефон.');
                }
              }}
            >
              Удалить номер телефона
            </Button>
          </div>
        </div>
        ) : (
          <div className="relative">
            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                phoneFlowStep === 'enterPhone'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={phoneFlowStep !== 'enterPhone'}
            >
              <div>
                <Label id="settings-security-phone-add-label">Телефон</Label>
                <Input
                  id="settings-security-phone-add"
                  aria-labelledby="settings-security-phone-add-label"
                  placeholder="+7 (XXX) XXX XX XX"
                  value={phoneCandidate}
                  onChange={(e) => setPhoneCandidate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="min-w-[240px] w-full lg:w-auto lg:flex-none lg:self-start"
                  onClick={async () => {
                    if (!accessToken || !phoneCandidate.trim()) return;
                    try {
                      await requestPhoneCode({ phone: phoneCandidate.trim() }, accessToken);
                      setPhoneFlowStep('smsSent');
                      setSecurityActionMessage('SMS-код отправлен.');
                    } catch (error) {
                      setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось отправить SMS-код.');
                    }
                  }}
                >
                  Получить код доступа
                </Button>
                <Button type="button" variant="secondary" className="min-w-[150px]" onClick={resetPhoneFlow}>
                  Назад
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                phoneFlowStep === 'smsSent'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 -translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={phoneFlowStep !== 'smsSent'}
            >
              <div>
                <Label id="settings-security-phone-sent-label">Телефон</Label>
                <Input
                  id="settings-security-phone-sent"
                  aria-labelledby="settings-security-phone-sent-label"
                  value={phoneCandidate}
                  onChange={(e) => setPhoneCandidate(e.target.value)}
                />
              </div>

              <div className={authModalEmailInfoBoxStyles}>
                <p className="m-0">Мы отправили SMS с кодом доступа на указанный номер телефона</p>
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-start p-0 text-base font-medium underline underline-offset-4"
                  onClick={async () => {
                    if (!accessToken || !phoneCandidate.trim()) return;
                    try {
                      await requestPhoneCode({ phone: phoneCandidate.trim() }, accessToken);
                      setSecurityActionMessage('SMS-код отправлен повторно.');
                    } catch (error) {
                      setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось отправить SMS-код.');
                    }
                  }}
                >
                  Отправить повторно
                </Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="min-w-[190px] w-full lg:w-auto lg:flex-none lg:self-start"
                  onClick={() => setPhoneFlowStep('enterCode')}
                >
                  Продолжить
                </Button>
                <Button type="button" variant="secondary" className="min-w-[150px]" onClick={resetPhoneFlow}>
                  Назад
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'flex flex-col gap-[20px] transition-[opacity,transform] duration-300 ease-out lg:gap-[30px]',
                phoneFlowStep === 'enterCode'
                  ? 'relative z-10 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute left-0 right-0 top-0 z-0 h-0 translate-y-1 overflow-hidden opacity-0',
              )}
              aria-hidden={phoneFlowStep !== 'enterCode'}
            >
              <div>
                <Label id="settings-security-phone-code-label">Код доступа</Label>
                {phoneFlowStep === 'enterCode' ? (
                  <OtpDigitInputs
                    key="settings-security-phone-otp"
                    length={PHONE_ACCESS_CODE_LEN}
                    value={phoneAccessCode}
                    onChange={setPhoneAccessCode}
                    idPrefix="settings-security-phone-code"
                    ariaLabelledBy="settings-security-phone-code-label"
                    className="mt-[15px]"
                  />
                ) : null}
              </div>

              <div className={authModalEmailInfoBoxStyles}>
                <p className="m-0">Введите полученный код доступа</p>
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-start p-0 text-base font-medium underline underline-offset-4"
                  onClick={async () => {
                    if (!accessToken || !phoneCandidate.trim()) return;
                    try {
                      await requestPhoneCode({ phone: phoneCandidate.trim() }, accessToken);
                      setSecurityActionMessage('SMS-код отправлен повторно.');
                    } catch (error) {
                      setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось отправить SMS-код.');
                    }
                  }}
                >
                  Отправить повторно
                </Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  type="button"
                  className="min-w-[190px] w-full lg:w-auto lg:flex-none lg:self-start disabled:opacity-100"
                  disabled={phoneAccessCode.length < PHONE_ACCESS_CODE_LEN}
                  onClick={async () => {
                    if (!accessToken || !phoneCandidate.trim()) return;
                    try {
                      await confirmPhone({ phone: phoneCandidate.trim(), code: phoneAccessCode }, accessToken);
                      setSecurityActionMessage('Телефон подтверждён.');
                      resetPhoneFlow();
                    } catch (error) {
                      setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось подтвердить телефон.');
                    }
                  }}
                >
                  Завершить
                </Button>
                <Button type="button" variant="secondary" className="min-w-[150px]" onClick={resetPhoneFlow}>
                  Назад
                </Button>
              </div>
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Двухфакторная аутентификация (2FA)"
        aside={
          <ToggleSwitch
            checked={twoFactorEnabled}
            onChange={async () => {
              if (accessToken) {
                try {
                  await setUserSecurity2fa({ enabled: !twoFactorEnabled }, accessToken);
                  setSecurityActionMessage('Настройка 2FA сохранена.');
                } catch (error) {
                  setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось сохранить 2FA.');
                  return;
                }
              }
              onToggleTwoFactor();
            }}
            className="inline-flex shrink-0"
          />
        }
      >
        <div className="flex flex-col gap-[40px] lg:gap-[60px]">
              <p className="m-0 text-base text-[#FDFEFF]">
                Двухфакторная аутентификация (2FA) обеспечит более надежную защиту вашего аккаунта
              </p>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 pr-2">
              <h3 className="mb-2 text-[16px] lg:text-[20px] font-semibold text-white">Электронная почта</h3>
              <p className="m-0 text-base text-[#FDFEFF]">
                Использовать электронную почту для двухфакторной аутентификации
              </p>
            </div>
            <ToggleSwitch
              checked={email2faEnabled}
              onChange={async () => {
                if (accessToken) {
                  try {
                    await setUserSecurityEmail2fa({ enabled: !email2faEnabled }, accessToken);
                    setSecurityActionMessage('Настройка email 2FA сохранена.');
                  } catch (error) {
                    setSecurityActionMessage(error instanceof Error ? error.message : 'Не удалось сохранить email 2FA.');
                    return;
                  }
                }
                onToggleEmail2fa();
              }}
              className="inline-flex shrink-0"
            />
          </div>
          {securityActionMessage ? <p className="m-0 text-[#FDFEFF]">{securityActionMessage}</p> : null}
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
