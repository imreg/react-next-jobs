'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import logo from '/public/assets/images/react.svg';

const Navbar: React.FC = () => {
  const pathname =  usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link href="/" passHref className="flex flex-shrink-0 items-center mr-4">
                <Image className="h-10 w-auto" src={logo} alt="React Jobs" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  React Jobs
                </span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link href="/" passHref className={linkClass('/')}>
                  Home
                </Link>
                <Link href="/jobs" passHref className={linkClass('/jobs')}>
                  Jobs
                </Link>
                <Link href="/jobs/add" passHref className={linkClass('/jobs/add')}>
                  Add Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;