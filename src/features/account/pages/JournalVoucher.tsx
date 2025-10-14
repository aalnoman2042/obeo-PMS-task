
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { FaCalendarAlt, FaFilter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  JournalFilterFormData,
  JournalNewVoucherFormData,
  journalVoucher,
} from "../types/types";

// Initial sample data
const initialVouchers: journalVoucher[] = [
  // ... your initial data remains the same
  { id: "JV250917-003 (Night)", date: "2025-10-01", amount: 1500 },
  { id: "JV250917-002 (Night)", date: "2025-10-02", amount: 5000 },
  { id: "JV250917-001 (Night)", date: "2025-10-03", amount: 12000 },
  { id: "JV250916-002 (Night)", date: "2025-10-04", amount: 25000 },
  { id: "JV250916-001 (Night)", date: "2025-10-04", amount: 25000 },
  { id: "JV250915-002 (Night)", date: "2025-10-04", amount: 1000 },
  { id: "JV250914-001 (Night)", date: "2025-10-05", amount: 3000 },
  { id: "JV250915-005 (Night)", date: "2025-10-05", amount: 8500 },
  { id: "JV250915-004 (Night)", date: "2025-10-06", amount: 4200 },
  { id: "JV250914-003 (Night)", date: "2025-10-07", amount: 6700 },
  { id: "JV250917-010 (Night)", date: "2025-10-07", amount: 900 },
  { id: "JV250917-011 (Night)", date: "2025-10-08", amount: 1500 },
  { id: "JV250917-012 (Night)", date: "2025-10-08", amount: 5000 },
  { id: "JV250917-013 (Night)", date: "2025-10-09", amount: 12000 },
  { id: "JV250916-014 (Night)", date: "2025-10-09", amount: 25000 },
  { id: "JV250916-015 (Night)", date: "2025-10-10", amount: 25000 },
  { id: "JV250915-016 (Night)", date: "2025-10-10", amount: 1000 },
  { id: "JV250914-017 (Night)", date: "2025-10-10", amount: 3000 },
  { id: "JV250915-018 (Night)", date: "2025-10-11", amount: 8500 },
  { id: "JV250915-019 (Night)", date: "2025-10-11", amount: 4200 },
  { id: "JV250914-020 (Night)", date: "2025-10-12", amount: 6700 },
];

const JournalVoucher: React.FC = () => {
  const [vouchers, setVouchers] = useState<journalVoucher[]>(initialVouchers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    reset: resetFilter,
    watch: watchFilter,
    control: controlFilter,
  } = useForm<JournalFilterFormData>({
    defaultValues: {
      voucherId: "",
      amount: "",
      date: undefined,
    },
  });

  const {
    register: registerModal,
    handleSubmit: handleSubmitModal,
    reset: resetModal,
    control: controlModal,
    formState: { errors },
  } = useForm<JournalNewVoucherFormData>();

  const filterValues = watchFilter();

  // --- Filtering Logic (This part was correct) ---
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

  // --- Handlers ---
  const handleFilterSubmit = (data: JournalFilterFormData) => {
    console.log("Filter submitted:", data);
    setCurrentPage(1); // Reset to first page on new filter submission
  };

  const handleAddVoucher = (data: JournalNewVoucherFormData) => {
    const newVoucher: journalVoucher = {
      id: data.id,
      amount: Number(data.amount),
      date: format(data.date, "yyyy-MM-dd"),
    };
    setVouchers([newVoucher, ...vouchers]);
    setIsModalOpen(false);
    resetModal();
  };

  const handleClearFilter = () => {
    resetFilter();
    setCurrentPage(1);
  };
  
  const handleEntriesChange = (value: string) => {
    setEntriesPerPage(Number(value));
    setCurrentPage(1); // Reset to page 1 when entries per page changes
  };


  
  const totalPages = Math.ceil(filteredVouchers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedVouchers = filteredVouchers.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredVouchers.length, entriesPerPage]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DatePickerField = ({ control, name, placeholder }: any) => (
    
    <Controller
      control={control}
      name={name as string}
      rules={{ required: name === "date" && control === controlModal ? "Date is required" : false }}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal h-10", !field.value && "text-muted-foreground")}>
              <FaCalendarAlt className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "MM/dd/yyyy") : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    />
  );

  return (
    <div className="p-2 sm:p-4 bg-white min-h-screen">
      {/* ... Header and Title Sections ... */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 pb-4 border-b border-gray-200 gap-2">
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#17A2B8] text-white hover:bg-cyan-600 px-4 py-2 text-sm font-medium rounded-md shadow-sm w-full sm:w-auto">
          + Add Journal Voucher
        </Button>
        <div className="text-sm">Account <span className="text-gray-500 ml-1">/</span> <span className="text-[#17A2B8] font-medium">Journal Voucher</span></div>
      </div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-semibold">Journal Voucher List</h1>
        <Button variant="outline" className="flex items-center gap-2 border-[#17A2B8]  bg-[#17A2B8] text-white">
          <FaFilter /> <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleSubmitFilter(handleFilterSubmit)} className="border border-gray-300 p-3 mb-4 rounded-md bg-gray-50">
        {/* ... Form inputs ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col">
            <Label htmlFor="voucherId" className="text-sm font-medium text-gray-700 mb-1">Voucher Id</Label>
            <Input id="voucherId" type="text" placeholder="Type Your Voucher Id" {...registerFilter("voucherId")} className="h-10 border-gray-300"/>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-1">Amount</Label>
            <Input id="amount" type="text" placeholder="Type Your Amount" {...registerFilter("amount")} className="h-10 border-gray-300"/>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">Date</Label>
            <DatePickerField control={controlFilter} name="date" placeholder="mm/dd/yyyy"/>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600 px-4">Submit</Button>
          <Button type="button" variant="outline" onClick={handleClearFilter} className="border-gray-400 hover:bg-gray-100 px-4">Clear</Button>
        </div>
      </form>
      
      {/* Entries per page */}
      <div className="flex justify-start items-center mb-4 mt-8">
        <span className="text-sm text-gray-700 mr-2">Show</span>
        <Select onValueChange={handleEntriesChange} defaultValue={String(entriesPerPage)}>
          <SelectTrigger className="w-[80px] h-8 text-sm"><SelectValue placeholder="10" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-700 ml-2">entries</span>
      </div>

      {/* Voucher Table */}
      <div className="rounded-md border border-gray-300 overflow-x-auto">
        <Table className="min-w-[400px]">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold text-gray-700 whitespace-nowrap">Voucher Id</TableHead>
  
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVouchers.length > 0 ? (
              paginatedVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-medium whitespace-nowrap">{voucher.id}</TableCell>
                   
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-gray-500">
                  No data available in table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination  */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          {/* Step 3: Ensure this text uses the filtered list's length */}
          Showing {filteredVouchers.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredVouchers.length)} of {filteredVouchers.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm font-medium px-2">Page <span className="bg-cyan-600 text-white p-1 rounded-lg">{currentPage}</span> of {totalPages > 0 ? totalPages : 1}</span>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
            Next
          </Button>
        </div>
      </div>

      {/* Add Voucher Modal */}
      {isModalOpen && (
        // ... Modal code remains the same
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md z-50">
              <h2 className="text-xl font-semibold mb-4 text-[#17A2B8]">Add New Journal Voucher</h2>
              <form onSubmit={handleSubmitModal(handleAddVoucher)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="modal-id" className="block text-sm font-medium text-gray-700 mb-1">Voucher ID</Label>
                    <Input id="modal-id" type="text" {...registerModal("id", { required: "Voucher ID is required", })} className="h-10 border-gray-300"/>
                    {errors.id && (<p className="text-red-500 text-xs mt-1">{errors.id.message}</p>)}
                  </div>
                  <div>
                    <Label htmlFor="modal-amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</Label>
                    <Input id="modal-amount" type="text" step="0.01" {...registerModal("amount", { required: "Amount is required", valueAsNumber: true, })} className="h-10 border-gray-300"/>
                    {errors.amount && (<p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>)}
                  </div>
                  <div>
                    <Label htmlFor="modal-date" className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
                    <DatePickerField control={controlModal} name="date" placeholder="Pick a date"/>
                    {errors.date && (<p className="text-red-500 text-xs mt-1">Date is required</p>)}
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="border-gray-400 hover:bg-gray-100">Cancel</Button>
                  <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">Save Voucher</Button>
                </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
};

export default JournalVoucher;