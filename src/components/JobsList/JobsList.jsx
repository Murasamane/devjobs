import { useJobs } from "../Contexts/JobsContext";
import styles from "./JobsList.module.css";
import JobCard from "../JobCard/JobCard";

function JobsList() {
  const { jobs } = useJobs();
  return (
    <main className={styles.main}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  );
}

export default JobsList;
