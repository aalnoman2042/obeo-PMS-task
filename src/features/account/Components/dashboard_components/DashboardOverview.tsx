import React, { useState } from 'react';
import { FaChartLine, FaShoppingCart, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  // Handle month change
  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  // Handle search
  const handleSearch = () => {
    console.log(`Searching for data in ${selectedMonth}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="flex space-x-3 items-center">
          {/* ShadCN Month Select */}
          <Select onValueChange={handleMonthChange} defaultValue={selectedMonth}>
            <SelectTrigger className="w-[150px] border">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="April">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
              <SelectItem value="October">October</SelectItem>
              <SelectItem value="November">November</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-[#17A2B8] text-white hover:bg-cyan-600"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-green-500 text-3xl" />
            <span className="font-medium text-lg">Revenue</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{data.revenue}</h2>
        </div>

        {/* Expense Card */}
        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaCreditCard className="text-red-500 text-3xl" />
            <span className="font-medium text-lg">Expense</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{data.expense}</h2>
        </div>

        {/* Profit/Loss Card */}
        <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave className="text-blue-500 text-3xl" />
            <span className="font-medium text-lg">Profit/Loss</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{data.profitLoss}</h2>
        </div>

        {/* Purchase Card */}
        <div className="flex flex-col items-center bg-teal-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-teal-500 text-3xl" />
            <span className="font-medium text-lg">Purchase</span>
          </div>
          <h2 className="text-xl font-bold mt-2">{data.purchase}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
