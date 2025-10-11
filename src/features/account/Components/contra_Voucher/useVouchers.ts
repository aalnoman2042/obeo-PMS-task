// src/features/vouchers/hooks/useVouchers.ts
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { contraFilterFormData, contraNewVoucherFormData, contraVoucher } from "../../types/types";
// import { contraVoucher, contraFilterFormData, contraNewVoucherFormData } from "../types/types";

// The initial data can be passed in or fetched from an API here
const initialVouchers: contraVoucher[] = [
   { id: "CV001", date: "2025-10-01", amount: 1500 },
   { id: "CV002", date: "2025-10-02", amount: 5000 },
   // ... other vouchers
];

export const useVouchers = () => {
   const [vouchers, setVouchers] = useState<contraVoucher[]>(initialVouchers);
   const [filterValues, setFilterValues] = useState<Partial<contraFilterFormData>>({});

   const filteredVouchers = useMemo(() => {
      return vouchers.filter((voucher) => {
         const voucherIdMatch = filterValues.voucherId
  ? voucher.id.toLowerCase().includes(filterValues.voucherId.toLowerCase())
  : true;

         const amountMatch = filterValues.amount
  ? voucher.amount.toString().includes(filterValues.amount.toString())
  : true;

         const dateMatch = filterValues.date
  ? voucher.date === format(filterValues.date, "yyyy-MM-dd")
  : true;

         return voucherIdMatch && amountMatch && dateMatch;
      });
   }, [vouchers, filterValues]);

   const addVoucher = (data: contraNewVoucherFormData) => {
      const newVoucher: contraVoucher = {
         id: data.id,
         amount: Number(data.amount),
         date: format(data.date, "yyyy-MM-dd"),
      };
      setVouchers([newVoucher, ...vouchers]);
   };
  
  // The hook returns the state and functions the component will need
   return {
      vouchers: filteredVouchers,
      setFilterValues,
      addVoucher,
   };
};