export interface reciveORpay {
  recivable: number;
  Payable: number;
}

export interface InfoCardProps {
  title: string;
  description: string;
  data: { name: string; amount: number }[]; // Array of objects, each with a name and amount
  color: string;
}

export interface OpeningBalanceFormData {
  headOfAccount: string;
  date: Date; 
  totalAmount: number; 
  remark: string;
}

export interface FinanceYearFormData {
  title: string;
  fromDate: string;
  toDate: string;
  status: 'Active' | 'Inactive';
}

export interface CVoucher {
  id: string;
  date: string;
  amount: number;
  status?: 'Paid' | 'Pending'; // Using a union type for status
}
export interface DVoucher {
  id: string;
  date: string;
  accountName: string;
  amount: number;
}
export interface contraVoucher {
  id: string;
  date: string;
  amount: number;
}

export interface contraFilterFormData {
  voucherId: string;
  amount: number | string;
  date: Date | undefined;
}

export interface contraNewVoucherFormData {
  id: string;
  amount: number;
  date: Date; // Use Date object for React Hook Form
}

export interface journalVoucher {
  id: string;
  date: string;
  amount: number;
}

export interface JournalFilterFormData {
  voucherId: string;
  amount: number | string;
  date: Date | undefined;
}
export interface JournalNewVoucherFormData {
  id: string;
  amount: number;
  date: Date; // Use Date object for React Hook Form
}


export interface VoucherItem {
    id: string; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allows for dynamic properties like date, amount, etc.
}

export interface VoucherListProps {
    title: string;
    data: VoucherItem[];
    columns: {
        key: keyof VoucherItem | string; 
        header: string; 
    }[];
}
// baalnce sheet

// src/types.ts

// Base item with Name and Amount
export interface AccountItem {
  name: string;
  amount: number;
  total?: number; // Optional total for nested sections (we'll ignore this for calculation)
}

// Recursive structure for Sections/SubSections
export interface ReportSection {
  title: string;
  items?: AccountItem[];
  subSections?: ReportSection[]; // Recursion happens here
}

// Main structure for Assets, Liabilities, or Equity
export interface GroupData {
  from: string;
  to: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Use a more flexible key for 'assets', 'liabilities', etc.
  totalAssets?: number;
  totalLiabilities?: number;
  totalEquity?: number;
}