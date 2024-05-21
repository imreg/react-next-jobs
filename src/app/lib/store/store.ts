import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';

const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
