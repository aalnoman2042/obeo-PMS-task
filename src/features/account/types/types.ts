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
  date: string;
  totalAmount: string;
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