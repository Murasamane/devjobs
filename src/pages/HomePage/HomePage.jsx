import { useJobs } from "../../components/Contexts/JobsContext";
import JobsList from "../../components/JobsList/JobsList";
import Loader from "../../components/Loader/Loader";
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";

function HomePage() {
  const { isLoading } = useJobs();
  return (
    <>
      <SearchAndFilter />
      {!isLoading ? <JobsList /> : <Loader />}
    </>
  );
}

export default HomePage;
