/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Voucher } from '../types/types';
import { TrashIcon } from 'lucide-react';

// Sample data type for your voucher


// Initial sample data
const initialVouchers: Voucher[] = [
  { id: 'CV001', date: '2025-09-23', amount: 10000, status: 'Paid' },
  { id: 'CV002', date: '2025-09-24', amount: 2500, status: 'Pending' },
  { id: 'CV003', date: '2025-09-25', amount: 5000, status: 'Paid' },
];

const CreditVoucher: React.FC = () => {
  // Master list of all vouchers
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  // List of vouchers to display after filtering
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>(vouchers);

  // State for modals and pop-ups
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
// delete state
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);


  // State for form data
  const [newVoucher, setNewVoucher] = useState<Omit<Voucher, 'id'>>({ date: new Date().toISOString().split('T')[0], amount: 0, status: 'Pending' });
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);
  const [filterTerm, setFilterTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Effect to apply filtering
  useEffect(() => {
    const results = vouchers.filter(voucher =>
      voucher.id.toLowerCase().includes(filterTerm.toLowerCase())
    );
    setFilteredVouchers(results);
  }, [filterTerm, vouchers]);
  
  // --- CRUD Functions ---

  // ADD: Handle form submission to add a new voucher
  const handleAddVoucher = (e: FormEvent) => {
    e.preventDefault();
    const newId = `CV${(vouchers.length + 1).toString().padStart(3, '0')}`;
    setVouchers([{ id: newId, ...newVoucher }, ...vouchers]);
    setNewVoucher({ date: new Date().toISOString().split('T')[0], amount: 0, status: 'Pending' });
    setIsAddModalOpen(false);
  };

  // DELETE: Remove a voucher after confirmation
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

  // DELETE CANCELLATION: Close the confirmation modal
  const cancelDelete = () => {
    setVoucherToDelete(null);
    setIsDeleteConfirmOpen(false);
  };

  // EDIT (Step 1): Open the edit modal with the voucher's data
  const handleEditClick = (voucher: Voucher) => {
    setEditingVoucher(voucher);
    setIsEditModalOpen(true);
  };
  
  // EDIT (Step 2): Update the voucher list on form submission
  const handleUpdateVoucher = (e: FormEvent) => {
    e.preventDefault();
    if (editingVoucher) {
      setVouchers(vouchers.map((v) => v.id === editingVoucher.id ? editingVoucher : v));
      setIsEditModalOpen(false);
      setEditingVoucher(null);
    }
  };

  // --- Helper for form input changes ---
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

      {/* Filter and Title Section */}
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
      
      {/* Show Entries Dropdown */}
      <div className="mb-4">
        <span>Show </span>
        <select className="border py-2 px-3 rounded">
          <option value={5}>5</option><option value={10}>10</option><option value={15}>15</option><option value={20}>20</option>
        </select>
        <span> entries</span>
      </div>

      {/* Shadcn Table */}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}>Previous</Button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <Button variant="outline" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}>Next</Button>
      </div>

      {/* ADD VOUCHER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Add New Credit Voucher</h2>
            <form onSubmit={handleAddVoucher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" value={newVoucher.date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" name="amount" value={newVoucher.amount} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={newVoucher.status} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
                  <option value="Pending">Pending</option><option value="Paid">Paid</option>
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

      {/* EDIT VOUCHER MODAL */}
      {isEditModalOpen && editingVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
            <h2 className="text-xl font-semibold mb-4">Edit Credit Voucher: {editingVoucher.id}</h2>
            <form onSubmit={handleUpdateVoucher} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" value={editingVoucher.date} onChange={(e) => handleInputChange(e, true)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" name="amount" value={editingVoucher.amount} onChange={(e) => handleInputChange(e, true)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={editingVoucher.status} onChange={(e) => handleInputChange(e, true)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required>
                  <option value="Pending">Pending</option><option value="Paid">Paid</option>
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
      {/*  */}
      {isDeleteConfirmOpen && voucherToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm z-50 animate-in fade-in-0 zoom-in-95 text-center">
            <div className="mb-4 flex justify-center">
                <TrashIcon className="w-10 h-10 text-red-500"/>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete voucher **{voucherToDelete}**? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={cancelDelete} 
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={confirmDelete} 
                className="px-6"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreditVoucher;