import { useJobs } from "../Contexts/JobsContext";
import JobCard from "../JobCard/JobCard";
import styles from "./SearchedList.module.css";

function SearchedList() {
  const { searchResult } = useJobs();

  if(searchResult.length === 0){
    return <h2 className={styles.placeholder}>No Search Input</h2>
  }
  return (
    <main className={styles.main}>
      {searchResult.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  );
}

export default SearchedList;
