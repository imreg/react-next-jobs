'use client';
import { useRouter, useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react';
import DetailsForm from '@/app/components/DetailsForm';
import { JobsContext } from '@/app/context/JobsContext';
import JobService from '@/app/lib/JobService';
import { Job } from '@/app/lib/interfaces/JobInterface';

interface EditJobPageProps {
  updateJobSubmit: (job: any) => void;
}

const EditJobPage: React.FC<EditJobPageProps> = ({ updateJobSubmit }) => {
    const router = useRouter();  
    const { jobs } = useContext(JobsContext);
    const { id } = useParams();
    const [job, setJob] = useState<Job | undefined>();

    useEffect(() => {
        if (id && jobs.length > 0) {
            const selectedJob = jobs.find((job) => job.id === Number(id));            
            setJob(selectedJob);
        }
    }, [id, jobs]);

    return (
        <section className='bg-indigo-50'>
            <div className='container m-auto max-w-2xl py-24'>
                <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                    <DetailsForm jobSubmit={updateJobSubmit} serviceTitle='Update Job' job={job} id={id} />
                </div>
            </div>
        </section>
    );
};

export default EditJobPage;
