import { baseApi } from '@/Redux/baseApi';
import { createSlice } from '@reduxjs/toolkit';


interface FrontOfficeState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; // Adjust type based on the data returned from API
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FrontOfficeState = {
  data: [],
  status: 'idle',
};

export const dashboardSlice = createSlice({
  name: 'frontOffice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      baseApi.endpoints.getDashboardData.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      }
    );
  },
});

export const frontOfficeReducer = dashboardSlice.reducer;
