import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface GlobalErrorState {
  value: string | undefined;
}

const initialState: GlobalErrorState = {
  value: undefined,
};

export const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setGlobalError } = globalErrorSlice.actions;

export const selectGlobalError = (state: RootState) => state.globalError.value;

export default globalErrorSlice.reducer;
