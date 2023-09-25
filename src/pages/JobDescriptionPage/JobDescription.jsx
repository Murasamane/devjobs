import { useEffect, useState } from "react";
import styles from "./JobDescription.module.css";
import { useParams } from "react-router-dom";
import { useJobs } from "../../components/Contexts/JobsContext";

function JobDescription() {
  const [currentJob, setCurrentJob] = useState({});
  const { getCurrentJob } = useJobs();
  const { id } = useParams();
  useEffect(() => {
    getCurrentJob(id, setCurrentJob);
  }, [id, getCurrentJob]);

  return (
    <div className={styles.jobContainer}>
      <header className={styles.header}>
        <div
          className={styles.imageContainer}
          style={{
            backgroundColor: currentJob.logoBackground,
          }}
        >
          <img src={currentJob.logo} alt={`${currentJob.company} logo`} />
        </div>
        <div className={styles.headerFlexbox}>
          <div className={styles.descriptions}>
            <h2>{currentJob.company}</h2>
            <p>{currentJob.company}.com</p>
          </div>
          <div className={styles.companyLink}>
            <a href="">Company Site</a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.jobApply}>
          <div role="titles" className={styles.titlesContainer}>
            <div className={styles.categories}>
              <span>{currentJob.postedAt}</span>
              <span>.</span>
              <span>{currentJob.contract}</span>
            </div>
            <h2>{currentJob.position}</h2>
            <p>{currentJob.location}</p>
          </div>
          <button className={styles.applyBtn}>Apply Now</button>
        </div>

        <div role="job description" className={styles.JobDescription}>
          <p className={styles.jobParagraph}>{currentJob.description}</p>
          <div className={styles.requirements}>
            <h3>Requirements</h3>
            <p>{currentJob?.requirements?.content}</p>
            <ul>
              {currentJob?.requirements?.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div role="job description" className={styles.JobDescription}>
          <p className={styles.jobParagraph}>{currentJob.description}</p>
          <div className={styles.requirements}>
            <h3>What You Will Do</h3>
            <p>{currentJob?.role?.content}</p>
            <ol>
              {currentJob?.role?.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
         <div>
          <h2>{currentJob.position}</h2>
          <p>{currentJob.company}</p>
         </div>
         <button className={styles.applyBtn}>Apply Now</button>
      </footer>

    </div>
  );
}

export default JobDescription;
