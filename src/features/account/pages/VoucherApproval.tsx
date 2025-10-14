import React from 'react';
import VoucherList from '../Components/voucher_approval/VoucherList';
import { contraVoucher, CVoucher, DVoucher, VoucherItem } from '../types/types';


// Sample Data
const journalData: VoucherItem[] = [
    { id: '2023/07/21-JV-5 (Purchase)', date: '2023-07-21', amount: 5000 },
    { id: '2023/07/21-JV-4 (Sales)', date: '2023-07-21', amount: 3200 },
    { id: '2023/07/21-JV-3 (Expense)', date: '2023-07-21', amount: 1500 },
    { id: '2023/07/20-JV-2 (Asset)', date: '2023-07-20', amount: 8000 },
    { id: '2023/07/20-JV-1 (Income)', date: '2023-07-20', amount: 2500 },
    { id: '2023/07/19-JV-1 (Other)', date: '2023-07-19', amount: 1000 },
    // Anek data thakte pare...
];
const DebitVoucher: DVoucher[] = [
  { id: 'DV001', date: '2025-10-01', accountName: 'Office Supplies', amount: 1500 },
  { id: 'DV002', date: '2025-10-02', accountName: 'Marketing Expense', amount: 5000 },
  { id: 'DV003', date: '2025-10-03', accountName: 'Utilities', amount: 12000 },
  { id: 'DV004', date: '2025-10-04', accountName: 'Office Rent', amount: 25000 },
  { id: 'DV005', date: '2025-10-04', accountName: 'Office Rent', amount: 25000 },
];
const CreditVoucher: CVoucher[] = [
//   { id: 'CV001', date: '2025-09-23', amount: 10000, status: 'Paid' },
//   { id: 'CV002', date: '2025-09-24', amount: 2500, status: 'Pending' },
//   { id: 'CV003', date: '2025-09-25', amount: 5000, status: 'Paid' },
];
const ContraVoucher : contraVoucher[] = [
   { id: "CV001", date: "2025-10-01", amount: 1500 },
   { id: "CV002", date: "2025-10-02", amount: 5000 },
   // ... other vouchers
]

const VoucherApproval: React.FC = () => {
    // const emptyData: VoucherItem[] = [];
    const columns = [
        { key: 'id', header: 'Voucher Id' },
        // { key: 'date', header: 'Date' },
        // { key: 'amount', header: 'Amount' },
    ];

    return (
        <div className="p-8 bg-background">
            {/* 1. Debit Voucher List */}
            <VoucherList 
                title="Debit Voucher List" 
                data={DebitVoucher} 
                columns={columns} 
            />
            
            {/* 2. Credit Voucher List */}
            <VoucherList 
                title="Credit Voucher List" 
                data={CreditVoucher} 
                columns={columns} 
            />
            {/* 3. contra */}
            <VoucherList 
                title="Contra Voucher List" 
                data={ContraVoucher} 
                columns={columns} 
            />

            {/* 4. Journal Voucher List  */}
            <VoucherList 
                title="Journal Voucher List" 
                data={journalData} 
                columns={columns} 
            />
        </div>
    );
};

export default VoucherApproval;