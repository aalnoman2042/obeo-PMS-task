import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { date: '2025-08-01', room: 0.6, restaurant: 0.8, banquet: 0.2, other: 0.1 },
  { date: '2025-08-02', room: 0.7, restaurant: 0.6, banquet: 0.3, other: 0.15 },
  { date: '2025-08-03', room: 0.8, restaurant: 0.9, banquet: 0.5, other: 0.2 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  { date: '2025-08-04', room: 0.5, restaurant: 0.7, banquet: 0.3, other: 0.25 },
  // Add more data as needed
];

const DayChartOfRevenue: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}
     margin={{  bottom: 50 }}
     >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"
        angle={-45}
        textAnchor="end" 
        />
        <YAxis />
        <Tooltip />
         <Legend
                  layout="horizontal"  // Horizontal layout for the Legend
                  verticalAlign="top"   // Position the Legend at the top
                  align="center"        // Center the Legend horizontally
                />
        <Bar dataKey="room" fill="#82ca9d" name="Room Revenue" />
        <Bar dataKey="restaurant" fill="#00bcd4" name="Restaurant Revenue" />
        <Bar dataKey="banquet" fill="#9c27b0" name="Banquet Revenue" />
        <Bar dataKey="other" fill="#ff9800" name="Other Outlets Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DayChartOfRevenue;
