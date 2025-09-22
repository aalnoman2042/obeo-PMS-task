import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'January', revenue: 12, expenses: 8, profitLoss: 4 },
  { month: 'February', revenue: 14, expenses: 10, profitLoss: 4 },
  { month: 'March', revenue: 16, expenses: 12, profitLoss: 4 },
  { month: 'April', revenue: 18, expenses: 14, profitLoss: 4 },
  { month: 'May', revenue: 20, expenses: 15, profitLoss: 5 },
  { month: 'June', revenue: 22, expenses: 17, profitLoss: 5 },
  { month: 'July', revenue: 24, expenses: 28, profitLoss: 6 },
  { month: 'August', revenue: 34, expenses: 20, profitLoss: 6 },
  { month: 'September', revenue: 28, expenses: 21, profitLoss: 7 },
  { month: 'October', revenue: 30, expenses: 23, profitLoss: 7 },
  { month: 'November', revenue: 32, expenses: 25, profitLoss: 7 },
  { month: 'December', revenue: 26, expenses: 18, profitLoss: 9 },
];

const MonthlyRevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}
      
      margin={{  bottom: 50 }}>
        <Legend
          layout="horizontal"  // Horizontal layout for the Legend
          verticalAlign="top"   // Position the Legend at the top
          align="center"        // Center the Legend horizontally
        />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          angle={-45} // Rotate the month labels
          textAnchor="end" // Align the labels to the end
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#4CAF50" name="Revenue" />
        <Bar dataKey="expenses" fill="#E91E63" name="Expenses" />
        <Bar dataKey="profitLoss" fill="#2196F3" name="Profit/Loss" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueChart;
