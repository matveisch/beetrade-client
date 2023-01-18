import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SectionType } from '../../interface/types';
import type { RootState } from '../../store';

// Define a type for the slice state
interface CurrentSectionState {
  value: SectionType | undefined;
}

// Define the initial state using that type
const initialState: CurrentSectionState = {
  value: undefined,
};

export const currentSectionSlice = createSlice({
  name: 'currentSection',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<SectionType>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentSection } = currentSectionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSection = (state: RootState) => state.currentSection.value;

export default currentSectionSlice.reducer;
