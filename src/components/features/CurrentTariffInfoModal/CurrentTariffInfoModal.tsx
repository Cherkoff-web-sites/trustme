import { useBodyScrollLock } from "../../../lib/useBodyScrollLock";
import {
  currentTariffInfoFootnoteStyles,
  currentTariffInfoItemStyles,
  currentTariffInfoListStyles,
  currentTariffInfoOverlayInnerStyles,
  currentTariffInfoOverlayOuterStyles,
  currentTariffInfoPanelStyles,
  currentTariffInfoTextStyles,
} from "./CurrentTariffInfoModal.styles";

function CrossIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M9.52997 8.10115L15.9064 1.73488C16.0969 1.54429 16.204 1.2858 16.204 1.01627C16.204 0.746736 16.0969 0.488245 15.9064 0.297658C15.7158 0.107071 15.4573 0 15.1878 0C14.9182 0 14.6597 0.107071 14.4691 0.297658L8.10287 6.67405L1.7366 0.297658C1.54602 0.107071 1.28753 2.39301e-07 1.01799 2.4131e-07C0.748464 2.43318e-07 0.489972 0.107071 0.299385 0.297658C0.108798 0.488245 0.00172754 0.746736 0.00172754 1.01627C0.00172753 1.2858 0.108798 1.54429 0.299385 1.73488L6.67578 8.10115L0.299385 14.4674C0.20452 14.5615 0.129224 14.6734 0.0778397 14.7968C0.0264554 14.9201 0 15.0524 0 15.186C0 15.3196 0.0264554 15.4519 0.0778397 15.5753C0.129224 15.6986 0.20452 15.8105 0.299385 15.9046C0.393475 15.9995 0.505417 16.0748 0.628754 16.1262C0.752091 16.1776 0.884382 16.204 1.01799 16.204C1.15161 16.204 1.2839 16.1776 1.40723 16.1262C1.53057 16.0748 1.64251 15.9995 1.7366 15.9046L8.10287 9.52824L14.4691 15.9046C14.5632 15.9995 14.6752 16.0748 14.7985 16.1262C14.9218 16.1776 15.0541 16.204 15.1878 16.204C15.3214 16.204 15.4537 16.1776 15.577 16.1262C15.7003 16.0748 15.8123 15.9995 15.9064 15.9046C16.0012 15.8105 16.0765 15.6986 16.1279 15.5753C16.1793 15.4519 16.2057 15.3196 16.2057 15.186C16.2057 15.0524 16.1793 14.9201 16.1279 14.7968C16.0765 14.6734 16.0012 14.5615 15.9064 14.4674L9.52997 8.10115Z"
        fill="#EB4335"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M6.59585 10.9443L17.166 0.374165C17.4155 0.124722 17.7065 0 18.0391 0C18.3717 0 18.6627 0.124722 18.9121 0.374165C19.1616 0.623608 19.2863 0.92003 19.2863 1.26343C19.2863 1.60683 19.1616 1.90284 18.9121 2.15145L7.4689 13.6258C7.21946 13.8753 6.92844 14 6.59585 14C6.26326 14 5.97225 13.8753 5.7228 13.6258L0.359774 8.26281C0.110331 8.01336 -0.00940209 7.71736 0.000575638 7.37479C0.0105534 7.03222 0.140679 6.7358 0.390954 6.48552C0.641229 6.23525 0.937651 6.11053 1.28022 6.11136C1.62279 6.11219 1.91879 6.23691 2.16824 6.48552L6.59585 10.9443Z"
        fill="#34A853"
      />
    </svg>
  );
}

export interface CurrentTariffInfoModalProps {
  open: boolean;
  onClose: () => void;
  tariffLabel?: string;
  items?: Array<{ label: string; positive: boolean }>;
}

export function CurrentTariffInfoModal({
  open,
  onClose,
  tariffLabel = 'Индивидуальный',
  items = [
    { label: 'Упоминания в Telegram', positive: false },
    { label: 'Упоминания в СМИ', positive: false },
    { label: 'Все факторы проверок', positive: true },
  ],
}: CurrentTariffInfoModalProps) {
  useBodyScrollLock(open);
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
          aria-label="Показ тарифа"
        >
          <p className={currentTariffInfoTextStyles}>
            Ваш тарифный план «{tariffLabel}» включает в себя следующие
            категории:
          </p>

          <ul className={currentTariffInfoListStyles}>
            {items.map((item) => (
              <li
                key={item.label}
                className={`${currentTariffInfoItemStyles} ${item.positive ? "text-[#45C857]" : "text-[#F45353]"}`}
              >
                {item.positive ? <CheckIcon /> : <CrossIcon />}
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
