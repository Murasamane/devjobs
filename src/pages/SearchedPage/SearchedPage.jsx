import { useEffect, useState } from "react";
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";
import SearchedList from "../../components/SearchedList/SearchedList";
import SearchModal from "../../components/SearchModal/SearchModal";

function SearchedPage() {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <>
      {windowWidth <= 965 ? <SearchModal /> : <SearchAndFilter />}
      <SearchedList />
    </>
  );
}

export default SearchedPage;
