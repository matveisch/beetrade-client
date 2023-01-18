import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoType } from '../../interface/types';
import type { RootState } from '../../store';

// Define a type for the slice state
interface CurrentVideoState {
  value: VideoType | undefined;
}

// Define the initial state using that type
const initialState: CurrentVideoState = {
  value: undefined,
};

export const currentVideoSlice = createSlice({
  name: 'currentVideo',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<VideoType>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentVideo } = currentVideoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentVideo = (state: RootState) => state.currentVideo.value;

export default currentVideoSlice.reducer;
