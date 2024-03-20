import React from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div
        className="d-flex justify-content-center  align-items-center flex-column "
        style={{ height: "100%" }}
      >
        <h1>Page Not Found!</h1>
        <button
          className="btn btn-dark"
          onClick={() => {
            navigate(-1);
          }}
        >
          Page Not Found
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
