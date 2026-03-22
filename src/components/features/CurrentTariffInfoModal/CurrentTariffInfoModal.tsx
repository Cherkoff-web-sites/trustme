import { OptionIndicator } from "../../ui/OptionIndicator";
import {
  currentTariffInfoCloseButtonStyles,
  currentTariffInfoFootnoteStyles,
  currentTariffInfoItemStyles,
  currentTariffInfoListStyles,
  currentTariffInfoOverlayInnerStyles,
  currentTariffInfoOverlayOuterStyles,
  currentTariffInfoPanelStyles,
  currentTariffInfoTextStyles,
  currentTariffInfoTitleStyles,
} from "./CurrentTariffInfoModal.styles";

const tariffItems = [
  { label: "Упоминания в Telegram", positive: false },
  { label: "Упоминания в СМИ", positive: false },
  { label: "Все факторы проверок", positive: true },
] as const;

export interface CurrentTariffInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export function CurrentTariffInfoModal({
  open,
  onClose,
}: CurrentTariffInfoModalProps) {
  if (!open) return null;

  return (
    <div
      className={currentTariffInfoOverlayOuterStyles}
      onClick={onClose}
      role="presentation"
    >
      <div className={currentTariffInfoOverlayInnerStyles}>
        <div
          className={currentTariffInfoPanelStyles}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="current-tariff-info-title"
        >
          <button
            type="button"
            aria-label="Закрыть"
            className={currentTariffInfoCloseButtonStyles}
            onClick={onClose}
          >
            ×
          </button>
          <p
            id="current-tariff-info-title"
            className={currentTariffInfoTitleStyles}
          >
            Текущий тарифный план
          </p>
          <p className={currentTariffInfoTextStyles}>
            Ваш тарифный план «Индивидуальный» включает в себя следующие
            категории:
          </p>

          <ul className={currentTariffInfoListStyles}>
            {tariffItems.map((item) => (
              <li
                key={item.label}
                className={`${currentTariffInfoItemStyles} ${item.positive ? "text-[#45C857]" : "text-[#F45353]"}`}
              >
                <OptionIndicator type="radio" checked={false} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          <p className={currentTariffInfoFootnoteStyles}>
            Подробнее со всеми тарифными планами можно ознакомиться на странице
            «Тариф».
          </p>
        </div>
      </div>
    </div>
  );
}
