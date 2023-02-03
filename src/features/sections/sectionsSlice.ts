import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SectionType } from '../../interface/types';
import type { RootState } from '../../store';

// Define a type for the slice state
interface SectionsState {
  value: SectionType[] | undefined;
}

// Define the initial state using that type
const initialState: SectionsState = {
  value: undefined,
};

export const sectionsSlice = createSlice({
  name: 'sections',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSections: (state, action: PayloadAction<SectionType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setSections } = sectionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSections = (state: RootState) => state.sections.value;

export default sectionsSlice.reducer;
