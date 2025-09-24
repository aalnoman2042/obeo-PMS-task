import App from "@/App";
import FinanceYear from "@/features/account/pages/FinanceYear";
import OpeningBalance from "@/features/account/pages/OpeningBalance";

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
        
    }
    

  
])