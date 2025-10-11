
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
