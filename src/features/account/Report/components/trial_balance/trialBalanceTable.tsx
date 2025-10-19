
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';


type BalanceType = 'DR' | 'CR' | null;

interface CalculatedEntry {
  id: string;
  code: string | null;
  accountName: string;
  openingBalance: number;
  debit: number;
  credit: number;
  closingBalance: number;
  closingBalanceType: BalanceType;
}

interface ReportTotals {
  totalOpeningBalance: number;
  totalDebit: number;
  totalCredit: number;
  totalClosingBalance: number;
  closingBalanceType: BalanceType;
}

const formatCurrency = (amount: number): string => {
  if (amount === 0) return '0.00';
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};



const TrialBalanceDataRow: React.FC<{ entry: CalculatedEntry }> = ({ entry }) => {
  const closingBalanceDisplay = entry.closingBalance > 0
    ? `${formatCurrency(entry.closingBalance)} ${entry.closingBalanceType}`
    : formatCurrency(entry.closingBalance);

  const codeDisplay = entry.code && (
    <span className="text-blue-600 hover:underline cursor-pointer">{entry.code}</span>
  );

  return (
    <TableRow className="h-6">
      <TableCell className="px-4 py-1.5 text-left font-normal w-20 min-w-[80px]">{codeDisplay}</TableCell>
      <TableCell className="px-4 py-1.5 text-left w-64 min-w-[256px]">{entry.accountName}</TableCell>
      <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px]">{formatCurrency(entry.openingBalance)}</TableCell>
      <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px]">{formatCurrency(entry.debit)}</TableCell>
      <TableCell className="px-4 py-1.5 text-right w-24 min-w-[96px]">{formatCurrency(entry.credit)}</TableCell>
      <TableCell className="px-4 py-1.5 text-right font-semibold w-24 min-w-[120px]">{closingBalanceDisplay}</TableCell>
    </TableRow>
  );
};



const TrialBalanceTotalRows: React.FC<{ totals: ReportTotals }> = ({ totals }) => {
    return (
        <>
            {/* 1. Transaction Total Row */}
            <TableRow className="border-t border-b border-gray-400 font-semibold text-xs h-6">
                <TableCell colSpan={2} className="px-4 py-1.5 text-right font-semibold">
                    Total
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalOpeningBalance)}
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalDebit)}
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalCredit)}
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {/* Empty cell to match image layout */}
                </TableCell>
            </TableRow>
            {/* 2. Final Balancing Row (Note: this is the second set of totals shown in the image) */}
            <TableRow className="border-b-2 border-b-black font-semibold text-xs h-6">
                <TableCell colSpan={3} className="px-4 py-1.5 text-right"></TableCell> {/* Empty cells */}
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalDebit)}
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalCredit)}
                </TableCell>
                <TableCell className="px-4 py-1.5 text-right">
                    {formatCurrency(totals.totalClosingBalance)} {totals.closingBalanceType}
                </TableCell>
            </TableRow>
        </>
    );
};


export const TrialBalanceTable: React.FC<{ calculatedData: CalculatedEntry[], totals: ReportTotals }> = ({ calculatedData, totals }) => {
    return (
        <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-transparent h-12">
                <TableHead className="w-[15%] min-w-[80px] text-left">Code</TableHead>
                <TableHead className="w-[35%] min-w-[256px] text-left">Account Name</TableHead>
                <TableHead className="w-[15%] min-w-[96px] text-right">Opening Balance</TableHead>
                <TableHead className="w-[15%] min-w-[96px] text-right">Debit</TableHead>
                <TableHead className="w-[10%] min-w-[96px] text-right">Credit</TableHead>
                <TableHead className="w-[10%] min-w-[120px] text-right">Closing Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculatedData.map((entry) => (
                <TrialBalanceDataRow key={entry.id} entry={entry} />
              ))}
              <TrialBalanceTotalRows totals={totals} />
            </TableBody>
        </Table>
    );
};