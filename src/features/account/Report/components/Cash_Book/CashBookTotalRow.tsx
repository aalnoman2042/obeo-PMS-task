import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, ReportTotals } from "../../pages/CashBook";

export const CashBookTotalRow: React.FC<{ totals: ReportTotals }> = ({ totals }) => {
    return (
        <TableRow className="border-t border-b border-gray-400 font-bold text-xs h-8 bg-gray-100">
            {/* SL (Empty) */}
            <TableCell className="px-4 py-1.5 text-center w-10 min-w-[40px] border-l border-gray-200"></TableCell>
            {/* Particulars - Total */}
            <TableCell className="px-4 py-1.5 text-right w-64 min-w-[250px] font-bold border-l border-gray-200 uppercase">
                Total
            </TableCell>
            {/* Debit Total */}
            <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px] border-l border-gray-200">
                {formatCurrency(totals.totalDebit)}
            </TableCell>
            {/* Credit Total */}
            <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px] border-l border-gray-200">
                {formatCurrency(totals.totalCredit)}
            </TableCell>
            {/* Closing Balance (The final running balance) */}
            <TableCell className="px-4 py-1.5 text-right w-28 min-w-[120px] border-l border-gray-200">
                {formatCurrency(totals.closingBalance)}
            </TableCell>
            {/* Remark (Empty) */}
            <TableCell className="px-4 py-1.5 text-left w-20 min-w-[80px] border-l border-r border-gray-200"></TableCell>
        </TableRow>
    );
};