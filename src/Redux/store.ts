
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import { dashboardSlice } from '@/features/account/DasboardSlices/dashboardSlices';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    dashboardSlice: dashboardSlice.reducer, // You can add other reducers for different features
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
