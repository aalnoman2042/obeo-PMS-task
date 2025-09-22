import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Adjust base URL as per your backend
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => '/dashboard', // Adjust API endpoint as per your backend
    }),
  }),
});

export const { useGetDashboardDataQuery } = baseApi;
