import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FinanceYearFormData } from '../types/types'; // Assuming you have this type defined

const FinanceYear: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FinanceYearFormData>();

  const loading = false; // development purpose
  const error = false; // development purpose

  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');  // Initially set to 'Active'

  // Form submission handler
  const onSubmit = (data: FinanceYearFormData) => {
    console.log(data);  // For now, log the data. Later, dispatch to Redux or make an API call
    reset();  // Reset form after submission
  };

  // Handle status change directly with React Hook Form's setValue for cleaner code
  const handleStatusChange = (status: 'Active' | 'Inactive') => {
    setStatus(status);  // Update local state for status
    setValue('status', status);  // Update status in React Hook Form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Year</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="2025-2025"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="fromDate">From Date</label>
          <input
            type="date"
            id="fromDate"
            {...register('fromDate', { required: 'From date is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.fromDate && <p className="text-red-500 text-xs">{errors.fromDate.message}</p>}
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="toDate">To Date</label>
          <input
            type="date"
            id="toDate"
            {...register('toDate', { required: 'To date is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.toDate && <p className="text-red-500 text-xs">{errors.toDate.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              value="Active"
              {...register('status', { required: 'Status is required' })}
              checked={status === 'Active'}
              onChange={() => handleStatusChange('Active')}
              className="mr-2"
            />
            <label htmlFor="active" className="ml-2">Active</label>

            <input
              type="radio"
              id="inactive"
              value="Inactive"
              {...register('status', { required: 'Status is required' })}
              checked={status === 'Inactive'}
              onChange={() => handleStatusChange('Inactive')}
              className="ml-4"
            />
            <label htmlFor="inactive" className="ml-2">Inactive</label>
          </div>
          {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      {/* Display errors */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FinanceYear;
