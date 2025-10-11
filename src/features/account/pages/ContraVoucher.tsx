
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, useEffect, useMemo } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { format } from "date-fns";
// import { FaCalendarAlt, FaFilter } from "react-icons/fa";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { Label } from "@/components/ui/label";
// import {
//   contraFilterFormData,
//   contraNewVoucherFormData,
//   contraVoucher,
// } from "../types/types";

// // Initial sample data
// const initialVouchers: contraVoucher[] = [
//   { id: "CV001", date: "2025-10-01", amount: 1500 },
//   { id: "CV002", date: "2025-10-02", amount: 5000 },
//   { id: "CV003", date: "2025-10-03", amount: 12000 },
//   { id: "CV004", date: "2025-10-04", amount: 25000 },
//   { id: "CV005", date: "2025-10-04", amount: 25000 },
// ];

// const ContraVoucher: React.FC = () => {
//   const [vouchers, setVouchers] = useState<contraVoucher[]>(initialVouchers);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10); 

  
//   const {
//     register: registerFilter,
//     handleSubmit: handleSubmitFilter,
//     reset: resetFilter,
//     watch: watchFilter,
//     setValue: setValueFilter,
//     control: controlFilter,
//   } = useForm<contraFilterFormData>({
//     defaultValues: {
//       voucherId: "",
//       amount: "",
//       date: undefined,
//     },
//   });

//   // React Hook Form for the modal
//   const {
//     register: registerModal,
//     handleSubmit: handleSubmitModal,
//     reset: resetModal,
//     control: controlModal,
//     formState: { errors },
//   } = useForm<contraNewVoucherFormData>();

  
//   const filterValues = watchFilter();

//   // --- Filtering Logic ---
//   const filteredVouchers = useMemo(() => {
//     return vouchers.filter((voucher) => {
//       const voucherIdMatch = filterValues.voucherId
//         ? voucher.id
//             .toLowerCase()
//             .includes(filterValues.voucherId.toLowerCase())
//         : true;

//       const amountMatch = filterValues.amount
//         ? voucher.amount.toString().includes(filterValues.amount.toString())
//         : true;

//       const dateMatch = filterValues.date
//         ? voucher.date === format(filterValues.date, "yyyy-MM-dd")
//         : true;

//       return voucherIdMatch && amountMatch && dateMatch;
//     });
//   }, [vouchers, filterValues]);

//   // --- Handlers ---
//   const handleFilterSubmit = (data: contraFilterFormData) => {
//     console.log("Filter submitted:", data);
//   };

//   const handleAddVoucher = (data: contraNewVoucherFormData) => {
//     const newVoucher: contraVoucher = {
//       id: data.id,
//       amount: Number(data.amount),
//       // Format the Date object back to the string format used in the array
//       date: format(data.date, "yyyy-MM-dd"),
//     };
//     setVouchers([newVoucher, ...vouchers]);
//     setIsModalOpen(false);
//     resetModal();
//   };

//   const handleClearFilter = () => {
//     resetFilter();
//   };

//   const handleEntriesChange = (value: string) => {
//     setEntriesPerPage(Number(value));
//     // Reset pagination to page 1 if you were tracking pages
//   };

//   const paginatedVouchers = filteredVouchers.slice(0, entriesPerPage);


 
//   const DatePickerField = ({
//     control,
//     name,
//     placeholder,
//   }: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     control: any;
//     name: keyof contraNewVoucherFormData | keyof contraFilterFormData;
//     placeholder: string;
//   }) => (
//     <Controller
//       control={control}
//       name={name as string}
//       rules={{
//         required:
//           name === "date" && control === controlModal
//             ? "Date is required"
//             : false,
//       }}
//       render={({ field }) => (
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "w-full justify-start text-left font-normal h-10",
//                 !field.value && "text-muted-foreground"
//               )}
//             >
//               <FaCalendarAlt className="mr-2 h-4 w-4" />
//               {field.value ? (
//                 format(field.value, "MM/dd/yyyy")
//               ) : (
//                 <span>{placeholder}</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0 z-50" align="start">
//             <Calendar
//               mode="single"
//               selected={field.value}
//               onSelect={field.onChange}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       )}
//     />
//   );

//   return (
//     <div className="p-2 sm:p-4 bg-white min-h-screen">
//       {/* 1. Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 pb-4 border-b border-gray-200 gap-2">
//         <Button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#17A2B8] text-white hover:bg-cyan-600 px-4 py-2 text-sm font-medium rounded-md shadow-sm w-full sm:w-auto"
//         >
//           + Add Contra Voucher
//         </Button>
//         <div className="text-sm">
//           Account <span className="text-gray-500 ml-1">/</span>{" "}
//           <span className="text-[#17A2B8] font-medium">Contra Voucher</span>
//         </div>
//       </div>

//       {/* 2. Title and Filter Button */}
//       <div className="flex justify-between items-center my-4">
//         <h1 className="text-xl font-semibold">Contra Voucher List</h1>
//         <Button
//           variant="outline"
//           className="flex items-center gap-2 border-[#17A2B8] text-[#17A2B8] hover:bg-[#17A2B8] hover:text-white"
//         >
//           <FaFilter /> <span className="hidden sm:inline">Filter</span>
//         </Button>
//       </div>

//       {/* 3. Filter Form   */}
//       <form
//         onSubmit={handleSubmitFilter(handleFilterSubmit)}
//         className="border border-gray-300 p-3 mb-4 rounded-md bg-gray-50"
//       >
//         {/* Change grid to 1 column on mobile, 3 on medium screens and up */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//           {/* Voucher ID */}
//           <div className="flex flex-col">
//             <Label
//               htmlFor="voucherId"
//               className="text-sm font-medium text-gray-700 mb-1"
//             >
//               Voucher Id
//             </Label>
//             <Input
//               id="voucherId"
//               type="text"
//               placeholder="Type Your Voucher Id"
//               {...registerFilter("voucherId")}
//               className="h-10 border-gray-300"
//             />
//           </div>

//           {/* Amount */}
//           <div className="flex flex-col">
//             <Label
//               htmlFor="amount"
//               className="text-sm font-medium text-gray-700 mb-1"
//             >
//               Amount
//             </Label>
//             <Input
//               id="amount"
//               type="text"
//               placeholder="Type Your Amount"
//               {...registerFilter("amount")}
//               className="h-10 border-gray-300"
//             />
//           </div>

//           {/* Date */}
//           <div className="flex flex-col">
//             <Label
//               htmlFor="date"
//               className="text-sm font-medium text-gray-700 mb-1"
//             >
//               Date
//             </Label>
//             {/* The DatePickerField uses react-hook-form's Controller */}
//             <DatePickerField
//               control={controlFilter}
//               name="date"
//               placeholder="mm/dd/yyyy"
//             />
//           </div>
//         </div>

//         {/* Form Buttons */}
//         <div className="flex gap-2 mt-4">
//           <Button
//             type="submit"
//             className="bg-[#17A2B8] text-white hover:bg-cyan-600 px-4"
//           >
//             Submit
//           </Button>
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleClearFilter}
//             className="border-gray-400 hover:bg-gray-100 px-4"
//           >
//             Clear
//           </Button>
//         </div>
//       </form>

//       {/* 4. Voucher List Header (Show Entries) */}
//       <div className="flex justify-start items-center mb-4 mt-8">
//         <span className="text-sm text-gray-700 mr-2">Show</span>
//         <Select
//           onValueChange={handleEntriesChange}
//           defaultValue={String(entriesPerPage)}
//         >
//           <SelectTrigger className="w-[80px] h-8 text-sm">
//             <SelectValue placeholder="10" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="10">10</SelectItem>
//               <SelectItem value="20">20</SelectItem>
//               <SelectItem value="50">50</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <span className="text-sm text-gray-700 ml-2">entries</span>
//       </div>

//       {/* 5. Voucher List Table - Added overflow-x-auto for responsiveness */}
//       <div className="rounded-md border border-gray-300 overflow-x-auto">
//         <Table className="min-w-[400px]">
//           {" "}
//           {/* Optional min-width to ensure some space on mobile */}
//           <TableHeader>
//             <TableRow className="bg-gray-100">
//               <TableHead className="font-bold text-gray-700 whitespace-nowrap">
//                 Voucher Id
//               </TableHead>
//               <TableHead className="font-bold text-gray-700 whitespace-nowrap">
//                 Amount
//               </TableHead>
//               <TableHead className="font-bold text-gray-700 whitespace-nowrap">
//                 Date
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedVouchers.length > 0 ? (
//               paginatedVouchers.map((voucher) => (
//                 <TableRow key={voucher.id}>
//                   <TableCell className="font-medium whitespace-nowrap">
//                     {voucher.id}
//                   </TableCell>
//                   <TableCell className="text-left whitespace-nowrap">
//                     ${voucher.amount.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="whitespace-nowrap">
//                     {format(new Date(voucher.date), "MM/dd/yyyy")}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={3}
//                   className="h-24 text-center text-gray-500"
//                 >
//                   No data available in table
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* 6. Pagination */}
//       <div className="flex justify-end items-center mt-4 space-x-2">
//         {/* Placeholder pagination - replace with actual logic */}
//         <Button variant="outline" size="sm" className="text-sm">
//           Previous
//         </Button>
//         <Button variant="outline" size="sm" className="text-sm">
//           Next
//         </Button>
//       </div>

//       {/* 7. Add Voucher Modal   */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
//           <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md z-50">
//             {" "}
//             {/* max-w-sm on small screens */}
//             <h2 className="text-xl font-semibold mb-4 text-[#17A2B8]">
//               Add New Contra Voucher
//             </h2>
//             <form onSubmit={handleSubmitModal(handleAddVoucher)}>
//               <div className="space-y-4">
//                 {/* Voucher ID Input */}
//                 <div>
//                   <Label
//                     htmlFor="modal-id"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Voucher ID
//                   </Label>
//                   <Input
//                     id="modal-id"
//                     type="text"
//                     {...registerModal("id", {
//                       required: "Voucher ID is required",
//                     })}
//                     className="h-10 border-gray-300"
//                   />
//                   {errors.id && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.id.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Amount Input */}
//                 <div>
//                   <Label
//                     htmlFor="modal-amount"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Amount
//                   </Label>
//                   <Input
//                     id="modal-amount"
//                     type="number"
//                     step="0.01"
//                     {...registerModal("amount", {
//                       required: "Amount is required",
//                       valueAsNumber: true,
//                     })}
//                     className="h-10 border-gray-300"
//                   />
//                   {errors.amount && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.amount.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Date Picker using Controller */}
//                 <div>
//                   <Label
//                     htmlFor="modal-date"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Date
//                   </Label>
//                   <DatePickerField
//                     control={controlModal}
//                     name="date"
//                     placeholder="Pick a date"
//                   />
//                   {errors.date && (
//                     <p className="text-red-500 text-xs mt-1">
//                       Date is required
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Modal Buttons */}
//               <div className="mt-6 flex justify-end gap-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsModalOpen(false)}
//                   className="border-gray-400 hover:bg-gray-100"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-[#17A2B8] text-white hover:bg-cyan-600"
//                 >
//                   Save Voucher
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContraVoucher;





// src/pages/ContraVoucherPage.tsx
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useVouchers } from "../Components/contra_Voucher/useVouchers";
import { VoucherFilterForm } from "../Components/contra_Voucher/VoucherFilter";
import { VoucherTable } from "../Components/contra_Voucher/VoucherTable";
import { AddVoucherModal } from "../Components/contra_Voucher/AddVoucherModal";

const ContraVoucherPage: React.FC = () => {
  // Custom hook for voucher data logic
  const { vouchers, setFilterValues, addVoucher } = useVouchers();
  
  // UI-specific state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(vouchers.length / entriesPerPage);
  
  // Calculate the vouchers for the current page
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedVouchers = vouchers.slice(startIndex, endIndex);
  
  // Reset to page 1 if filters or entries per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [vouchers.length, entriesPerPage]);


  // --- Event Handlers ---
  const handleEntriesChange = (value: string) => {
    setEntriesPerPage(Number(value));
  };

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

  return (
    <div className="p-2 sm:p-4 bg-white min-h-screen">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center pt-2 pb-4 border-b">
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#17A2B8] text-white">
          + Add Contra Voucher
        </Button>
        {/* Breadcrumb can go here */}
      </div>

      {/* 2. Title and Filter Button */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-xl font-semibold">Contra Voucher List</h1>
        <Button variant="outline" className="border-[#17A2B8] text-[#17A2B8]">
          <FaFilter className="mr-2" /> Filter
        </Button>
      </div>

      {/* 3. Filter Form Component */}
      <VoucherFilterForm onSubmit={setFilterValues} />

      {/* 4. Show Entries Dropdown */}
      <div className="flex justify-start items-center my-4">
        <span className="text-sm text-gray-700 mr-2">Show</span>
        <Select
          onValueChange={handleEntriesChange}
          defaultValue={String(entriesPerPage)}
        >
          <SelectTrigger className="w-[80px] h-9">
            <SelectValue placeholder={entriesPerPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-700 ml-2">entries</span>
      </div>

      {/* 5. Voucher Table Component */}
      <VoucherTable vouchers={paginatedVouchers} />
      
      {/* 6. Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, vouchers.length)} of {vouchers.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm font-medium px-2">
            Page {currentPage} of {totalPages > 0 ? totalPages : 1}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* 7. Add Voucher Modal Component */}
      <AddVoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddVoucher={addVoucher}
      />
    </div>
  );
};

export default ContraVoucherPage;
