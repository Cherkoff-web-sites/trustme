import { SourceBadge } from '../../ui';
import {
  transactionTableStyles,
  transactionTableWrapStyles,
} from './TransactionTable.styles';

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
      <table className={transactionTableStyles}>
        <thead className="text-[#FDFEFF]">
          <tr>
            <th className="pr-6 font-normal">Дата операции</th>
            <th className="pr-6 font-normal">Тип операции</th>
            <th className="pr-6 font-normal">Источник операции</th>
            <th className="font-normal">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr
              className="border-t border-white/10 text-[#FDFEFF]"
              key={`${operation.date}-${operation.type}-${operation.source}`}
            >
              <td className="pr-6 pt-3">{operation.date}</td>
              <td className={`pr-6 pt-3 ${operation.type === 'Списание' ? 'text-[#FF7A7A]' : 'text-[#77D877]'}`}>
                {operation.type}
              </td>
              <td className="pr-6 pt-3">
                <div className="flex items-center gap-2.5">
                  <SourceBadge source={operation.source} label size="sm" />
                </div>
              </td>
              <td className="pt-3">{operation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
