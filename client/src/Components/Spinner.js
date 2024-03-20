import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "/login" }) => {
  let location = useLocation();
  let navigate = useNavigate();
  let [count, setCount] = useState(5);

  useEffect(() => {
    let clearinter = setInterval(() => {
      setCount((prevval) => {
        const newCount = prevval - 1;
        // console.log(newCount); // Log the updated value
        return newCount;
      });
    }, 1000);
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (count === 0) {
      // console.log("if condiiton run!");
      navigate(`${path}`, { state: location.pathname });
    }
  }, [count]);

  return (
    <>
      <div
        className="text-center d-flex justify-content-center align-items-center "
        style={{ height: "100vh", width: "100%" }}
      >
        <h1>Redirecting you in {count} Second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
