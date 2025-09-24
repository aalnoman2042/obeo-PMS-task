import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

// Sample data type for your voucher
interface Voucher {
  id: string;
  date: string;
  amount: number;
  status: string;
}

const CreditVoucher: React.FC = () => {
  // Sample state to store vouchers (this could be replaced with real data fetching logic)
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Simulate fetching data from an API (replace with real API call)
  useEffect(() => {
    // This would be a call to your backend API, replace it with real API fetching logic
    const fetchVouchers = () => {
      // Example: Replace with actual data from backend
      const fetchedVouchers: Voucher[] = [
        { id: 'CV001', date: '2025-09-23', amount: 10000, status: 'Paid' },
        { id: 'CV002', date: '2025-09-24', amount: 2500, status: 'Pending' },
        { id: 'CV003', date: '2025-09-25', amount: 5000, status: 'Paid' },
      ];

      // Update state with fetched data
      setVouchers(fetchedVouchers);
      setTotalPages(3); // Example, replace with actual number of pages from your backend
    };

    fetchVouchers();
  }, [currentPage]);

  // Function to handle actions (e.g., edit or delete)
  const handleAction = (voucherId: string, action: string) => {
    console.log(`${action} credit voucher with ID: ${voucherId}`);
    // You can make an API call to perform actions like Edit or Delete here
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-[#17A2B8] text-white py-2 px-4 rounded hover:bg-green-600">
          + Add Credit Voucher
        </button>
        <h4>account <span className="text-green-600"> - credit voucher</span></h4>
      </div>

      {/* Filter and Title Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Credit Voucher List</h1>
        <button className="flex items-center gap-2 border-[#17A2B8] border py-2 px-4 rounded hover:bg-[#17A2B8] hover:text-white transition-all">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Voucher ID</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b">
                <td className="py-2 px-4">{voucher.id}</td>
                <td className="py-2 px-4">{voucher.date}</td>
                <td className="py-2 px-4">{voucher.amount}</td>
                <td className="py-2 px-4">{voucher.status}</td>
                <td className="py-2 px-4">
                  {/* Edit and Delete buttons */}
                  <button
                    onClick={() => handleAction(voucher.id, 'Edit')}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleAction(voucher.id, 'Delete')}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 text-center">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreditVoucher;
