import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { useSearch } from "../Components/Context/search";
import Card from "../Components/Card";
const Search = () => {
  const [search, setSearch] = useSearch();
  function searchset() {
    setSearch("");
  }
  useEffect(() => {
    // searchset();
    // setSearch("");
    // console.log(search.result);
  });
  return (
    <Layout>
      {search?.result?.length == 0 ? (
        <h3>No Product Found</h3>
      ) : (
        <h3>{search?.result?.length} Product Found</h3>
      )}
      <div className="d-flex flex-wrap ">
        {search?.result?.map((value, index) => {
          return <Card value2={value} key={index} />;
        })}
      </div>
    </Layout>
  );
};

export default Search;
