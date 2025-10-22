import { TableCell, TableRow } from "@/components/ui/table";
import { CalculatedEntry, formatCurrency} from "../../pages/CashBook";





export const CashBookDataRow: React.FC<{ entry: CalculatedEntry }> = ({ entry }) => {
    const isOpeningRow = entry.isOpening;
    
    // Date content
    const particularsContent = isOpeningRow 
        ? entry.particulars 
        : `${entry.particulars} (Voucher No: ${entry.voucherNo})`;

    return (
        <TableRow className={`h-6 ${isOpeningRow ? 'bg-gray-50' : ''}`}>
            {/* SL */}
            <TableCell className="px-4 py-1.5 text-center w-10 min-w-[40px] border-l border-gray-200">
                {isOpeningRow ? '1' : entry.sl} 
            </TableCell>
            {/* Date */}
            <TableCell className="px-4 py-1.5 text-left w-64 min-w-[250px] font-normal border-l border-gray-200">
                <div className="flex flex-col">
                    <span className='text-xs font-semibold'>{entry.date}</span>
                    <span className='text-[11px] text-gray-600'>{particularsContent}</span>
                </div>
            </TableCell>
            {/* Debit */}
            <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px] border-l border-gray-200">
                {!isOpeningRow && entry.debit > 0 ? formatCurrency(entry.debit) : ''}
            </TableCell>
            {/* Credit */}
            <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px] border-l border-gray-200">
                {!isOpeningRow && entry.credit > 0 ? formatCurrency(entry.credit) : ''}
            </TableCell>
            {/* Balance */}
            <TableCell className="px-4 py-1.5 text-right w-28 min-w-[120px] font-semibold border-l border-gray-200">
                {formatCurrency(entry.runningBalance)}
            </TableCell>
            {/* Remark */}
            <TableCell className="px-4 py-1.5 text-left w-20 min-w-[80px] border-l border-r border-gray-200">
                {entry.remark || ''}
            </TableCell>
        </TableRow>
    );
};