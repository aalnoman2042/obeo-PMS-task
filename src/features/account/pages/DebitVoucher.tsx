import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

// Sample data type for your voucher
interface Voucher {
  id: string;

}

const DebitVoucher: React.FC = () => {
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
        { id: 'CV001',  },
        { id: 'CV002',  },
        { id: 'CV003' },
      ];

      // Update state with fetched data
      setVouchers(fetchedVouchers);
      setTotalPages(3); // Example, replace with actual number of pages from your backend
    };

    fetchVouchers();
  }, [currentPage]);
 

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-[#17A2B8] text-white py-2 px-4 rounded hover:bg-green-600">
          + Add debit Voucher
        </button>
        <h4>account <span className="text-green-600"> - Debit voucher</span></h4>
      </div>

      {/* Filter and Title Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Debit Voucher List</h1>
        <button className="flex items-center gap-2 border-[#17A2B8] border py-2 px-4 rounded hover:bg-[#17A2B8] hover:text-white transition-all">
          <FaFilter /> Filter
        </button>
      </div>
      {/* Show Entries Dropdown */}
      <div className="mb-4">
        <span>Show </span>
        <select
        //   value={entriesPerPage} 
        //   onChange={handleEntriesChange}
          className="border py-2 px-3 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span> entries</span>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Voucher ID</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b">
                <td className="py-2 px-4">{voucher.id}</td>
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

export default DebitVoucher;
