import * as React from 'react';
import { Button, FilterChip, Input, ModalShell, OptionIndicator, designTokens } from '../../ui';
import sbpPng from '../../../assets/sbp.png';
import {
  balanceTopUpFormStyles,
  balanceTopUpPresetGridStyles,
} from './BalanceTopUpModal.styles';

export type TopUpStep = 'form' | 'processing' | 'waiting' | 'success';

export interface BalanceTopUpModalProps {
  open: boolean;
  step: TopUpStep;
  amount: string;
  onAmountChange: (value: string) => void;
  onChipSelect: (value: number) => void;
  onContinue: () => void;
  onPay: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function BalanceTopUpModal({
  open,
  step,
  amount,
  onAmountChange,
  onChipSelect,
  onContinue,
  onPay,
  onBack,
  onClose,
}: BalanceTopUpModalProps) {
  const numericAmount = Number(amount.replace(/\s/g, ''));
  const [amountError, setAmountError] = React.useState<string | undefined>(undefined);

  const handleContinue = () => {
    if (!amount.trim()) {
      setAmountError('Введите сумму');
      return;
    }
    setAmountError(undefined);
    onContinue();
  };

  return (
    <ModalShell
      open={open}
      size="md"
      onClose={onClose}
      closeButton={false}
      panelClassName="px-5 py-6 sm:px-7 sm:py-7 lg:max-w-[624px] lg:p-[60px]"
    >
      <div className="flex justify-end">
        <button type="button" aria-label="Закрыть" onClick={onClose} className="inline-flex">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M11.1744 9.49899L18.651 2.03423C18.8745 1.81075 19 1.50766 19 1.19162C19 0.875584 18.8745 0.572491 18.651 0.349018C18.4275 0.125546 18.1244 0 17.8084 0C17.4923 0 17.1892 0.125546 16.9658 0.349018L9.50101 7.82565L2.03625 0.349018C1.81278 0.125546 1.50969 2.80593e-07 1.19365 2.82947e-07C0.87761 2.85302e-07 0.574516 0.125546 0.351043 0.349018C0.127571 0.572491 0.00202562 0.875584 0.00202562 1.19162C0.00202562 1.50766 0.127571 1.81075 0.351043 2.03423L7.82767 9.49899L0.351043 16.9637C0.23981 17.0741 0.151521 17.2053 0.0912708 17.3499C0.0310203 17.4946 0 17.6497 0 17.8064C0 17.963 0.0310203 18.1181 0.0912708 18.2628C0.151521 18.4074 0.23981 18.5386 0.351043 18.649C0.461369 18.7602 0.592626 18.8485 0.737245 18.9087C0.881863 18.969 1.03698 19 1.19365 19C1.35031 19 1.50543 18.969 1.65005 18.9087C1.79467 18.8485 1.92593 18.7602 2.03625 18.649L9.50101 11.1723L16.9658 18.649C17.0761 18.7602 17.2074 18.8485 17.352 18.9087C17.4966 18.969 17.6517 19 17.8084 19C17.965 19 18.1202 18.969 18.2648 18.9087C18.4094 18.8485 18.5407 18.7602 18.651 18.649C18.7622 18.5386 18.8505 18.4074 18.9108 18.2628C18.971 18.1181 19.002 17.963 19.002 17.8064C19.002 17.6497 18.971 17.4946 18.9108 17.3499C18.8505 17.2053 18.7622 17.0741 18.651 16.9637L11.1744 9.49899Z"
              fill="#FDFEFF"
            />
          </svg>
        </button>
      </div>
      <h3 className="mt-[20px] lg:mt-[30px] text-center text-[24px] font-semibold text-[#FDFEFF]">Пополнение баланса</h3>

      {step === 'form' ? (
        <div className={balanceTopUpFormStyles}>
          <p className="mt-[30px] lg:mt-[20px] text-center text-[18px] text-[#FDFEFF]">
            Выберите нужную сумму или введите ее вручную
          </p>
          <Input
            placeholder="Введите сумму от 100 до 100 000"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            className="mt-[40px]"
            error={amountError}
          />
          <div className={balanceTopUpPresetGridStyles}>
            {[300, 500, 1000, 2000, 5000, 10000, 20000].map((value) => (
              <FilterChip
                key={value}
                className={[
                  'flex h-auto min-h-[47px] w-auto shrink-0 items-center justify-center whitespace-nowrap',
                  'rounded-[100px] border px-5 py-3 text-center',
                  designTokens.colors.background.input,
                  designTokens.colors.border.input,
                  designTokens.colors.text.muted,
                  designTokens.typography.input,
                  'hover:bg-[#393939]',
                ].join(' ')}
                onClick={() => {
                  setAmountError(undefined);
                  onChipSelect(value);
                }}
              >
                {value.toLocaleString('ru-RU')} ₽
              </FilterChip>
            ))}
          </div>

          <Button className="mt-[40px] w-full" onClick={handleContinue}>
            Продолжить
          </Button>
        </div>
      ) : null}

      {step === 'processing' ? (
        <div className="mt-[40px] lg:mt-[20px]">
          <div
            className={[
              'flex items-center justify-between gap-4 rounded-[10px] border p-[15px]',
              designTokens.colors.background.input,
              designTokens.colors.border.input,
              designTokens.colors.text.primary,
              'text-[16px]',
            ].join(' ')}
          >
            <div className="flex items-center gap-[10px]">
              <OptionIndicator type="radio" checked className="h-[22px] w-[22px]" />
              <span>Система быстрых платежей</span>
            </div>
            <img src={sbpPng} alt="" aria-hidden className="h-auto w-[30px] shrink-0" />
          </div>

          <div className="mt-[40px] lg:mt-[20px] flex items-center justify-between gap-4 text-[18px] text-[#FDFEFF]">
            <span className="opacity-80">Итого к оплате:</span>
            <span className="text-[24px] font-semibold">
              {isNaN(numericAmount) ? '—' : `${numericAmount.toLocaleString('ru-RU')} ₽`}
            </span>
          </div>

          <Button className="mt-[40px] w-full" onClick={onPay}>
            Пополнить
          </Button>
          <Button
            variant="secondary"
            className="mt-[20px] w-full bg-transparent border-[#FDFEFF]"
            onClick={onBack}
          >
            Назад
          </Button>
        </div>
      ) : null}

      {step === 'waiting' ? (
        <div className="mt-[40px] lg:mt-[20px]">
          <p className="text-center text-[18px] text-[#FDFEFF]">Ожидайте, идет пополнение баланса</p>
          <div className="mt-[40px] lg:mt-[20px] rounded-[10px] border border-[#0EB8D2] bg-[#2A2A2A] p-[15px]">
            <p className="m-0 text-[18px] text-[#FDFEFF]">
              Сумма: <span className="font-semibold">{isNaN(numericAmount) ? '—' : `${numericAmount.toLocaleString('ru-RU')} ₽`}</span>
            </p>
            <p className="mt-[15px] mb-0 text-[18px] text-[#FDFEFF]">
              Чек об оплате вышлем на почту: <span className="font-semibold">user.example@gmail.com</span>
            </p>
          </div>
        </div>
      ) : null}

      {step === 'success' ? (
        <div className="mt-[40px] lg:mt-[20px]">
          <div className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#34A853] bg-[#2A2A2A] p-[15px] text-[16px] lg:text-[18px]">
            Успешно
          </div>
        </div>
      ) : null}
    </ModalShell>
  );
}
