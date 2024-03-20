import React from "react";
import { useSearch } from "./Context/search";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Searchinput = () => {
  let [search, setSearch] = useSearch();
  const navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    try {
      axios
        .get(process.env.REACT_APP_url + `/api/search/${search.keyword}`)
        .then((resp) => {
          if (resp.data.success) {
            setSearch({ ...search, result: [...resp.data.result] });
            navigate(`/search/${search.keyword}`);
            return;
          }
          // console.log("Something Went WRong With Response!");
          return;
        })
        .catch((error) => {
          // console.log("Something Went Wrong!");
        });
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <form className="d-flex ms-auto" onSubmit={handlesubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search.keyword}
        onChange={(e) => {
          setSearch({ ...search, keyword: e.target.value });
        }}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Searchinput;
