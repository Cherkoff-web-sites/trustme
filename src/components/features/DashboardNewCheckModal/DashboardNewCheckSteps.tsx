import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, OptionIndicator } from '../../ui';
import { ReportActions } from '../ReportActions';
import { combineStyles } from '../../../lib/combineStyles';
import { designTokens } from '../../ui/design-tokens';
import loadSvg from '../../../assets/icons/load.svg';
import {
  dashboardNewCheckFootnoteStyles,
  dashboardNewCheckFormStackStyles,
  dashboardNewCheckLoadingSpinnerWrapStyles,
  dashboardNewCheckRadioErrorStyles,
  dashboardNewCheckResultDescStyles,
  dashboardNewCheckResultStackStyles,
  dashboardNewCheckResultTitleStyles,
} from './DashboardNewCheckModal.styles';

export type DashboardNewCheckFlowStep = 'form' | 'loading' | 'error' | 'success';

type PersonType = 'legal' | 'individual';

export interface DashboardNewCheckStepsProps {
  /** После «Открыть отчёт» в шаге успеха — например открыть превью отчёта в истории. */
  onReportOpen?: () => void;
  /** Сообщить текущий шаг наверх (чтобы менять заголовок карточки). */
  onStepChange?: (step: DashboardNewCheckFlowStep) => void;
}

/**
 * Многошаговая проверка для карточки дашборда (без модалки и без /new-check).
 * Демо ошибки: в поле введите `!fail`.
 */
export function DashboardNewCheckSteps({ onReportOpen, onStepChange }: DashboardNewCheckStepsProps) {
  const [flowStep, setFlowStep] = useState<DashboardNewCheckFlowStep>('form');
  const [personType, setPersonType] = useState<PersonType | null>(null);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [personTypeError, setPersonTypeError] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const failTokenRef = useRef(false);

  const resetFormFields = useCallback(() => {
    setPersonType(null);
    setQuery('');
    setSubmitted(false);
    setPersonTypeError(false);
    setQueryError(false);
    failTokenRef.current = false;
  }, []);

  const validateForm = () => {
    const nextPersonErr = personType === null;
    const nextQueryErr = query.trim().length === 0;
    setPersonTypeError(nextPersonErr);
    setQueryError(nextQueryErr);
    setSubmitted(true);
    return !nextPersonErr && !nextQueryErr;
  };

  const handleLaunch = () => {
    if (!validateForm()) return;

    failTokenRef.current = query.trim().toLowerCase() === '!fail';
    setFlowStep('loading');

    window.setTimeout(() => {
      setFlowStep(failTokenRef.current ? 'error' : 'success');
    }, 1600);
  };

  const handleRetryFromError = () => {
    setFlowStep('form');
    resetFormFields();
  };

  const handleReportOpen = () => {
    onReportOpen?.();
  };

  useEffect(() => {
    onStepChange?.(flowStep);
  }, [flowStep, onStepChange]);

  return (
    <div className="flex min-h-0 flex-col gap-[30px]">
      {flowStep === 'form' ? (
        <>
          <div className="relative">
            <div className={combineStyles(dashboardNewCheckFormStackStyles, designTokens.colors.text.primary)}>
              <button
                type="button"
                className="flex items-center gap-[10px] text-left"
                onClick={() => {
                  setPersonType((prev) => (prev === 'legal' ? null : 'legal'));
                  if (submitted) setPersonTypeError(false);
                }}
              >
                <OptionIndicator type="radio" checked={personType === 'legal'} className="h-[22px] w-[22px]" />
                Юридическое лицо
              </button>
              <button
                type="button"
                className="flex items-center gap-[10px] text-left"
                onClick={() => {
                  setPersonType((prev) => (prev === 'individual' ? null : 'individual'));
                  if (submitted) setPersonTypeError(false);
                }}
              >
                <OptionIndicator type="radio" checked={personType === 'individual'} className="h-[22px] w-[22px]" />
                Физическое лицо
              </button>
            </div>

            {personTypeError ? (
              <p className={`absolute left-0 right-0 top-full mt-[5px] ${dashboardNewCheckRadioErrorStyles}`} role="alert">
                Выберите тип проверяемого лица
              </p>
            ) : null}
          </div>


          <div>
            <Input
              placeholder="Введите ИНН / ОГРН / ФИО"
              value={query}
              error={queryError ? 'Обязательное поле' : undefined}
              onChange={(e) => {
                setQuery(e.target.value);
                if (submitted && e.target.value.trim()) setQueryError(false);
              }}
              aria-invalid={queryError}
            />
          </div>

          <div>
            <Button type="button" className="w-full" onClick={handleLaunch}>
              Запустить проверку
            </Button>
            <p className={dashboardNewCheckFootnoteStyles}>
              Стоимость проверки будет списана с баланса вашего аккаунта согласно текущему тарифу
            </p>
          </div>
        </>
      ) : null}

      {flowStep === 'loading' ? (
        <div className="flex min-h-[200px] flex-col">
          <div>
            <p className="text-[16px] lg:text-[18px]">
              Ожидайте, формирование отчета может занять до 10 минут
            </p>
          </div>
          <div className={dashboardNewCheckLoadingSpinnerWrapStyles}>
            <img
              src={loadSvg}
              alt=""
              className="h-[48px] w-[48px] animate-spin motion-reduce:animate-none lg:h-[60px] lg:w-[60px]"
              aria-hidden
            />
          </div>
        </div>
      ) : null}

      {flowStep === 'error' ? (
        <div className={dashboardNewCheckResultStackStyles}>
          <h3 className={dashboardNewCheckResultTitleStyles}>Ошибка генерации отчета</h3>
          <p className={dashboardNewCheckResultDescStyles}>
            Отчет не удалось сформировать. Вы можете попробовать еще раз или написать в поддержку
          </p>
          <Button
            type="button"
            variant="secondary"
            className="w-full border-[#FF7A7A]/80 bg-transparent text-[#FDFEFF] hover:bg-[#FF7A7A]/10"
            onClick={handleRetryFromError}
          >
            Ошибка
          </Button>
          <p className="m-0 text-center text-sm text-[#FDFEFF]">
            Что-то пошло не так?{' '}
            <Button
              type="button"
              variant="ghost"
              className="font-medium text-[#FDFEFF] underline underline-offset-4 hover:text-[#FDFEFF]"
            >
              Написать в поддержку
            </Button>
          </p>
        </div>
      ) : null}

      {flowStep === 'success' ? (
        <div className="flex flex-col gap-[30px] text-left">
          <p className="text-[16px] lg:text-[18px]">
            Отчет успешно сформирован.
            <br />
            Вы можете посмотреть или скачать его
          </p>
          <div className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#34A853] bg-[#2A2A2A] p-[15px] text-[16px] lg:text-[18px]">
            Успешно
          </div>
          <ReportActions
            fullWidthMobile
            equalSplitLg
            openLabel="Открыть отчет"
            downloadLabel="Скачать отчет"
            onOpen={handleReportOpen}
            onDownload={() => {
              /* заглушка */
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
