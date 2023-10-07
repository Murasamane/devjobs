/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useJobs } from "../Contexts/JobsContext";
function Modal({
  setSearchFullTime,
  setSearchLocation,
  searchLocation,
  dispatch,
  searchQuery,
  searchFullTime,
}) {
  const navigate = useNavigate();
  const { isDark } = useJobs();
  return createPortal(
    <form
      className={`${styles.container} ${isDark ? styles.dark : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (
          searchLocation.length !== 0 ||
          searchQuery.length !== 0 ||
          searchFullTime !== false
        ) {
          dispatch({
            type: "search/mixAndMatch",
            payload: {
              searchQuery,
              searchFullTime,
              searchLocation,
            },
          });
          navigate("/searchedResults");
        }
        return;
      }}
    >
      <div className={styles.filter}>
        <label htmlFor="filter">
          <svg width="17" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.358 2.451A8.3 8.3 0 008.448 0a8.3 8.3 0 00-5.911 2.451c-2.922 2.925-3.285 8.427-.786 11.76l6.697 9.683 6.687-9.669c2.508-3.347 2.145-8.85-.777-11.774zm-5.833 8.894a3.057 3.057 0 01-3.051-3.054 3.057 3.057 0 013.05-3.055 3.057 3.057 0 013.052 3.055 3.057 3.057 0 01-3.051 3.054z"
              fill="#5964E0"
              fillRule="nonzero"
            />
          </svg>
        </label>
        <input
          type="text"
          id="filter"
          name="filter"
          placeholder="Filter by location…"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>
      <div className={styles.fullTime}>
        <input
          type="checkbox"
          id="fullTime"
          name="fullTime"
          onChange={() => setSearchFullTime((prevState) => !prevState)}
        />
        <label htmlFor="fullTime">Full Time only</label>
      </div>
      <button>Search</button>
    </form>,
    document.getElementById("portal-root")
  );
}

export default Modal;
