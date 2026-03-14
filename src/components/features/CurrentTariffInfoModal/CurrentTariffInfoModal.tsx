import { ModalShell } from '../../ui';
import { OptionIndicator } from '../../ui/OptionIndicator';
import {
  currentTariffInfoFootnoteStyles,
  currentTariffInfoItemStyles,
  currentTariffInfoListStyles,
  currentTariffInfoTextStyles,
  currentTariffInfoTitleStyles,
} from './CurrentTariffInfoModal.styles';

const tariffItems = [
  { label: 'Упоминания в Telegram', positive: false },
  { label: 'Упоминания в СМИ', positive: false },
  { label: 'Все факторы проверок', positive: true },
] as const;

export interface CurrentTariffInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export function CurrentTariffInfoModal({
  open,
  onClose,
}: CurrentTariffInfoModalProps) {
  return (
    <ModalShell open={open} onClose={onClose} size="sm">
      <p className={currentTariffInfoTitleStyles}>Текущий тарифный план</p>
      <p className={currentTariffInfoTextStyles}>
        Ваш тарифный план «Индивидуальный» включает в себя следующие категории:
      </p>

      <ul className={currentTariffInfoListStyles}>
        {tariffItems.map((item) => (
          <li
            key={item.label}
            className={`${currentTariffInfoItemStyles} ${item.positive ? 'text-[#45C857]' : 'text-[#F45353]'}`}
          >
            <OptionIndicator type="radio" checked={false} className="border-white/45" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <p className={currentTariffInfoFootnoteStyles}>
        Подробнее со всеми тарифными планами можно ознакомиться на странице «Тариф».
      </p>
    </ModalShell>
  );
}
