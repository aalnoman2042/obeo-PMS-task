/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FaFilter } from 'react-icons/fa';
import { format } from "date-fns";

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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, TrashIcon } from "lucide-react";
import { Voucher } from '../types/types';

// Initial sample data
const initialVouchers: Voucher[] = [
  { id: 'CV001', date: '2025-09-23', amount: 10000, status: 'Paid' },
  { id: 'CV002', date: '2025-09-24', amount: 2500, status: 'Pending' },
  { id: 'CV003', date: '2025-09-25', amount: 5000, status: 'Paid' },
];

const CreditVoucher: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>(vouchers);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);

  const [newVoucher, setNewVoucher] = useState<Omit<Voucher, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    status: 'Pending'
  });
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [filterTerm, setFilterTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const results = vouchers.filter(voucher =>
      voucher.id.toLowerCase().includes(filterTerm.toLowerCase())
    );
    setFilteredVouchers(results);
  }, [filterTerm, vouchers]);

  // ADD
  const handleAddVoucher = (e: FormEvent) => {
    e.preventDefault();
    const newId = `CV${(vouchers.length + 1).toString().padStart(3, '0')}`;
    setVouchers([{ id: newId, ...newVoucher }, ...vouchers]);
    setNewVoucher({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      status: 'Pending'
    });
    setIsAddModalOpen(false);
  };

  // DELETE
  const handleDelete = (voucherId: string) => {
    setVoucherToDelete(voucherId);
    setIsDeleteConfirmOpen(true);
  };
  const confirmDelete = () => {
    if (voucherToDelete) {
      setVouchers(vouchers.filter((v) => v.id !== voucherToDelete));
    }
    setVoucherToDelete(null);
    setIsDeleteConfirmOpen(false);
  };
  const cancelDelete = () => {
    setVoucherToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  // EDIT
  const handleEditClick = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsEditModalOpen(true);
  };
  const handleUpdateVoucher = (e: FormEvent) => {
    e.preventDefault();
    if (editingVoucher) {
      setVouchers(vouchers.map((v) => v.id === editingVoucher.id ? editingVoucher : v));
      setIsEditModalOpen(false);
      setEditingVoucher(null);
    }
  };

  // Input Change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, isEdit = false) => {
    const { name, value } = e.target;
    const valueToSet = name === 'amount' ? parseFloat(value) : value;

    if (isEdit && editingVoucher) {
      setEditingVoucher({ ...editingVoucher, [name]: valueToSet });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setNewVoucher(prev => ({ ...prev, [name]: valueToSet as any }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#17A2B8] text-white hover:bg-cyan-600">
          + Add Credit Voucher
        </Button>
        <h4>account <span className="text-green-600">- credit voucher</span></h4>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Credit Voucher List</h1>
        <div className="relative">
          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 border-[#17A2B8] hover:bg-[#17A2B8] hover:text-white">
            <FaFilter /> Filter
          </Button>
          {isFilterOpen && (
            <div className="absolute top-12 right-0 bg-white border rounded shadow-lg p-4 w-64 z-10">
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter by Voucher ID</label>
              <input type="text" id="filter" value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} placeholder="e.g., CV001" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Voucher ID</TableHead><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVouchers.length > 0 ? (
              filteredVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-medium">{voucher.id}</TableCell>
                  <TableCell>{voucher.date}</TableCell>
                  <TableCell>{voucher.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${voucher.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {voucher.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(voucher)} className="mr-2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(voucher.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">No data available in table</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Add New Credit Voucher</h2>
            <form onSubmit={handleAddVoucher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newVoucher.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newVoucher.date ? format(new Date(newVoucher.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(newVoucher.date)}
                      onSelect={(date) => date && setNewVoucher(prev => ({ ...prev, date: date.toISOString().split("T")[0] }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="text" name="amount" value={newVoucher.amount} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={newVoucher.status} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">Save Voucher</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && editingVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Credit Voucher: {editingVoucher.id}</h2>
            <form onSubmit={handleUpdateVoucher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !editingVoucher.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editingVoucher.date ? format(new Date(editingVoucher.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(editingVoucher.date)}
                      onSelect={(date) => date && setEditingVoucher(prev => prev ? { ...prev, date: date.toISOString().split("T")[0] } : prev)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="text" name="amount" value={editingVoucher.amount} onChange={(e) => handleInputChange(e, true)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={editingVoucher.status} onChange={(e) => handleInputChange(e, true)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">Update Voucher</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {isDeleteConfirmOpen && voucherToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm z-50 text-center">
            <div className="mb-4 flex justify-center">
              <TrashIcon className="w-10 h-10 text-red-500"/>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete voucher <strong>{voucherToDelete}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button type="button" variant="secondary" onClick={cancelDelete} className="px-6">Cancel</Button>
              <Button type="button" variant="destructive" onClick={confirmDelete} className="px-6">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditVoucher;
