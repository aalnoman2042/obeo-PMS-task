import React from 'react';

// Sample data type for your voucher
interface Voucher {
  id: string;
  date: string;
  amount: number;
  status: string;
}

const DebitVoucher: React.FC = () => {
  // Sample data for the table (you can replace this with real data from your API or Redux store)
  const vouchers: Voucher[] = [
    { id: 'CV001', date: '2025-09-23', amount: 10000, status: 'Paid' },
    { id: 'CV002', date: '2025-09-24', amount: 2500, status: 'Pending' },
    { id: 'CV003', date: '2025-09-25', amount: 5000, status: 'Paid' },
  ];

  // Function to handle actions (e.g., edit or delete)
  const handleAction = (voucherId: string, action: string) => {
    console.log(`${action} credit voucher with ID: ${voucherId}`);
    // Handle your action (edit, delete, etc.)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Credit Voucher List</h1>

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
          {vouchers.map((voucher) => (
            <tr key={voucher.id} className="border-b">
              <td className="py-2 px-4">{voucher.id}</td>
              <td className="py-2 px-4">{voucher.date}</td>
              <td className="py-2 px-4">{voucher.amount}</td>
              <td className="py-2 px-4">{voucher.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleAction(voucher.id, 'Edit')}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleAction(voucher.id, 'Delete')}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebitVoucher;
