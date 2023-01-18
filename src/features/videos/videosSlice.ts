import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoType } from '../../interface/types';
import type { RootState } from '../../store';

// Define a type for the slice state
interface VideosState {
  value: VideoType[] | undefined;
}

// Define the initial state using that type
const initialState: VideosState = {
  value: undefined,
};

export const videosSlice = createSlice({
  name: 'videos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<VideoType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setVideos } = videosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectVideos = (state: RootState) => state.videos.value;

export default videosSlice.reducer;
