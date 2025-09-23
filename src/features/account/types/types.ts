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