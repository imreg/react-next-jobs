'use client';
import { useState, useEffect, useContext } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinners';
import JobService from '@/app/lib/JobService';
import { JobsContext } from '@/app/context/JobsContext';


interface JobListProps {
  isHome?: boolean;
}

const JobList: React.FC<JobListProps> = ({ isHome = false }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { jobs, setJobs } = useContext(JobsContext);

  useEffect(() => {
    const param = isHome ? '?_limit=3' : '';
    const jobService = new JobService();

    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs(param);
        setJobs(data);
      } catch (error) {
        console.log('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'All Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobList;