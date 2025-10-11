// src/features/vouchers/components/VoucherTable.tsx
import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { contraVoucher } from "../../types/types";


interface VoucherTableProps {
  vouchers: contraVoucher[];
}

export const VoucherTable: React.FC<VoucherTableProps> = ({ vouchers }) => {
  return (
    <div className="rounded-md border border-gray-300 overflow-x-auto">
      <Table className="min-w-[400px]">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Voucher Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.id}</TableCell>
                <TableCell>${voucher.amount.toFixed(2)}</TableCell>
                <TableCell>{format(new Date(voucher.date), "MM/dd/yyyy")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No data available in table
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};