import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobs } from "../../components/Contexts/JobsContext";
import Loader from "../../components/Loader/Loader";
import JobsDetail from "../../components/JobsDetails/JobsDetail";
function JobDescription() {
  const { getCurrentJob, currentJob, isLoading } = useJobs();
  const { id } = useParams();
  useEffect(() => {
    getCurrentJob(id);
  }, [id, getCurrentJob]);

  return isLoading ? <Loader /> : <JobsDetail currentJob={currentJob} />;
}

export default JobDescription;
