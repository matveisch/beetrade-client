import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './features/videos/videosSlice';
import currentVideoReducer from './features/currentVideo/currentVideoSlice';
import currentSectionReducer from './features/currentSection/currentSectionSlice';
import sectionsReducer from './features/sections/sectionsSlice';
import userDataReducer from './features/userData/userDataSlice';
import globalErrorReducer from './features/globalError/globalErrorSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    currentVideo: currentVideoReducer,
    sections: sectionsReducer,
    currentSection: currentSectionReducer,
    userData: userDataReducer,
    globalError: globalErrorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
