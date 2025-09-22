import React, { useState } from 'react';
import { FaChartLine, FaShoppingCart, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const DashboardOverview: React.FC = () => {
  // Dummy data
  const data = {
    revenue: 2500,
    expense: 1500,
    profitLoss: 1000,
    purchase: 800,
  };

  // State to handle selected month
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  // Handle dropdown change
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  // Handle search (could be connected to some API or filtering logic)
  const handleSearch = () => {
    console.log(`Searching for data in ${selectedMonth}`);
    // You can trigger API calls or other actions here based on the selectedMonth
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="flex space-x-2">
          {/* Dropdown for selecting month */}
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border p-2 rounded-lg"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          {/* Search Button */}
          <button
            className="bg-[#17A2B8] p-3 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-green-500 text-3xl" />
            <span className="font-medium text-lg">Revenue</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{`${data.revenue}`}</h2>
        </div>

        {/* Expense Card */}
        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaCreditCard className="text-red-500 text-3xl" />
            <span className="font-medium text-lg">Expense</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{`${data.expense}`}</h2>
        </div>

        {/* Profit/Loss Card */}
        <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave className="text-blue-500 text-3xl" />
            <span className="font-medium text-lg">Profit/Loss</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{`${data.profitLoss}`}</h2>
        </div>

        {/* Purchase Card */}
        <div className="flex flex-col items-center bg-teal-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-teal-500 text-3xl" />
            <span className="font-medium text-lg">Purchase</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{`${data.purchase}`}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
