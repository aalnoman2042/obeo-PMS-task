import App from "@/App";
import ContraVoucher from "@/features/account/pages/ContraVoucher";
import CreditVoucher from "@/features/account/pages/CreditVoucher";
import DebitVoucher from "@/features/account/pages/DebitVoucher";
import FinanceYear from "@/features/account/pages/FinanceYear";
import JournalVoucher from "@/features/account/pages/JournalVoucher";
import OpeningBalance from "@/features/account/pages/OpeningBalance";
import VoucherApproval from "@/features/account/pages/VoucherApproval";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
       {
        // element: <App></App>
        Component: App,
        path: "/",
        children:[
        ]
    },
    {
        
            Component: FinanceYear,
            path: "account/finance-year"
        
    },
    {
        
            Component: OpeningBalance,
            path: "account/opening-balance"
        
    },
    {
        
            Component: DebitVoucher,
            path: "account/debit-voucher"
        
    },
    {
        
            Component: CreditVoucher,
            path: "account/credit-voucher"
        
    },
    
    {
        
            Component:ContraVoucher ,
            path: "account/contra-voucher"
        
    },
    {
        
            Component:JournalVoucher ,
            path: "account/journal-voucher"
        
    },
    {
        
            Component:VoucherApproval ,
            path: "account/voucher-approval"
        
    },
    

  
])