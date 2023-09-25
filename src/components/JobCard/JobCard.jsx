/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./JobCard.module.css";

function JobCard({ job }) {
  const {
    id,
    company,
    logo,
    position,
    postedAt,
    contract,
    location,
    logoBackground,
  } = job;
  return (
    <Link to={`/${id}`}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <img
            src={logo}
            alt=""
            style={{
              backgroundColor: logoBackground,
            }}
          />
        </div>
        <div className={styles.categories}>
          <p>{postedAt}</p>
          <span>.</span>
          <p>{contract}</p>
        </div>
        <div className={styles.description}>
          <h2>{position}</h2>
          <p>{company}</p>
        </div>
        <div className={styles.location}>
          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
