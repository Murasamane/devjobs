/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const JobsContext = createContext();

const initialState = {
  // 'loading', "error",'ready', 'active', 'finished'
  isLoading: false,
  status: "loading",
  jobs: [],
  currentJob: {},
  isDark: false,
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
    default:
      throw new Error("Unknown Action Type");
  }
}

function JobsContextProvider({ children }) {
  const [{ isLoading, status, jobs, currentJob, isDark }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    async function getJobs() {
      dispatch({ type: "jobs/fetching" });
      try {
        const res = await fetch("http://localhost:3000/jobs");
        const data = await res.json();

        dispatch({ type: "dataLoaded", payload: data });
      } catch (err) {
        console.log(err.message);
      }
    }
    getJobs();
  }, []);

  const getCurrentJob = useCallback(async function getCurrentJob(id) {
    dispatch({ type: "currentJob/loading" });
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`);
      const data = await res.json();
      dispatch({ type: "currentJob", payload: data });
    } catch (err) {
      console.log(err.message);
    }
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
