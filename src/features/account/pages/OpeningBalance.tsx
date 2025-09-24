import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { OpeningBalanceFormData } from '../types/types';
// import { saveOpeningBalance } from './redux/openingBalanceSlice';



const OpeningBalance: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OpeningBalanceFormData>();
//   const dispatch = useDispatch();

const loading = false // development purpose
const error  = false

//   const { loading, error } = useSelector((state: any) => state.openingBalance);

  const [headOfAccount, setHeadOfAccount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const onSubmit = (data: OpeningBalanceFormData) => {
    // dispatch(saveOpeningBalance(data));
    reset(); // Reset form after submission
    console.log(data);
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Opening Balance</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Head of Account */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="headOfAccount">Head of Account</label>
          <select
            id="headOfAccount"
            {...register('headOfAccount', { required: 'Head of Account is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={headOfAccount}
            onChange={(e) => setHeadOfAccount(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Equity">Equity</option>
            {/* Add more options as needed */}
          </select>
          {errors.headOfAccount && <p className="text-red-500 text-xs">{errors.headOfAccount.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="totalAmount">Total Amount</label>
          <input
            type="number"
            id="totalAmount"
            {...register('totalAmount', { required: 'Total Amount is required' })}
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.totalAmount && <p className="text-red-500 text-xs">{errors.totalAmount.message}</p>}
        </div>

        {/* Remark */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="remark">Remark</label>
          <textarea
            id="remark"
            {...register('remark')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 text-white px-6 py-2 rounded-md"
          >
            {loading ? 'Saving...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => reset()} // Cancel resets the form
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Display Errors */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default OpeningBalance;
