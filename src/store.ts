import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './features/videos/videosSlice';
import currentVideoReducer from './features/currentVideo/currentVideoSlice';
import currentSectionReducer from './features/currentSection/currentSectionSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    currentVideo: currentVideoReducer,
    currentSection: currentSectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
