import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { UserDataType } from '../../interface/types';

// Define a type for the slice state
interface UserDataStateType {
  value: UserDataType | undefined;
}

// Define the initial state using that type
const initialState: UserDataStateType = {
  value: undefined,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataType | undefined>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserData = (state: RootState) => state.userData.value;

export default userDataSlice.reducer;
