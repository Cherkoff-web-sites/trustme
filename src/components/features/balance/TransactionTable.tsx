import telegramSvg from '../../../assets/icons/telegram.svg';
import websiteOnDashboardSvg from '../../../assets/icons/website_on_dashboard.svg';
import { combineStyles } from '../../../lib/combineStyles';
import { designTokens } from '../../ui';
import { transactionTableWrapStyles } from './TransactionTable.styles';

export interface TransactionRow {
  date: string;
  type: 'Поступление' | 'Списание';
  source: 'telegram' | 'web';
  amount: string;
}

export interface TransactionTableProps {
  operations: TransactionRow[];
}

export function TransactionTable({ operations }: TransactionTableProps) {
  return (
    <div className={transactionTableWrapStyles}>
      <table className="min-w-full border-collapse text-left">
        <thead className="text-[#FDFEFF]">
          <tr className="border-b border-white/10">
            <th className="py-[15px] pl-[30px] pr-6 text-[18px] font-semibold">Дата операции</th>
            <th className="py-[15px] pr-6 text-[18px] font-semibold">Тип операции</th>
            <th className="py-[15px] pr-6 text-[18px] font-semibold">Источник операции</th>
            <th className="py-[15px] pr-[30px] text-[18px] font-semibold">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation, index) => {
            const isLast = index === operations.length - 1;
            const rowPad = isLast ? 'pt-[15px] pb-0' : 'py-[15px]';
            const typeColorClass =
              operation.type === 'Списание'
                ? designTokens.colors.text.statusError
                : designTokens.colors.text.statusSuccess;

            return (
              <tr
                className={`text-[#FDFEFF] ${isLast ? '' : 'border-b border-white/10'}`}
                key={`${operation.date}-${operation.type}-${operation.source}`}
              >
                <td className={`${rowPad} pl-[30px] pr-6`}>{operation.date}</td>
                <td className={combineStyles(`${rowPad} pr-6`, typeColorClass)}>{operation.type}</td>
                <td className={`${rowPad} pr-6`}>
                  <div className="flex items-center gap-[10px] text-[16px] leading-[1.2] text-[#FDFEFF] lg:text-[18px]">
                    {operation.source === 'telegram' ? (
                      <img src={telegramSvg} alt="" className="h-[22px] w-[22px]" width={22} height={22} />
                    ) : (
                      <img
                        src={websiteOnDashboardSvg}
                        alt=""
                        className="h-[22px] w-[22px]"
                        width={22}
                        height={22}
                      />
                    )}
                    <span>{operation.source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span>
                  </div>
                </td>
                <td className={`${rowPad} pr-[30px]`}>{operation.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
