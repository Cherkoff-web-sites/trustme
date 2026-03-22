import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import bgModalMob from "../../../assets/bg_modal_mob.webp";
import bgModalPc from "../../../assets/bg_modal_pc.webp";
import logoSvg from "../../../assets/icons/logo.svg";
import {
  Button,
  Card,
  designTokens,
  Input,
  ModalScreenCloseButton,
  OptionIndicator,
} from "../../ui";
import { cn } from "../../../lib/cn";
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

export function AuthModal({ open, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [consentPersonal, setConsentPersonal] = useState(false);
  const [consentPromo, setConsentPromo] = useState(false);
  const [countdownSec, setCountdownSec] = useState(EMAIL_CONFIRM_COUNTDOWN_SEC);
  const [loginFieldErrors, setLoginFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    if (!open) {
      setView("login");
      setLoginFieldErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (view !== "emailConfirm" || countdownSec <= 0) return;
    const timer = setInterval(() => setCountdownSec((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [view, countdownSec]);

  const countdownFormatted = (() => {
    const m = Math.floor(countdownSec / 60);
    const s = countdownSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  })();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = "Обязательное поле";
    if (!password) next.password = "Обязательное поле";
    setLoginFieldErrors(next);
    if (Object.keys(next).length > 0) return;
    login();
    onClose();
    navigate("/cabinet");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView("emailConfirm");
    setCountdownSec(EMAIL_CONFIRM_COUNTDOWN_SEC);
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API сброса пароля
    setView("login");
  };

  if (!open) return null;

  const tabLabel = "text-[14px] font-semibold lg:text-[20px]";
  const tabActive = "text-[#FDFEFF] border-b-2 border-[#057889] pb-2";
  const tabInactive = "text-[#FDFEFF] hover:text-[#FDFEFF]";

  return (
    <div
      className={authModalOverlayOuterStyles}
      onClick={onClose}
      role="presentation"
    >
      <ModalScreenCloseButton onClose={onClose} />
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
        <Card
          as="div"
          headerVariant={6}
          className={cn(authModalCardClassName, view === "emailConfirm" && "max-w-[537px]")}
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
            <p>
              {(view === "login" || view === "passwordReset") &&
                "Войдите в\u00A0сервис проверки контрагентов «Trust Me»"}
              {view === "register" &&
                "Для создания аккаунта в\u00A0сервисе проверки контрагентов «Trust Me» укажите свои данные:"}
              {view === "emailConfirm" &&
                "Для завершения регистрации в\u00A0сервисе проверки контрагентов «Trust Me» перейдите по ссылке из письма:"}
            </p>
          </div>

          {view === "emailConfirm" ? (
            <div
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              <div className={authModalEmailInfoBoxStyles}>
                <p>Письмо отправлено на указанную почту: {email || "…"}</p>
                <p>Если письма нет, проверьте папку «Спам».</p>
              </div>
              <p className="text-center text-sm text-[#FDFEFF] lg:text-base">
                Выслать письмо повторно через {countdownFormatted}
              </p>
            </div>
          ) : view === "passwordReset" ? (
            <form
              onSubmit={handlePasswordResetSubmit}
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              <nav
                className={cn(
                  "flex flex-wrap border-b border-[#FDFEFF]/15",
                  designTokens.spacing.gap.cardInternal,
                )}
              >
                <button
                  type="button"
                  className={cn(tabLabel, tabActive)}
                  onClick={() => setView("login")}
                >
                  Логин и пароль
                </button>
                <button
                  type="button"
                  className={cn(tabLabel, tabInactive)}
                  onClick={() => setView("register")}
                >
                  Регистрация
                </button>
              </nav>
              <div>
                <label className="mb-1.5 block text-sm text-[#FDFEFF] lg:text-base">
                  Почта
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IvanIvanov1999@mail.ru"
                />
              </div>
              <div className={authModalEmailInfoBoxStyles}>
                <p>
                  Укажите почту, которую вы использовали для регистрации в сервисе «Trust Me».
                </p>
                <p>
                  Мы отправим ссылку для сброса текущего пароля.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Сбросить
              </Button>
            </form>
          ) : view === "login" ? (
            <form
              onSubmit={handleLoginSubmit}
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              <nav
                className={cn(
                  "flex flex-wrap border-b border-[#FDFEFF]/15",
                  designTokens.spacing.gap.cardInternal,
                )}
              >
                <button
                  type="button"
                  className={cn(tabLabel, tabActive)}
                  onClick={() => setView("login")}
                >
                  Логин и пароль
                </button>
                <button
                  type="button"
                  className={cn(tabLabel, tabInactive)}
                  onClick={() => setView("register")}
                >
                  Регистрация
                </button>
              </nav>
              <div>
                <label
                  className="mb-1.5 block text-sm text-[#FDFEFF] lg:text-base"
                  htmlFor="auth-modal-login-email"
                >
                  Почта
                </label>
                <Input
                  id="auth-modal-login-email"
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
                <label
                  className="mb-1.5 block text-sm text-[#FDFEFF] lg:text-base"
                  htmlFor="auth-modal-login-password"
                >
                  Пароль
                </label>
                <Input
                  id="auth-modal-login-password"
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
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#FDFEFF] lg:text-base">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border border-[#FDFEFF]/50 bg-[#2A2A2A] text-[#057889] focus:ring-[#057889]"
                  />
                  Запомнить меня
                </label>
                <button
                  type="button"
                  className="text-sm text-[#FDFEFF] hover:text-[#FDFEFF] lg:text-base"
                  onClick={() => setView("passwordReset")}
                >
                  Забыли пароль?
                </button>
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleRegisterSubmit}
              className={cn(
                "flex flex-col",
                designTokens.spacing.gap.cardInternal,
              )}
            >
              <nav
                className={cn(
                  "flex flex-col border-b border-[#FDFEFF]/15 pb-4 sm:flex-row sm:items-center",
                  designTokens.spacing.gap.cardInternal,
                )}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-[10px] text-left",
                    tabLabel,
                    tabInactive,
                  )}
                  onClick={() => setAccountType("legal")}
                >
                  <OptionIndicator
                    type="radio"
                    checked={accountType === "legal"}
                  />
                  Юридическое лицо
                </button>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-[10px] text-left",
                    tabLabel,
                    tabInactive,
                  )}
                  onClick={() => setAccountType("individual")}
                >
                  <OptionIndicator
                    type="radio"
                    checked={accountType === "individual"}
                  />
                  Физическое лицо
                </button>
              </nav>
              <div>
                <label className="mb-1.5 block text-sm text-[#FDFEFF] lg:text-base">
                  Почта
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-sm text-[#FDFEFF] lg:text-base"
                  htmlFor="auth-modal-register-password"
                >
                  Пароль
                </label>
                <Input
                  id="auth-modal-register-password"
                  type="password"
                  passwordToggle
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                />
                <ul className="mt-2 space-y-1 pl-4 text-sm text-[#FDFEFF] lg:text-base">
                  <li className="list-disc">Не менее 8 символов</li>
                  <li className="list-disc">
                    Минимум одна заглавная и одна строчная буква
                  </li>
                  <li className="list-disc">Минимум одна цифра</li>
                </ul>
              </div>
              <Button type="submit" className="w-full">
                Зарегистрироваться
              </Button>
              <div
                className={cn(
                  "flex flex-col",
                  designTokens.spacing.gap.cardInternal,
                )}
              >
                <label className="flex cursor-pointer items-start gap-2 text-sm text-[#FDFEFF] lg:text-base">
                  <input
                    type="checkbox"
                    checked={consentPersonal}
                    onChange={(e) => setConsentPersonal(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border border-[#FDFEFF]/50 bg-[#2A2A2A] text-[#057889] focus:ring-[#057889]"
                  />
                  <span>
                    Регистрируясь, я подтверждаю согласие на обработку
                    персональных данных, указанных в этой веб-форме
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-[#FDFEFF] lg:text-base">
                  <input
                    type="checkbox"
                    checked={consentPromo}
                    onChange={(e) => setConsentPromo(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border border-[#FDFEFF]/50 bg-[#2A2A2A] text-[#057889] focus:ring-[#057889]"
                  />
                  <span>Я даю согласие на получение рекламных материалов</span>
                </label>
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
              Указали не ту почту?{" "}
              <button type="button" className="border-b font-semibold" onClick={() => setView("register")}>
                Изменить
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
  );
}
