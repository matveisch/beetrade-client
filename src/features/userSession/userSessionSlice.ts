import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface UserSessionState {
  value: string | undefined;
}

// Define the initial state using that type
const initialState: UserSessionState = {
  value: undefined,
};

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserSession } = userSessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserSession = (state: RootState) => state.userSession.value;

export default userSessionSlice.reducer;
