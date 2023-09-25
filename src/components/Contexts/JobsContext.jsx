/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const JobsContext = createContext();

const initialState = {
  // 'loading', "error",'ready', 'active', 'finished'
  isLoading: false,
  status: "loading",
  jobs: [],
  currentJob: {},
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
    case "currentJob":
      return {
        ...state,
        currentJob: action.payload,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

function JobsContextProvider({ children }) {
  const [{ isLoading, status, jobs }, dispatch] = useReducer(
    reducer,
    initialState
  );

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

  async function getCurrentJob(id,setCity) {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${id}`);
      const data = await res.json();
      setCity(data)
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <JobsContext.Provider
      value={{
        isLoading,
        status,
        jobs,
        dispatch,
        getCurrentJob,
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
