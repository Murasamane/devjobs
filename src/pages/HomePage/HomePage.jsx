import JobsList from "../../components/JobsList/JobsList";
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";

function HomePage() {
  return (
    <>
      <SearchAndFilter />
      <JobsList />
    </>
  );
}

export default HomePage;
