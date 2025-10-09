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

export interface Voucher {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending'; // Using a union type for status
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