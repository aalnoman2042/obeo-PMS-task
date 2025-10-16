import  { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';

import { format } from 'date-fns';
import { assets as assetsMock, liabilty as liabiltyMock, equity as equityMock } from '../../../app/balanceSheet/data';

import { ReportHeader } from '../Components/Balance_sheet/ReportHeader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { BalanceSheetSection } from '../Components/Balance_sheet/BalanceSheetSection';




// Safely formats a Date object to MM/dd/yyyy.
const toDisplayDate = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return 'N/A';
  }
  return format(date, 'MM/dd/yyyy');
};

// Placeholder functions for actions

const onFind = () => console.log("Finding report initiated.");
const onDateChange = (newDate: string) => console.log("Date changed to:", newDate);





export function BalanceSheetPage() {

  const totalAssets = assetsMock.totalAssets || 0;
  const totalLiabilities = liabiltyMock.totalLiabilities || 0;
  const totalEquity = equityMock.totalEquity || 0;
  

  const dateString = assetsMock.from && new Date(assetsMock.from).toString() !== 'Invalid Date' 
                     ? assetsMock.from 
                     : format(new Date(), 'yyyy-MM-dd');

  const [date, setDate] = useState<Date>(new Date(dateString));

  const handleSelectDate = useCallback((newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateChange(format(newDate, 'yyyy-MM-dd')); 
    }
  }, []); 

  return (
    <div className="p-8 mx-auto bg-white shadow-xl rounded-lg">
      
      
      <div className="mb-4 text-xs font-sans print:mb-0">
        
        {/* Balance Sheet Title and Print Button */}
        <div className="flex justify-between items-start text-sm text-gray-700 pb-2 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Balance Sheet</h1>

        </div>

        {/* Date Input and Find Button */}
          <span className="font-semibold text-gray-600">Report Date</span>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[150px] justify-start text-left font-normal h-9 text-xs",
                    isNaN(date.getTime()) && "text-muted-foreground"
                  )}
                >
                  
                  <span>{toDisplayDate(date)}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelectDate}
                  initialFocus
                  
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            onClick={onFind}
            className="h-9 px-4 text-xs font-medium text-cyan-600 bg-white border border-cyan-400 hover:bg-cyan-50/50 shadow-sm"
          >
            Find
          </Button>
        </div>
      </div>


      <ReportHeader fromDate={dateString} toDate={dateString} />

      {/* ASSETS SECTION */}
      <BalanceSheetSection
        groupName="ASSETS"
        data={assetsMock }
        grandTotal={totalAssets}
      />

      {/* LIABILITIES SECTION */}
      <BalanceSheetSection
        groupName="LIABILITIES"
        data={liabiltyMock}
        grandTotal={totalLiabilities}
      />

      {/* EQUITY SECTION */}
      <BalanceSheetSection
        groupName="EQUITY"
        data={equityMock}
        grandTotal={totalEquity}
      />


    </div>
  );
}
