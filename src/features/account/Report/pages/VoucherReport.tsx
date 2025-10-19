/* eslint-disable react-refresh/only-export-components */
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Printer } from "lucide-react"

import { cn } from "@/lib/utils" // Utility function for conditional class names
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export interface Voucher {
  voucherNo: string;
  date: string; // MM/dd/yyyy format
  totalAmount: number;
  remarks: string;
}


export const dummyVouchers: Voucher[] = [
  { voucherNo: 'V-00101', date: '10/01/2025', totalAmount: 1500.50, remarks: 'Purchase of office supplies' },
  { voucherNo: 'V-00102', date: '10/05/2025', totalAmount: 3200.00, remarks: 'Monthly rent payment' },
  { voucherNo: 'V-00103', date: '10/18/2025', totalAmount: 75.25, remarks: 'Refreshments for meeting' },
  { voucherNo: 'V-00104', date: '10/22/2025', totalAmount: 980.00, remarks: 'Utility bill payment' },
  { voucherNo: 'V-00105', date: '10/25/2025', totalAmount: 500.00, remarks: 'Courier charges' },
];


export const columns: ColumnDef<Voucher>[] = [
  {
    accessorKey: "voucherNo",
    header: "Voucher No",
    cell: ({ row }) => (
      <div className="font-medium min-w-[100px]">{row.getValue("voucherNo")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right min-w-[120px]">Total Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT", // আপনার কারেন্সি অনুযায়ী পরিবর্তন করুন
      }).format(amount)

      return <div className="text-right font-medium min-w-[120px]">{formatted}</div>
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => <div className="min-w-[200px]">{row.getValue("remarks")}</div>,
  },
]


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function VoucherDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
  // responsive ness
    <div className="rounded-md border w-full overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}


export function VoucherReport() {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date("2025-10-01"))
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date("2025-10-31"))
  const [status, setStatus] = React.useState<string>("all")
  const [reportData, setReportData] = React.useState<Voucher[]>(dummyVouchers)
  
  const handleFind = () => {
    // handling Api here
   
    console.log("Searching with:", { 
      fromDate: fromDate ? format(fromDate, "yyyy-MM-dd") : null, 
      toDate: toDate ? format(toDate, "yyyy-MM-dd") : null, 
      status 
    });
    
    setReportData(dummyVouchers);
  }
  
  const handlePrint = () => {
    
    window.print();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8"> {/* Full Page Layout */}
      <Card className="w-full shadow-xl">
        <CardHeader className="border-b p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Voucher Report 
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          
          <div className="flex flex-wrap items-center gap-12 pb-4 mb-6">
            
            {/* From Date Picker */}
              <label className="text-sm text-center font-medium">From Date</label>
            <div className="flex flex-col space-y-1.5 min-w-[250px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "MM/dd/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* To Date Picker */}
              <label className="text-sm font-medium">To Date</label>
            <div className="flex flex-col space-y-1.5 min-w-[250px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "MM/dd/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Status Select */}
              <label className="text-sm font-medium">Status</label>
            <div className="flex flex-col space-y-1.5 min-w-[150px]">
              <Select onValueChange={setStatus} defaultValue={status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Voucher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Voucher</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Find Button */}
            <Button onClick={handleFind} className="h-9 px-4 text-xs font-medium text-cyan-600 bg-white border border-cyan-400 hover:bg-cyan-50/50 shadow-sm">
              Find
            </Button>
          </div>

          {/* প্রিন্ট বাটন এবং ডেটা টেবিল */}
          <div className="w-full">
            <div className="flex justify-end mb-4">
              <Button variant="outline" onClick={handlePrint} className="h-9 px-4 text-xs font-medium text-cyan-600 bg-white border border-cyan-400 hover:bg-cyan-50/50 shadow-sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>

            <VoucherDataTable columns={columns} data={reportData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}