/* eslint-disable react/prop-types */
import { useJobs } from "../Contexts/JobsContext";
import Footer from "../Footer/Footer";
import styles from "./JobsDetail.module.css";

function JobsDetail({ currentJob }) {
  const { isDark } = useJobs();
  return (
    <>
      <div className={`${styles.jobContainer} ${isDark ? styles.dark : ""}`}>
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
              <a href={currentJob.website} target="_blank" rel="noreferrer">
                Company Site
              </a>
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
        <Footer currentJob={currentJob} />
      </div>
    </>
  );
}

export default JobsDetail;
