import Hero from './components/Hero';
import HomeCards from "./components/HomeCards";
import JobList from "./components/JobList";
import ViewAllJobs from "./components/ViewAllJobs";

const Page: React.FC = () => {
    return (
        <>
            <Hero />  
            <HomeCards />
            <JobList isHome={true} />
            <ViewAllJobs />
        </>
    );
};

export default Page;