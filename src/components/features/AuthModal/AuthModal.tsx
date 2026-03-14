import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalShell } from '../../ui/ModalShell/ModalShell';
import { Button, Input } from '../../ui';
import { cn } from '../../../lib/cn';

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'register';
type AccountType = 'legal' | 'individual';

export function AuthModal({ open, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('ivanivanov1999@mail.ru');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [consentPersonal, setConsentPersonal] = useState(false);
  const [consentPromo, setConsentPromo] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate('/cabinet');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate('/cabinet');
  };

  if (!open) return null;

  const tabLabel = 'text-[14px] font-semibold lg:text-[20px]';
  const tabActive = 'text-[#FDFEFF] border-b-2 border-[#057889] pb-2';
  const tabInactive = 'text-[#FDFEFF]/60 hover:text-[#FDFEFF]/80';

  return (
    <ModalShell open={open} onClose={onClose} size="md">
      <div className="flex flex-col gap-6 pb-2 pt-2">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-[20px] font-semibold uppercase tracking-tight text-[#FDFEFF] lg:text-[24px]">
            Trust Me
          </h2>
          <p className="mt-2 text-base text-[#FDFEFF]/70 lg:text-[18px]">
            {view === 'login'
              ? 'Войдите в сервис проверки контрагентов «Trust Me»'
              : 'Для создания аккаунта в сервисе проверки контрагентов «Trust Me» укажите свои данные:'}
          </p>
        </header>

        {view === 'login' ? (
          <>
            {/* Tabs: Логин и пароль | Регистрация */}
            <nav className="flex gap-6 border-b border-[#FDFEFF]/15">
              <button
                type="button"
                className={cn(tabLabel, tabActive)}
                onClick={() => setView('login')}
              >
                Логин и пароль
              </button>
              <button
                type="button"
                className={cn(tabLabel, tabInactive)}
                onClick={() => setView('register')}
              >
                Регистрация
              </button>
            </nav>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm text-[#FDFEFF]/85 lg:text-base">
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
                <label className="mb-1.5 block text-sm text-[#FDFEFF]/85 lg:text-base">
                  Пароль
                </label>
                <div className="relative flex items-center">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pr-24"
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-sm text-[#FDFEFF]/60 hover:text-[#FDFEFF]/85"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? 'Скрыть' : 'Показать'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#FDFEFF]/80 lg:text-base">
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
                  className="text-sm text-[#FDFEFF]/80 underline hover:text-[#FDFEFF] lg:text-base"
                >
                  Забыли пароль?
                </button>
              </div>
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>

            <p className="text-center text-sm text-[#FDFEFF]/80 lg:text-base">
              Еще нет аккаунта?{' '}
              <button
                type="button"
                className="text-[#057889] underline hover:text-[#057889]/90"
                onClick={() => setView('register')}
              >
                Зарегистрируйтесь
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Account type: Юридическое лицо | Физическое лицо */}
            <nav className="flex gap-6 border-b border-[#FDFEFF]/15">
              <button
                type="button"
                className={cn(tabLabel, accountType === 'legal' ? tabActive : tabInactive)}
                onClick={() => setAccountType('legal')}
              >
                Юридическое лицо
              </button>
              <button
                type="button"
                className={cn(tabLabel, accountType === 'individual' ? tabActive : tabInactive)}
                onClick={() => setAccountType('individual')}
              >
                Физическое лицо
              </button>
            </nav>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm text-[#FDFEFF]/85 lg:text-base">
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
                <label className="mb-1.5 block text-sm text-[#FDFEFF]/85 lg:text-base">
                  Пароль
                </label>
                <div className="relative flex items-center">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pr-24"
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-sm text-[#FDFEFF]/60 hover:text-[#FDFEFF]/85"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? 'Скрыть' : 'Показать'}
                  </button>
                </div>
                <ul className="mt-2 space-y-1 pl-4 text-sm text-[#FDFEFF]/80 lg:text-base">
                  <li className="list-disc">Не менее 8 символов</li>
                  <li className="list-disc">Минимум одна заглавная и одна строчная буква</li>
                  <li className="list-disc">Минимум одна цифра</li>
                </ul>
              </div>
              <Button type="submit" className="w-full">
                Зарегистрироваться
              </Button>
              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-start gap-2 text-sm text-[#FDFEFF]/80 lg:text-base">
                  <input
                    type="checkbox"
                    checked={consentPersonal}
                    onChange={(e) => setConsentPersonal(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border border-[#FDFEFF]/50 bg-[#2A2A2A] text-[#057889] focus:ring-[#057889]"
                  />
                  <span>
                    Регистрируясь, я подтверждаю согласие на обработку персональных данных, указанных
                    в этой веб-форме
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-[#FDFEFF]/80 lg:text-base">
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

            <p className="text-center text-sm text-[#FDFEFF]/80 lg:text-base">
              Уже есть аккаунт?{' '}
              <button
                type="button"
                className="text-[#057889] underline hover:text-[#057889]/90"
                onClick={() => setView('login')}
              >
                Войти
              </button>
            </p>
          </>
        )}
      </div>
    </ModalShell>
  );
}
