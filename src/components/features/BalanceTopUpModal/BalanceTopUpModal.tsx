import { Button, FilterChip, Input, ModalShell } from '../../ui';
import {
  balanceTopUpFormStyles,
  balanceTopUpPresetGridStyles,
  balanceTopUpProcessingStyles,
  balanceTopUpSubtitleStyles,
  balanceTopUpTitleStyles,
  balanceTopUpWaitingStyles,
} from './BalanceTopUpModal.styles';

export type TopUpStep = 'form' | 'waiting' | 'processing';

export interface BalanceTopUpModalProps {
  open: boolean;
  step: TopUpStep;
  amount: string;
  onAmountChange: (value: string) => void;
  onChipSelect: (value: number) => void;
  onContinue: () => void;
  onClose: () => void;
}

export function BalanceTopUpModal({
  open,
  step,
  amount,
  onAmountChange,
  onChipSelect,
  onContinue,
  onClose,
}: BalanceTopUpModalProps) {
  const numericAmount = Number(amount.replace(/\s/g, ''));
  const isAmountValid = numericAmount >= 100 && numericAmount <= 100000;

  return (
    <ModalShell open={open} size="md" onClose={onClose}>
      <h3 className={balanceTopUpTitleStyles}>Пополнение баланса</h3>
      <p className={balanceTopUpSubtitleStyles}>Ожидайте, идет пополнение баланса</p>

      {step === 'form' ? (
        <div className={balanceTopUpFormStyles}>
          <p className="text-center text-[#FDFEFF]">
            Выберите нужную сумму или введите ее вручную
          </p>
          <Input
            variant="centered"
            placeholder="Введите сумму от 100 до 100 000"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
          />
          <div className={balanceTopUpPresetGridStyles}>
            {[300, 500, 1000, 2000, 5000, 10000, 20000].map((value) => (
              <FilterChip
                key={value}
                selected={numericAmount === value}
                className={
                  'flex h-auto min-h-9 w-full min-w-0 max-w-full shrink-0 items-center justify-center rounded-[999px] ' +
                  'px-1 py-2 text-center !text-[11px] !font-semibold !leading-tight sm:min-h-10 sm:px-2 sm:!text-xs'
                }
                onClick={() => onChipSelect(value)}
              >
                {value.toLocaleString('ru-RU')} ₽
              </FilterChip>
            ))}
          </div>

          <Button className="mt-2 w-full" onClick={onContinue} disabled={!isAmountValid}>
            Продолжить
          </Button>
        </div>
      ) : null}

      {step === 'waiting' ? (
        <div className={balanceTopUpWaitingStyles}>
          <div className="mt-2 h-10 w-10 rounded-full border-2 border-white/20 border-t-[#057889]" />
        </div>
      ) : null}

      {step === 'processing' ? (
        <div className={balanceTopUpProcessingStyles}>
          <p className="mb-1">
            Сумма:{' '}
            <span className="font-semibold">
              {isNaN(numericAmount) ? '—' : `${numericAmount.toLocaleString('ru-RU')} ₽`}
            </span>
          </p>
          <p className="m-0">
            Чек об оплате вышлем на почту: <span className="font-semibold">user.example@gmail.com</span>
          </p>
        </div>
      ) : null}
    </ModalShell>
  );
}
