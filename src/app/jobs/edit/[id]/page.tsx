'use client';
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import DetailsForm from '@/app/components/DetailsForm';
import JobService from '@/app/lib/JobService';
import { Job } from '@/app/lib/interfaces/JobInterface';
import { useAppSelector } from '@/app/lib/store/hooks';

interface EditJobPageProps {
  updateJobSubmit: (job: any) => void;
}

const EditJobPage: React.FC<EditJobPageProps> = ({ updateJobSubmit }) => {
    const router = useRouter();  
    const jobs = useAppSelector((state) => state.job.jobs);
    const { id } = useParams();
    const [job, setJob] = useState<Job | undefined>();
    const jobService = new JobService();    
    useEffect(() => {
        const selectedJob = jobs.find((job) => job.id === Number(id));
        setJob(selectedJob);
    }, [id, job, jobs]);

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
