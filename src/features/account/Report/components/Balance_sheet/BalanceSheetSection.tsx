/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RecursiveRenderer } from "./RecursiveRenderer";


interface SectionProps {
  groupName: 'ASSETS' | 'LIABILITIES' | 'EQUITY';
  data: any;
  grandTotal: number;
}

// Utility: Currency Formatter
const formatCurrency = (amount: number): string => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const BalanceSheetSection: React.FC<SectionProps> = ({ groupName, data, grandTotal }) => {
  const sectionsKey = groupName.toLowerCase();
  const sections = data?.[sectionsKey];

  // Check if sections exist and have any data
  if (!sections || sections.length === 0) {
    return (
      <div className="w-full mt-6 text-center text-gray-500 font-semibold">
        Data not available for {groupName}
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-300 hover:bg-gray-300/90 border-t-2 border-b-2">
            <TableHead className=" text-center font-extrabold text-gray-900">{groupName}</TableHead>
            <TableHead className="text-right font-extrabold text-gray-900">{formatCurrency(grandTotal)} DE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RecursiveRenderer sections={sections} level={0} />

          <TableRow className="font-extrabold bg-blue-50 border-t-2 border-b-4 border-blue-200">
            <TableCell className="py-2.5  text-base">
              TOTAL {groupName}
            </TableCell>
            <TableCell className="text-right py-2.5 text-base">
              {formatCurrency(grandTotal)} DE
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
