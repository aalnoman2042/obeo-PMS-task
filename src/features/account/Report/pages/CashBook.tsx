import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Printer } from "lucide-react";
import React, { useMemo } from "react";
import { CashBookDataRow } from "../components/Cash_Book/CashBookDataRow";
import { CashBookTotalRow } from "../components/Cash_Book/CashBookTotalRow";

export interface CashBookEntry {
  sl: number;
  date: string;
  particulars: string;
  voucherNo: string | null;
  debit: number;
  credit: number;
  isOpening: boolean;
  isTotal: boolean;
  remark: string | null;
}

export interface CalculatedEntry extends CashBookEntry {
  runningBalance: number;
}

export interface ReportTotals {
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
}

const DUMMY_DATA: CashBookEntry[] = [
  {
    sl: 1,
    date: "2025-08-18",
    particulars: "Opening Balance on 2025-08-18",
    voucherNo: null,
    debit: 0,
    credit: 0,
    isOpening: true,
    isTotal: false,
    remark: null,
  },
  {
    sl: 2,
    date: "2025-08-18",
    particulars: "Cash Received from Customer A",
    voucherNo: "V-0001",
    debit: 5000.0,
    credit: 0.0,
    isOpening: false,
    isTotal: false,
    remark: "Sale",
  },
  {
    sl: 3,
    date: "2025-08-18",
    particulars: "Office Supplies Purchased",
    voucherNo: "V-0002",
    debit: 0.0,
    credit: 1500.0,
    isOpening: false,
    isTotal: false,
    remark: "Expense",
  },
];

const calculateReportData = (data: CashBookEntry[]) => {
  let runningBalance = 0;
  let totalDebit = 0;
  let totalCredit = 0;
  const calculatedData: CalculatedEntry[] = [];

  for (const entry of data) {
    if (entry.isOpening) {
      runningBalance = 0;
    } else {
      runningBalance += entry.debit - entry.credit;
      totalDebit += entry.debit;
      totalCredit += entry.credit;
    }
    calculatedData.push({ ...entry, runningBalance });
  }

  const totals: ReportTotals = {
    totalDebit,
    totalCredit,
    closingBalance: runningBalance,
  };

  return { calculatedData, totals };
};

// eslint-disable-next-line react-refresh/only-export-components
export const formatCurrency = (
  amount: number,
  suffix: string = "৳"
): string => {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${suffix}`;
};

// --- MAIN CASH BOOK COMPONENT ---

const CashBook: React.FC = () => {
  const { calculatedData, totals } = useMemo(
    () => calculateReportData(DUMMY_DATA),
    []
  );

  const handlePrint = () => window.print();
  const handleBack = () => console.log("Navigating Back...");

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-8 font-sans">
      <div className="mx-auto border-b-2 border-b-gray-400">
        {/* Top Header/Bar */}
        <header className="flex justify-between items-center px-4 py-3 bg-white border border-b-0 rounded-t-lg">
          <h1 className="text-xl font-normal text-gray-700">Cash Book</h1>
          <div className="flex space-x-2 print:hidden">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="h-9 px-4 text-xs font-medium text-cyan-600 bg-white border border-cyan-400 hover:bg-cyan-50/50 shadow-sm"
            >
              <Printer className="mr-1" />
              Print
            </Button>
            <Button
              onClick={handleBack}
              className="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-2 border-none"
            >
              <ArrowLeft className="mr-1" />
              Back
            </Button>
          </div>
        </header>

        {/* Report Body Container */}
        <Card className="p-0 rounded-t-none border-t-0 border-b-0">
          {/* Report Title */}
          <div className="text-center pt-6 pb-4 bg-white">
            <h2 className="text-base font-semibold text-gray-900">
              Cash Book Of Cash
            </h2>
            <p className="text-sm text-gray-600">on 2025-08-18 To 2025-08-18</p>
          </div>

          {/* Table Container (Shadcn Table component ensures proper structure) */}
          <div className="relative w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent h-10 border-t border-b border-gray-400">
                  <TableHead className="w-[5%] min-w-[40px] text-center border-l border-gray-400">
                    SL
                  </TableHead>
                  <TableHead className="w-[30%] min-w-[250px] text-left border-l border-gray-400">
                    Date
                  </TableHead>
                  <TableHead className="w-[15%] min-w-[96px] text-right border-l border-gray-400">
                    Debit
                  </TableHead>
                  <TableHead className="w-[15%] min-w-[96px] text-right border-l border-gray-400">
                    Credit
                  </TableHead>
                  <TableHead className="w-[20%] min-w-[120px] text-right border-l border-gray-400">
                    Balance
                  </TableHead>
                  <TableHead className="w-[15%] min-w-[80px] text-left border-l border-r border-gray-400">
                    Remark
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Data Rows */}
                {calculatedData.map((entry) => (
                  <CashBookDataRow key={entry.sl} entry={entry} />
                ))}

                {/* Total Row */}
                <CashBookTotalRow totals={totals} />
              </TableBody>
            </Table>
          </div>

          {/* Report Footer */}
        </Card>
      </div>
    </div>
  );
};

export default CashBook;
