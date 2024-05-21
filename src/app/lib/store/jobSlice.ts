import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '@/app/lib/interfaces/JobInterface';

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
    clearJobs(state) {
      state.jobs = [];
    },
  },
});

export const { setJobs, clearJobs } = jobSlice.actions;

export default jobSlice.reducer;
