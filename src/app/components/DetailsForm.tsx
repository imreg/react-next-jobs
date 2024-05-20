"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Job } from '@/app/lib/interfaces/JobInterface';

interface DetailsFormProps {
  jobSubmit: (job: Job) => void;
  serviceTitle: string;
  job?: Job | null;
  id?: number | null;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ jobSubmit, serviceTitle, job = null, id = null }) => {
  const [titleMain, setTitleMain] = useState<string>(job?.title ?? '');
  const [type, setType] = useState<{id: number, title: string}>(job?.type ?? { id: 1, title: 'Full-Time' });
  const [location, setLocation] = useState<string>(job?.location ?? '');
  const [description, setDescription] = useState<string>(job?.description ?? '');
  const [salary, setSalary] = useState<string>(job?.salary ?? 'Under $50K');
  const [companyName, setCompanyName] = useState<string>(job?.company?.name ?? '');
  const [companyDescription, setCompanyDescription] = useState<string>(job?.company?.description ?? '');
  const [contactEmail, setContactEmail] = useState<string>(job?.company?.email ?? '');
  const [contactPhone, setContactPhone] = useState<string>(job?.company?.phone ?? '');

  const router = useRouter();

  const jobTypes = [
    'Full-Time',
    'Part-Time',
    'Remote',
    'Internship'
  ];

  const salaries = [
    'Under $50K',
    '$50K - $60K',
    '$60K - $70K',
    '$70K - 80K',
    '$80K - 90K',
    '$90K - 100K',
    '$100K - $125K',
    '$125K - $150K',
    '$150K - $175K',
    '$175K - $200K',
    'Over $200K'
  ];

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jobObject: Job = {
      title: titleMain,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        email: contactEmail,
        phone: contactPhone,
      },
    };

    if (id) { jobObject.id = id }
    jobSubmit(jobObject);

    toast.success('Job Updated Successfully');

    return id == null ? router.push(`/jobs`) : router.push(`/jobs/${id}`);
  };

    return (
        <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
                {serviceTitle}
            </h2>

            <div className='mb-4'>
                <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
                    Job Type
                </label>
                <select
                    id='type'
                    name='type'
                    className='border rounded w-full py-2 px-3'
                    required
                    value={type.title}
                    onChange={(e) => setType({ id:e.target.selectedIndex, title: e.target.value })}
                >
                    {
                        jobTypes.map(jobType => (
                            <option key={jobType} value={jobType}>{jobType}</option>
                        ))
                    }
                </select>
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Job Listing Name
                </label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='eg. Beautiful Apartment In Miami'
                    required
                    value={titleMain}
                    onChange={(e) => setTitleMain(e.target.value)}
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='description' className='block text-gray-700 font-bold mb-2'>
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    className='border rounded w-full py-2 px-3'
                    rows='4'
                    placeholder='Add any job duties, expectations, requirements, etc'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <div className='mb-4'>
                <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
                    Salary
                </label>
                <select
                    id='salary'
                    name='salary'
                    className='border rounded w-full py-2 px-3'
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                >
                    {
                        salaries.map(salary => (
                            <option key={salary} value={salary}>{salary}</option>
                        ))
                    }
                </select>
            </div>

            <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                    Location
                </label>
                <input
                    type='text'
                    id='location'
                    name='location'
                    className='border rounded w-full py-2 px-3 mb-2'
                    placeholder='Company Location'
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            <div className='mb-4'>
                <label htmlFor='company' className='block text-gray-700 font-bold mb-2'>
                    Company Name
                </label>
                <input
                    type='text'
                    id='company'
                    name='company'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Company Name'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </div>

            <div className='mb-4'>
                <label htmlFor='company_description' className='block text-gray-700 font-bold mb-2'>
                    Company Description
                </label>
                <textarea
                    id='company_description'
                    name='company_description'
                    className='border rounded w-full py-2 px-3'
                    rows='4'
                    placeholder='What does your company do?'
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                ></textarea>
            </div>

            <div className='mb-4'>
                <label htmlFor='contact_email' className='block text-gray-700 font-bold mb-2'>
                    Contact Email
                </label>
                <input
                    type='email'
                    id='contact_email'
                    name='contact_email'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Email address for applicants'
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='contact_phone' className='block text-gray-700 font-bold mb-2'>
                    Contact Phone
                </label>
                <input
                    type='tel'
                    id='contact_phone'
                    name='contact_phone'
                    className='border rounded w-full py-2 px-3'
                    placeholder='Optional phone for applicants'
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
            </div>

            <div>
                <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                    {serviceTitle}
                </button>
            </div>
        </form>
    );
};

export default DetailsForm;