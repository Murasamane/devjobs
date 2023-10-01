/* eslint-disable react/prop-types */
import { useJobs } from "../Contexts/JobsContext";
import styles from "./Footer.module.css";

function Footer({ currentJob }) {
  const { isDark } = useJobs();
  return (
    <footer className={`${styles.footer} ${isDark ? styles.darkFooter : ""}`}>
      <div className={styles.container}>
        <h2>{currentJob.position}</h2>
        <p>{currentJob.company}</p>
      </div>
      <button className={styles.applyBtn}>Apply Now</button>
    </footer>
  );
}

export default Footer;
