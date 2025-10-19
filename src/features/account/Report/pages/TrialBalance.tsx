
import React, { useMemo } from 'react';

import { TrialBalanceTable } from '../components/trial_balance/trialBalanceTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { Card } from '@/components/ui/card';


type BalanceType = 'DR' | 'CR' | null;

interface TrialBalanceEntry {
  id: string;
  code: string | null;
  accountName: string;
  openingBalance: number;
  debit: number;
  credit: number;
}

interface CalculatedEntry extends TrialBalanceEntry {
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

const DUMMY_DATA: TrialBalanceEntry[] = [
  { id: '1', code: '10101001', accountName: 'Pubali Bank PLC', openingBalance: 0.00, debit: 20000.00, credit: 0.00 },
  { id: '2', code: null, accountName: 'Profit Loss', openingBalance: 0.00, debit: 0.00, credit: 20000.00 },
];



const calculateReportData = (data: TrialBalanceEntry[]) => {
  let totalDebit = 0;
  let totalCredit = 0;
  let totalOpeningBalance = 0;
  let netClosingBalanceValue = 0;
  const calculatedData: CalculatedEntry[] = [];

  for (const entry of data) {
    const closingBalanceValue = entry.openingBalance + entry.debit - entry.credit;

    // eslint-disable-next-line prefer-const
    let closingBalance: number = Math.abs(closingBalanceValue);
    let closingBalanceType: BalanceType = null;

    if (closingBalanceValue > 0) {
      closingBalanceType = 'DR';
    } else if (closingBalanceValue < 0) {
      closingBalanceType = 'CR';
    }

    totalOpeningBalance += entry.openingBalance;
    totalDebit += entry.debit;
    totalCredit += entry.credit;
    netClosingBalanceValue += closingBalanceValue; 

    calculatedData.push({ ...entry, closingBalance, closingBalanceType });
  }

  const closingBalanceType: BalanceType = netClosingBalanceValue >= 0 ? 'DR' : 'CR';

  const totals: ReportTotals = {
    totalOpeningBalance,
    totalDebit,
    totalCredit,
    totalClosingBalance: Math.abs(netClosingBalanceValue),
    closingBalanceType,
  };

  return { calculatedData, totals };
};



const TrialBalanceReport: React.FC = () => {
  const { calculatedData, totals } = useMemo(() => calculateReportData(DUMMY_DATA), []);

  const handlePrint = () => window.print();
  const handleBack = () => console.log("Navigating Back...");

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-8 font-sans">
      <div className=" mx-auto border-b-2 border-b-gray-400"> 
        
        {/* Top Header/Bar */}
        <header className="flex justify-between items-center px-4 py-3 bg-white border border-b-0 rounded-t-lg">
          <h1 className="text-xl font-normal text-gray-700">Trial Balance</h1>
          <div className="flex space-x-2 print:hidden"> 
            <Button variant="outline" onClick={handlePrint} className="text-xs py-1.5 px-2">
              <Printer className="mr-1" />
              Print
            </Button>
            <Button onClick={handleBack} className="bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 px-2 border-none">
              <ArrowLeft className="mr-1" />
              Back
            </Button>
          </div>
        </header>

       
        <Card className="p-0 rounded-t-none border-t-0 border-b-0">
          
          {/* Report Title */}
          <div className="text-center pt-6 pb-4 bg-white">
            <h2 className="text-base font-semibold text-gray-900">Trial Balance With Opening As On</h2>
            <p className="text-sm text-gray-600">
              2024-07-01 to 2025-08-18
            </p>
          </div>

          {/* Core Table Component with horizontal scroll overflow */}
          <TrialBalanceTable calculatedData={calculatedData} totals={totals} />

          {/* Report Footer */}
          <div className="w-full px-4 pb-4">
              <div className="flex justify-between text-xs mt-10 pt-4 border-t border-gray-400">
                  <div className="text-gray-600">Prepared By</div>
                  <div className="text-gray-600">Accounts</div>
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrialBalanceReport;