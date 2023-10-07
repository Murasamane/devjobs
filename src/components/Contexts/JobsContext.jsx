/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import data from "../../../data/data.json";
const JobsContext = createContext();

const initialState = {
  // 'loading', "error",'ready', 'active', 'finished'
  isLoading: false,
  status: "loading",
  jobs: [],
  currentJob: {},
  isDark: false,
  searchResult: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "jobs/fetching":
      return {
        ...state,
        isLoading: true,
      };

    case "dataLoaded":
      return {
        ...state,
        isLoading: false,
        status: "ready",
        jobs: action.payload,
      };
    case "currentJob/loading":
      return {
        ...state,
        currentJob: {},
        isLoading: true,
      };
    case "currentJob":
      return {
        ...state,
        isLoading: false,
        currentJob: action.payload,
      };

    case "darkMode":
      return {
        ...state,
        isDark: !state.isDark,
      };
    case "search/mixAndMatch":
      const { searchQuery, searchLocation, searchFullTime } = action.payload;

      // Create separate arrays for each criterion's filters
      const filters = [];

      // Check if the searchQuery is filled
      if (searchQuery.length > 0) {
        filters.push(
          (job) =>
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.position.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Check if the searchLocation is filled
      if (searchLocation) {
        filters.push(
          (job) => job.location.toLowerCase() === searchLocation.toLowerCase()
        );
      }

      // Check if searchFullTime is true
      if (searchFullTime) {
        filters.push((job) => job.contract === "Full Time");
      }

      // Apply the filters conditionally
      let filteredResult = state.jobs;
      if (filters.length > 0) {
        filteredResult = state.jobs.filter((job) =>
          filters.every((filter) => filter(job))
        );
      }

      return {
        ...state,
        searchResult: filteredResult,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

// searchFullTime : true searchLocation : "New York" searchQuery : "earth"

function JobsContextProvider({ children }) {
  const [
    { isLoading, status, jobs, currentJob, isDark, searchResult },
    dispatch,
  ] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   async function getJobs() {
  //     dispatch({ type: "jobs/fetching" });
  //     try {
  //       const res = await fetch("http://localhost:3000/jobs");
  //       const data = await res.json();

  //       dispatch({ type: "dataLoaded", payload: data });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  //   getJobs();
  // }, []);

  // Mock data Fetching , real stuff is code before !!!!
  useEffect(() => {
    dispatch({ type: "jobs/fetching" });
    setTimeout(() => {
      dispatch({ type: "dataLoaded", payload: data.jobs });
    }, 500);

    return () => {};
  }, []);

  // const getCurrentJob = useCallback(async function getCurrentJob(id) {
  //   dispatch({ type: "currentJob/loading" });
  //   try {
  //     const res = await fetch(`http://localhost:3000/jobs/${id}`);
  //     const data = await res.json();
  //     dispatch({ type: "currentJob", payload: data });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, []);

  // Mock current job fetch original with server fetch before this code
  const getCurrentJob = useCallback(function getCurrentJob(id) {
    dispatch({ type: "currentJob/loading" });
    const currJob = data.jobs.filter((job) => job.id === +id);
    dispatch({ type: "currentJob", payload: currJob[0] });
  }, []);
  function toggleMode() {
    dispatch({ type: "darkMode" });
  }
  return (
    <JobsContext.Provider
      value={{
        isLoading,
        status,
        jobs,
        currentJob,
        dispatch,
        getCurrentJob,
        toggleMode,
        isDark,
        searchResult,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

function useJobs() {
  const context = useContext(JobsContext);
  if (context === undefined)
    throw new Error("Context is being used outside of JobsContext Provider");
  return context;
}

export { JobsContextProvider, useJobs };
