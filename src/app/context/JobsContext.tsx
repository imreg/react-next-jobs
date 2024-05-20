'use client';
import { createContext, useState, ReactNode } from 'react';
import { Job } from '@/app/lib/interfaces/JobInterface';

interface JobsContextProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
}

export const JobsContext = createContext<JobsContextProps>({
  jobs: [],
  setJobs: () => {},
});

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  return (
    <JobsContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobsContext.Provider>
  );
};