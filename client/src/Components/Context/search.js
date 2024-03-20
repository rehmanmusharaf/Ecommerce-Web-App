import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let SearchContext = createContext();
const Search = ({ children }) => {
  let [search, setSearch] = useState({ keyword: "", result: [] });
  // let location = useLocation();
  useEffect(() => {
    if (!window.location.pathname.startsWith("/search")) {
      console.log("Current Path : ", window.location.pathname);
    }
  }, []);
  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

export default Search;
let useSearch = () => useContext(SearchContext);
export { useSearch };
