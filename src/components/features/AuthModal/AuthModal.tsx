import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { AuthApiError, authAcceptRegister, authRegister } from "../../../api/auth";
import bgModalMob from "../../../assets/bg_modal_mob.webp";
import bgModalPc from "../../../assets/bg_modal_pc.webp";
import logoSvg from "../../../assets/icons/logo.svg";
import {
  Button,
  Card,
  Checkbox,
  designTokens,
  Input,
  Label,
  ModalScreenCloseButton,
} from "../../ui";
import { cn } from "../../../lib/cn";
import { combineStyles } from "../../../lib/combineStyles";
import { getSafeNextPath } from "../../../lib/getSafeNextPath";
import { getPasswordRuleChecks } from "../../../lib/passwordRules";
import { useBodyScrollLock } from "../../../lib/useBodyScrollLock";
import {
  authModalBgLayerMobStyles,
  authModalBgLayerPcImgStyles,
  authModalBgLayerPcWrapStyles,
  authModalBgLayerStyles,
  authModalCardClassName,
  authModalEmailInfoBoxStyles,
  authModalOverlayInnerStyles,
  authModalOverlayOuterStyles,
  authModalStackGapStyles,
} from "./AuthModal.styles";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthView = "login" | "register" | "emailConfirm" | "passwordReset";
type AccountType = "legal" | "individual";

const EMAIL_CONFIRM_COUNTDOWN_SEC = 600; // 10 минут
/** Длина кода из письма (реальный код с бэка — 8 цифр). */
const EMAIL_CONFIRM_CODE_LEN = 8;

export function AuthModal({ open, onClose }: AuthModalProps) {
  useBodyScrollLock(open);
  const { login, pendingUserId, setPendingUserId } = useAuth();
  const confirmCodeInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  /** По умолчанию — физическое лицо. */
  const [accountType, setAccountType] = useState<AccountType>("individual");
  /** ИНН — только для юр. лица. */
  const [registerInn, setRegisterInn] = useState("");
  const [consentPersonal, setConsentPersonal] = useState(false);
  const [consentPromo, setConsentPromo] = useState(false);
  const [countdownSec, setCountdownSec] = useState(EMAIL_CONFIRM_COUNTDOWN_SEC);
  const [loginFieldErrors, setLoginFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [registerFieldErrors, setRegisterFieldErrors] = useState<{
    inn?: string;
    email?: string;
    password?: string;
    consentPersonal?: string;
  }>({});
  const [passwordResetFieldErrors, setPasswordResetFieldErrors] = useState<{
    email?: string;
  }>({});
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [loginFormError, setLoginFormError] = useState<string | undefined>();
  const [registerFormError, setRegisterFormError] = useState<string | undefined>();
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmFieldError, setConfirmFieldError] = useState<string | undefined>();

  useEffect(() => {
    if (!open) {
      setView("login");
      setLoginFieldErrors({});
      setRegisterFieldErrors({});
      setPasswordResetFieldErrors({});
      setAccountType("individual");
      setRegisterInn("");
      setAuthSubmitting(false);
      setLoginFormError(undefined);
      setRegisterFormError(undefined);
      setConfirmCode("");
      setConfirmFieldError(undefined);
    }
  }, [open]);

  useEffect(() => {
    setLoginFieldErrors({});
    setRegisterFieldErrors({});
    setPasswordResetFieldErrors({});
    setLoginFormError(undefined);
    setRegisterFormError(undefined);
    setConfirmFieldError(undefined);
  }, [view]);

  useEffect(() => {
    if (!open || view !== "emailConfirm") return;
    const id = window.setTimeout(() => confirmCodeInputRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open, view]);

  useEffect(() => {
    if (view !== "emailConfirm" || countdownSec <= 0) return;
    const timer = setInterval(() => setCountdownSec((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [view, countdownSec]);

  const countdownFormatted = (() => {
    const m = Math.floor(countdownSec / 60);
    const s = countdownSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  })();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Обязательное поле";
    if (!password) next.password = "Обязательное поле";
    setLoginFieldErrors(next);
    setLoginFormError(undefined);
    if (Object.keys(next).length > 0) return;
    setAuthSubmitting(true);
    try {
      await login(email.trim(), password);
      onClose();
      navigate(getSafeNextPath(searchParams.get("next")));
    } catch (err) {
      const msg =
        err instanceof AuthApiError ? err.message : "Ошибка соединения";
      setLoginFormError(msg);
      if (err instanceof AuthApiError && (err.status === 401 || err.status === 422)) {
        setLoginFieldErrors((prev) => ({ ...prev, password: msg }));
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwdChecks = getPasswordRuleChecks(password);
    const passwordRulesOk =
      pwdChecks.minLength && pwdChecks.upperAndLower && pwdChecks.hasDigit;
    const next: {
      inn?: string;
      email?: string;
      password?: string;
      consentPersonal?: string;
    } = {};
    if (accountType === "legal" && !registerInn.trim()) next.inn = "Обязательное поле";
    if (!email.trim()) next.email = "Обязательное поле";
    if (!password.trim()) next.password = "Обязательное поле";
    else if (!passwordRulesOk) {
      next.password = "Пароль не соответствует требованиям";
    }
    if (!consentPersonal) next.consentPersonal = "Обязательное поле";
    setRegisterFieldErrors(next);
    setRegisterFormError(undefined);
    if (Object.keys(next).length > 0) return;
    setAuthSubmitting(true);
    try {
      const registered = await authRegister({
        email: email.trim(),
        password,
        role: accountType === "individual" ? "individual" : "company_admin",
      });
      setPendingUserId(registered.id);
      setCountdownSec(EMAIL_CONFIRM_COUNTDOWN_SEC);
      setConfirmCode("");
      setConfirmFieldError(undefined);
      setView("emailConfirm");
    } catch (err) {
      const msg =
        err instanceof AuthApiError
          ? err.message
          : "Не удалось зарегистрироваться.";
      setRegisterFormError(msg);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleEmailConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingUserId == null || confirmCode.length !== EMAIL_CONFIRM_CODE_LEN) return;
    if (!new RegExp(`^\\d{${EMAIL_CONFIRM_CODE_LEN}}$`).test(confirmCode)) {
      setConfirmFieldError(`Введите ${EMAIL_CONFIRM_CODE_LEN} цифр кода`);
      return;
    }
    setAuthSubmitting(true);
    setConfirmFieldError(undefined);
    try {
      await authAcceptRegister(pendingUserId, confirmCode);
      await login(email.trim(), password);
      setPendingUserId(null);
      setConfirmCode("");
      onClose();
      navigate(getSafeNextPath(searchParams.get("next")));
    } catch (err) {
      const msg =
        err instanceof AuthApiError
          ? err.message
          : "Ошибка соединения";
      setConfirmFieldError(msg);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string } = {};
    if (!email.trim()) next.email = "Обязательное поле";
    setPasswordResetFieldErrors(next);
    if (Object.keys(next).length > 0) return;
    // TODO: API сброса пароля
    setView("login");
  };

  if (!open) return null;

  const registerPasswordChecks = getPasswordRuleChecks(password);
  const registerPasswordRulesStarted = password.length > 0;

  /**
   * Шрифт переключателей: «Логин и пароль», «Юридическое / Физическое лицо».
   * См. `authModalLoginModeNav`, `authModalRegisterAccountNav`.
   */
  const authSwitcherText =
    "text-[16px] font-normal lg:text-[18px] text-[#FDFEFF]";
  const authSwitcherActive = combineStyles(
    "pb-[8px] lg:pb-[15px] border-b-2",
    designTokens.colors.accent.secondaryBorder,
  );
  const authSwitcherInactive =
    "pb-[8px] lg:pb-[15px] border-b-2 border-transparent";

  const authModalLoginModeNav = (
    <nav
      className="flex w-full justify-center border-b border-[#FDFEFF]/15"
      aria-label="Режим: вход"
    >
      <span className={cn(authSwitcherText, authSwitcherActive, "inline-block text-center")}>
        Логин и пароль
      </span>
    </nav>
  );

  const authModalRegisterAccountNav = (
    <nav
      className="flex w-full border-b border-[#FDFEFF]/15"
      aria-label="Тип аккаунта"
    >
      <button
        type="button"
        className={cn(
          "w-1/2 text-center transition-opacity",
          authSwitcherText,
          accountType === "legal" ? authSwitcherActive : authSwitcherInactive,
        )}
        onClick={() => setAccountType("legal")}
      >
        Юридическое лицо
      </button>
      <button
        type="button"
        className={cn(
          "w-1/2 text-center transition-opacity",
          authSwitcherText,
          accountType === "individual" ? authSwitcherActive : authSwitcherInactive,
        )}
        onClick={() => {
          setAccountType("individual");
          setRegisterInn("");
          setRegisterFieldErrors((prev) => ({ ...prev, inn: undefined }));
        }}
      >
        Физическое лицо
      </button>
    </nav>
  );

  // Закрытие модалки только по крестику; клик по подложке не вызывает onClose (все экраны: вход, регистрация, сброс пароля, письмо).
  return (
    <div className={authModalOverlayOuterStyles} role="presentation">
      <div className={authModalBgLayerStyles} aria-hidden>
        <img
          src={bgModalMob}
          alt=""
          width={1222}
          decoding="async"
          className={authModalBgLayerMobStyles}
        />
        <div className={authModalBgLayerPcWrapStyles}>
          <img
            src={bgModalPc}
            alt=""
            width={1629}
            decoding="async"
            className={authModalBgLayerPcImgStyles}
          />
        </div>
      </div>
      <div className={authModalOverlayInnerStyles}>
        <div
          className={cn(
            "flex w-full flex-col items-stretch",
            view === "emailConfirm" ? "max-w-[537px]" : "max-w-[624px]",
          )}
        >
          <ModalScreenCloseButton variant="scrollWithModal" onClose={onClose} />
          <Card
            as="div"
            headerVariant={6}
            className={authModalCardClassName}
            contentClassName={authModalStackGapStyles}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
          <div
            className={cn(
              "flex flex-col text-center",
              "gap-[20px] lg:gap-[30px]",
            )}
          >
            <div
              id="auth-modal-title"
              className="inline-flex justify-center"
              aria-label="Trust Me"
            >
              <img
                src={logoSvg}
                alt="Trust Me"
                width={122}
                height={29}
                className="w-[122px] h-auto"
              />
            </div>
            <p className="mx-auto w-full max-w-[328px] lg:max-w-none">
              {(view === "login" || view === "passwordReset") &&
                "Войдите в\u00A0сервис проверки контрагентов «Trust Me»"}
              {view === "register" &&
                "Для создания аккаунта в\u00A0сервисе проверки контрагентов «Trust Me» укажите свои данные:"}
              {view === "emailConfirm" &&
                "Для завершения регистрации в\u00A0сервисе проверки контрагентов «Trust Me» введите код из письма (8\u00A0цифр):"}
            </p>
          </div>

          {view === "emailConfirm" ? (
            <form
              onSubmit={handleEmailConfirmSubmit}
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              <div className={authModalEmailInfoBoxStyles}>
                <p>
                  Письмо с кодом отправлено на:{" "}
                  <span className="font-semibold">{email.trim() || "…"}</span>
                </p>
                <p>Если письма нет, проверьте папку «Спам».</p>
              </div>
              <div>
                <Label id="auth-modal-confirm-code-label">Код из письма</Label>
                <Input
                  ref={confirmCodeInputRef}
                  id="auth-modal-confirm-code"
                  aria-labelledby="auth-modal-confirm-code-label"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={EMAIL_CONFIRM_CODE_LEN}
                  pattern="[0-9]*"
                  value={confirmCode}
                  onChange={(ev) => {
                    const next = ev.target.value
                      .replace(/\D/g, "")
                      .slice(0, EMAIL_CONFIRM_CODE_LEN);
                    setConfirmCode(next);
                    setConfirmFieldError(undefined);
                  }}
                  placeholder="00000000"
                  error={confirmFieldError}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  authSubmitting ||
                  confirmCode.length < EMAIL_CONFIRM_CODE_LEN ||
                  pendingUserId == null
                }
              >
                {authSubmitting ? "Проверка…" : "Подтвердить"}
              </Button>
              <p className="m-0 text-center text-sm text-[#FDFEFF] lg:text-base">
                Отправить повторно через{" "}
                <span className="inline-block w-[42px] lg:w-[50px] shrink-0 text-center tabular-nums">
                  {countdownFormatted}
                </span>
              </p>
            </form>
          ) : view === "passwordReset" ? (
            <form
              onSubmit={handlePasswordResetSubmit}
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              {authModalLoginModeNav}
              <div>
                <Label id="auth-modal-reset-email-label">Почта</Label>
                <Input
                  id="auth-modal-reset-email"
                  aria-labelledby="auth-modal-reset-email-label"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setPasswordResetFieldErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }}
                  placeholder="ivanIvanov1999@mail.ru"
                  error={passwordResetFieldErrors.email}
                />
              </div>
              <div className={authModalEmailInfoBoxStyles}>
                <p>
                  Укажите почту, которую вы использовали для&nbsp;регистрации в&nbsp;сервисе &laquo;Trust Me&raquo;.
                </p>
                <p>
                  Мы&nbsp;отправим ссылку для сброса текущего пароля.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Сбросить
              </Button>
            </form>
          ) : view === "login" ? (
            <form
              onSubmit={handleLoginSubmit}
              className={cn("flex flex-col gap-[20px] lg:gap-[30px]")}
            >
              {authModalLoginModeNav}
              <div>
                <Label id="auth-modal-login-email-label">Почта</Label>
                <Input
                  id="auth-modal-login-email"
                  aria-labelledby="auth-modal-login-email-label"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLoginFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="ivanivanov1999@mail.ru"
                  error={loginFieldErrors.email}
                />
              </div>
              <div>
                <Label id="auth-modal-login-password-label">Пароль</Label>
                <Input
                  id="auth-modal-login-password"
                  aria-labelledby="auth-modal-login-password-label"
                  type="password"
                  passwordToggle
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Введите пароль"
                  error={loginFieldErrors.password}
                />
              </div>
              <div className="flex justify-between">
                <Label variant="inline">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Запомнить меня
                </Label>
                <button
                  type="button"
                  className="text-[14px] leading-[17px] lg:text-[16px] lg:leading-[19px]"
                  onClick={() => setView("passwordReset")}
                  aria-label="Забыли пароль?"
                >
                  Забыли пароль?
                </button>
              </div>
              {loginFormError ? (
                <p
                  className={combineStyles(
                    "m-0 text-center text-[14px] leading-[17px] lg:text-[16px] lg:leading-[19px]",
                    designTokens.colors.text.statusError,
                  )}
                  role="alert"
                >
                  {loginFormError}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={authSubmitting}>
                {authSubmitting ? "Вход…" : "Войти"}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleRegisterSubmit}
              className={cn("flex flex-col gap-[20px] lg:gap-[30px]")}
            >
              {authModalRegisterAccountNav}
              {accountType === "legal" ? (
                <div>
                  <Label id="auth-modal-register-inn-label">ИНН</Label>
                  <Input
                    id="auth-modal-register-inn"
                    aria-labelledby="auth-modal-register-inn-label"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={registerInn}
                    onChange={(e) => {
                      setRegisterInn(e.target.value);
                      setRegisterFieldErrors((prev) => ({
                        ...prev,
                        inn: undefined,
                      }));
                    }}
                    placeholder="Введите ИНН"
                    error={registerFieldErrors.inn}
                  />
                </div>
              ) : null}
              <div>
                <Label id="auth-modal-register-email-label">Почта</Label>
                <Input
                  id="auth-modal-register-email"
                  aria-labelledby="auth-modal-register-email-label"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setRegisterFieldErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }}
                  placeholder="ivanivanov1999@mail.ru"
                  error={registerFieldErrors.email}
                />
              </div>
              <div>
                <Label id="auth-modal-register-password-label">Пароль</Label>
                <Input
                  id="auth-modal-register-password"
                  aria-labelledby="auth-modal-register-password-label"
                  type="password"
                  passwordToggle
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setRegisterFieldErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }}
                  placeholder="Введите пароль"
                  error={registerFieldErrors.password}
                />
                <ul
                  className={cn(
                    "flex list-none flex-col gap-[10px] p-0",
                    registerFieldErrors.password ? "mt-[28px]" : "mt-[15px]",
                  )}
                >
                  {(
                    [
                      {
                        key: "len",
                        label: "Не менее 8 символов",
                        ok: registerPasswordChecks.minLength,
                      },
                      {
                        key: "case",
                        label:
                          "Минимум одна заглавная и одна строчная буква",
                        ok: registerPasswordChecks.upperAndLower,
                      },
                      {
                        key: "digit",
                        label: "Минимум одна цифра",
                        ok: registerPasswordChecks.hasDigit,
                      },
                    ] as const
                  ).map((rule) => {
                    const textClass = !registerPasswordRulesStarted
                      ? "text-[#FDFEFF]"
                      : rule.ok
                        ? designTokens.colors.text.statusSuccess
                        : designTokens.colors.text.statusError;
                    const dotClass = !registerPasswordRulesStarted
                      ? "bg-[#FDFEFF]"
                      : rule.ok
                        ? designTokens.colors.status.successBg
                        : designTokens.colors.status.errorBg;
                    return (
                      <li
                        key={rule.key}
                        className="flex items-center gap-[10px]"
                      >
                        <span
                          className={cn(
                            "h-[19px] w-[19px] shrink-0 rounded-full",
                            dotClass,
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "text-[14px] leading-[17px] lg:text-[16px] lg:leading-[19px]",
                            textClass,
                          )}
                        >
                          {rule.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {registerFormError ? (
                <p
                  className={combineStyles(
                    "m-0 text-center text-[14px] leading-[17px] lg:text-[16px] lg:leading-[19px]",
                    designTokens.colors.text.statusError,
                  )}
                  role="alert"
                >
                  {registerFormError}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={authSubmitting}>
                {authSubmitting ? "Отправка…" : "Зарегистрироваться"}
              </Button>
              <div
                className={cn(
                  "flex flex-col",
                  designTokens.spacing.gap.buttonAdjacent,
                )}
              >
                <div className="relative max-w-[411px]">
                  <Label variant="inlineStart" className="w-full">
                    <Checkbox
                      checked={consentPersonal}
                      error={Boolean(registerFieldErrors.consentPersonal)}
                      onChange={(e) => {
                        setConsentPersonal(e.target.checked);
                        setRegisterFieldErrors((prev) => ({
                          ...prev,
                          consentPersonal: undefined,
                        }));
                      }}
                    />
                    <span>
                      Регистрируясь, я подтверждаю согласие на обработку
                      персональных данных, указанных в этой веб-форме
                    </span>
                  </Label>
                  {registerFieldErrors.consentPersonal ? (
                    <p
                      className={cn(
                        "mt-1 text-left text-[12px] leading-[18px]",
                        designTokens.colors.text.statusError,
                      )}
                      role="alert"
                    >
                      {registerFieldErrors.consentPersonal}
                    </p>
                  ) : null}
                </div>
                <Label variant="inlineStart">
                  <Checkbox
                    checked={consentPromo}
                    onChange={(e) => setConsentPromo(e.target.checked)}
                  />
                  <span>Я даю согласие на получение рекламных материалов</span>
                </Label>
              </div>
            </form>
          )}

          {view === "login" ? (
            <p className="text-center">
              Еще нет аккаунта?{" "}
              <button type="button" className="border-b font-semibold" onClick={() => setView("register")}>
                Зарегистрируйтесь
              </button>
            </p>
          ) : view === "passwordReset" ? (
            <p className="text-center">
              <button type="button" className="border-b font-semibold" onClick={() => setView("login")}>
                Вернуться назад
              </button>
            </p>
          ) : view === "emailConfirm" ? (
            <p className="text-center">
              <button
                type="button"
                className="border-b font-semibold"
                onClick={() => {
                  setPendingUserId(null);
                  setConfirmCode("");
                  setConfirmFieldError(undefined);
                  setView("register");
                }}
              >
                Изменить email
              </button>
            </p>
          ) : (
            <p className="text-center">
              Уже есть аккаунт?{" "}
              <button type="button" className="border-b font-semibold" onClick={() => setView("login")}>
                Войти
              </button>
            </p>
          )}
        </Card>
        </div>
      </div>
    </div>
  );
}
