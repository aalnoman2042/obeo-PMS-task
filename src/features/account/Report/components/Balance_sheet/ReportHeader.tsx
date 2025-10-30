import { Button } from "@/components/ui/button";

// src/components/ReportHeader.tsx
interface ReportHeaderProps {
  fromDate: string;
  toDate: string;
}
const onPrint = () => console.log("Printing initiated.");
export function ReportHeader({ fromDate, toDate }: ReportHeaderProps) {
  return (
    <div className="text-center mb-6 mt-">
      <div className="flex justify-between">
        <div>Balance Sheet Report</div>
        <div>
          <div className="items-center space-x-2 space-y-2 print:hidden">
          <div>
              <Button
              onClick={onPrint}
              className="bg-cyan-500 text-white hover:bg-cyan-600 shadow-sm text-xs h-8 px-3"
            >
              Print
            </Button>
          </div>
            <div>
              <span>{fromDate}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-800">Balance Sheet</h1>
      <h2 className="text-xl font-semibold text-gray-600 mt-1">
        Statement Period: {fromDate} to {toDate}
      </h2>
    </div>
  );
}
