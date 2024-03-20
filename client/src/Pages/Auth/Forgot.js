import React, { useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Context/Auth";
import { Link } from "react-router-dom";
import "../../Components/CSS/validationpages.css";
const Forgot = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [sport, setSport] = useState("");
  let [password, setPassword] = useState("");

  let [validationtext, setValidationtext] = useState({
    email: "none",
    message: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log("handlesubmit run!");
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_url + "/api/forgotpassword",
        data: {
          email: email,
          sport,
          newpassword: password,
        },
      })
        .then((resp) => {
          if (resp.data.success) {
            // console.log(resp);
            navigate("/login");
            return;
          } else {
            setValidationtext((prevval) => {
              return { ...prevval, email: "block", message: resp.data.message };
            });
            // console.log(resp.data);
          }
        })
        .catch((error) => {
          // console.log(error.response.data);
        });
    } catch (error) {
      // console.log("err ", error);
    }
  };
  return (
    <Layout
      title="Forgot- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <form
        onSubmit={handlesubmit}
        className="mx-auto my-3 forgot-password-form"
        style={{ width: "70%" }}
      >
        <div className="mb-3 d-flex forgot-input-container">
          <label
            htmlFor="exampleInputemail"
            className="form-label me-2 fs-4 bold forgot-input-container-child1"
            style={{ width: "35%" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputemail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3 d-flex forgot-input-container">
          <label
            htmlFor="exampleInputpassword"
            className="form-label me-2 bold fs-4 forgot-input-container-child1"
            style={{ width: "35%" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputpassword "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3 d-flex forgot-input-container">
          <label
            htmlFor="exampleInputsport"
            className="form-label me-2 bold fs-4 forgot-input-container-child1"
            style={{ width: "35%" }}
          >
            Favourite Sport Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputsport "
            value={sport}
            onChange={(e) => {
              setSport(e.target.value);
            }}
            required
          />
        </div>
        <p
          className=" text-danger "
          style={{
            width: "72%",
            marginLeft: "auto",
            padding: "0px",
            display: validationtext.email,
          }}
        >
          {validationtext.message}
        </p>

        <div
          style={{ width: "72%", marginLeft: "auto" }}
          className="button-node"
        >
          <button type="submit" className="btn btn-primary my-2 bg-dark ">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Forgot;
