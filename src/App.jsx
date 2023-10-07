import AppLayout from "./components/AppLayout/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobsContextProvider } from "./components/Contexts/JobsContext";
import HomePage from "./pages/HomePage/HomePage";
import JobDescription from "./pages/JobDescriptionPage/JobDescription";
import SearchedPage from "./pages/SearchedPage/SearchedPage";
function App() {
  return (
    <JobsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:id" element={<JobDescription />} />
            <Route path="/searchedResults" element={<SearchedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </JobsContextProvider>
  );
}

export default App;
