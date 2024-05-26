'use client';
import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react';
import DetailsForm from '@/app/components/DetailsForm';
import JobService from '@/app/lib/JobService';
import { Job } from '@/app/lib/interfaces/JobInterface';
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { setJobs } from '@/app/lib/store/jobSlice';

const EditJobPage: React.FC<{}> = () => {
    const jobs = useAppSelector((state) => state.job.jobs);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [job, setJob] = useState<Job | undefined>();    
    const jobService = useMemo(() => {
        return new JobService();
    }, []);

    useEffect(() => {
        const selectedJob = jobs.find((job) => job.id === Number(id));
        setJob(selectedJob);

        if (jobs.length === 0 && typeof id === 'string') {            
            const fetchJobs = async () => {
                try {
                    const data = await jobService.getJobById(parseInt(id));
                    dispatch(setJobs([data]));
                } catch (error) {
                    console.log('Error', error);
                }
            };
            fetchJobs();
        }
    }, [dispatch, id, job, jobService, jobs]);

    return (
        <section className='bg-indigo-50'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <DetailsForm jobSubmit={jobService.updateJob} serviceTitle='Update Job' job={job} id={id} />
                </div>
            </div>
        </section>
    );
};

export default EditJobPage;
