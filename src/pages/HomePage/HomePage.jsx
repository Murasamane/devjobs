import { useEffect, useState } from "react";
import { useJobs } from "../../components/Contexts/JobsContext";
import JobsList from "../../components/JobsList/JobsList";
import Loader from "../../components/Loader/Loader";
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";
import SearchModal from "../../components/SearchModal/SearchModal";
function HomePage() {
  const { isLoading } = useJobs();
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <>
      {windowWidth <= 965 ? <SearchModal /> : <SearchAndFilter />}
      {!isLoading ? <JobsList /> : <Loader />}
    </>
  );
}

export default HomePage;
