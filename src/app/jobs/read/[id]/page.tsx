'use client';
import Link from "next/link";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import JobService from '@/app/lib/JobService';
import { Job } from '@/app/lib/interfaces/JobInterface';
import Spinner from '@/app/components/Spinners';
import { useAppSelector } from '@/app/lib/store/hooks';

const JobDetailsPage: React.FC = () => {
    const router = useRouter();
    const { id } = useParams();
    const [job, setJob] = useState<Job | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const jobs = useAppSelector((state) => state.job.jobs);

    useEffect(() => {
        if (id && jobs.length > 0) {
            const selectedJob = jobs.find((job) => job.id === Number(id));
            setJob(selectedJob);
            setLoading(false);
        }
    
        if (jobs.length === 0 && typeof id === 'string') {
            const jobService = new JobService();

            const fetchJobs = async () => {
                try {
                    const data = await jobService.getJobById(parseInt(id));
                    setJob(data);
                } catch (error) {
                    console.log('Error', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchJobs();
        }
    }, [id, jobs, job]);

    const onDeleteClick = (id?: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
        if (!confirmDelete) return;
        const jobService = new JobService();
        if (id) jobService.deleteJob(id);
        router.push('/jobs');
    };        

    return (
        <>
        <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/jobs" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to Job Listings
          </Link>
        </div>
        </section>

        <section className="bg-indigo-50">
              {loading ? (
                  <Spinner loading={loading} />
              ) : (
                  <div className="container m-auto py-10 px-6">
                      <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                          <main>
                              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                  <div className="text-gray-500 mb-4">{job?.type?.title}</div>
                                  <h1 className="text-3xl font-bold mb-4">{job?.title}</h1>
                                  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                      <FaMapMarker className="text-orange-700 mr-1" />
                                      <p className="text-orange-700">{job?.location}</p>
                                  </div>
                              </div>

                              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                  <h3 className="text-indigo-800 text-lg font-bold mb-6">Job Description</h3>
                                  <p className="mb-4">{job?.description}</p>
                                  <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>
                                  <p className="mb-4">{job?.salary} / Year</p>
                              </div>
                          </main>

                          <aside>
                              <div className="bg-white p-6 rounded-lg shadow-md">
                                  <h3 className="text-xl font-bold mb-6">Company Info</h3>
                                  <h2 className="text-2xl">{job?.company?.name}</h2>
                                  <p className="my-2">{job?.company?.description}</p>
                                  <hr className="my-4" />
                                  <h3 className="text-xl">Contact Email:</h3>
                                  <p className="my-2 bg-indigo-100 p-2 font-bold">{job?.company?.email}</p>
                                  <h3 className="text-xl">Contact Phone:</h3>
                                  <p className="my-2 bg-indigo-100 p-2 font-bold">{job?.company?.phone}</p>
                              </div>

                              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                  <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                  <Link href={`/jobs/edit/${job?.id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Job</Link>
                                  <button onClick={() => onDeleteClick(job?.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Delete Job</button>
                              </div>
                          </aside>
                      </div>
                  </div>
              )}
        </section>
        </>
    );
};

export default JobDetailsPage;