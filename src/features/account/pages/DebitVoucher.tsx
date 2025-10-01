import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaFilter } from 'react-icons/fa';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DVoucher } from '../types/types';


// Expanded the data type for your voucher to be more realistic


// Initial sample data
const initialVouchers: DVoucher[] = [
  { id: 'DV001', date: '2025-10-01', accountName: 'Office Supplies', amount: 1500 },
  { id: 'DV002', date: '2025-10-02', accountName: 'Marketing Expense', amount: 5000 },
  { id: 'DV003', date: '2025-10-03', accountName: 'Utilities', amount: 12000 },
  { id: 'DV004', date: '2025-10-04', accountName: 'Office Rent', amount: 25000 },
  { id: 'DV005', date: '2025-10-04', accountName: 'Office Rent', amount: 25000 },
];


const DebitVoucher: React.FC = () => {
  // Master list of all vouchers
  const [vouchers, setVouchers] = useState<DVoucher[]>(initialVouchers);
  // List of vouchers to display after filtering
  const [filteredVouchers, setFilteredVouchers] = useState<DVoucher[]>(vouchers);

  // State to control visibility of the Add Voucher Modal and Filter pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // State for the new voucher form and the filter input
  const [newVoucher, setNewVoucher] = useState({ id: '', date: new Date().toISOString().split('T')[0], accountName: '', amount: 0 });
  const [filterTerm, setFilterTerm] = useState('');

  // Pagination state (from original code)
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);

  // useEffect to apply the filter when the filterTerm or the main vouchers list changes
  useEffect(() => {
    const results = vouchers.filter(voucher =>
      voucher.accountName.toLowerCase().includes(filterTerm.toLowerCase())
    );
    setFilteredVouchers(results);
  }, [filterTerm, vouchers]);

  // Handle input changes for the new voucher form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVoucher(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission to add a new voucher
  const handleAddVoucher = (e: FormEvent) => {
    e.preventDefault();
    if (newVoucher.id && newVoucher.date && newVoucher.accountName && newVoucher.amount > 0) {
      setVouchers([newVoucher, ...vouchers]); // Add to the master list
      setNewVoucher({ id: '', date: new Date().toISOString().split('T')[0], accountName: '', amount: 0 }); // Reset form
      setIsModalOpen(false); // Close modal
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Shadcn Button Used Here */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#17A2B8] text-white hover:bg-cyan-600"
        >
          + Add debit Voucher
        </Button>
        <h4>account <span className="text-green-600">- Debit voucher</span></h4>
      </div>

      {/* Filter and Title Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Debit Voucher List</h1>
        <div className="relative">
            {/* Shadcn Button Used Here */}
            <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 border-[#17A2B8] hover:bg-[#17A2B8] hover:text-white"
            >
                <FaFilter /> Filter
            </Button>
            {/* FILTER POPOVER */}
            {isFilterOpen && (
                <div className="absolute top-12 right-0 bg-white border rounded shadow-lg p-4 w-64 z-10">
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter by Account Name</label>
                <input
                    type="text"
                    id="filter"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    placeholder="Type to filter..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#17A2B8] focus:border-[#17A2B8]"
                />
                </div>
            )}
        </div>
      </div>
      
      {/* Show Entries Dropdown */}
      <div className="mb-4">
        <span>Show </span>
        <select className="border py-2 px-3 rounded">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span> entries</span>
      </div>

      {/* Shadcn Table Used Here */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voucher ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVouchers.length > 0 ? (
              filteredVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-medium">{voucher.id}</TableCell>
                  <TableCell>{voucher.date}</TableCell>
                  <TableCell>{voucher.accountName}</TableCell>
                  <TableCell className="text-right">{voucher.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No data available in table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Shadcn Buttons Used Here */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </Button>
      </div>

      {/* ADD VOUCHER MODAL (UI is the same as before) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Add New Debit Voucher</h2>
            <form onSubmit={handleAddVoucher}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Voucher ID</label>
                  <input type="text" name="id" value={newVoucher.id} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" name="date" value={newVoucher.date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input type="text" name="accountName" value={newVoucher.accountName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input type="number" name="amount" value={newVoucher.amount} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                {/* Shadcn Buttons Used Here */}
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">
                  Save Voucher
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebitVoucher; 