import React, { useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Context/Auth";
import { Link } from "react-router-dom";
import "../../Components/CSS/validationpages.css";

function Login() {
  let location = useLocation();
  let [auth, setAuth] = useAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [validationtext, setValidationtext] = useState({
    email: "none",
    message: "",
  });
  const handlesubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log("handlesubmit run!");
    try {
      await axios({
        method: "POST",
        url: process.env.REACT_APP_url + "/api/login",
        data: {
          email: email,
          password: password,
        },
      })
        .then((resp) => {
          // console.log(resp);
          if (resp.data.success) {
            // console.log(resp.data);
            localStorage.setItem("auth", JSON.stringify(resp.data));
            let data = resp.data;
            let obj = { ...data };
            delete obj.token;
            setAuth((prevval) => {
              // console.log(data);
              return { ...prevval, user: obj, token: data.token };
            });
            setValidationtext((prevval) => {
              return { ...prevval, email: "none", message: "" };
            });
            setLoading(false);
            navigate(location.state || "/");
            return;
          } else {
            setLoading(false);

            setValidationtext((prevval) => {
              return { ...prevval, email: "block", message: resp.data.message };
            });
            // console.log("validation", validationtext);
          }
        })
        .catch((error) => {
          setValidationtext((prevval) => {
            return {
              ...prevval,
              email: "block",
              message: error.response.data.message,
            };
          });
          setLoading(false);
          // console.log("404 error ", error.response.data);
          // console.log(error.response.data);
        });
    } catch (error) {
      // console.log("err ", error);
    }
  };
  return (
    <Layout
      title="Login- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <form
        onSubmit={handlesubmit}
        className="mx-auto my-3 login-form"
        style={{ width: "50%" }}
      >
        <div className="mb-3 d-flex login-input-container">
          <label
            htmlFor="exampleInputemail"
            className="form-label me-2 fs-4 bold"
            style={{ width: "20%" }}
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
        <div className="mb-3 d-flex login-input-container">
          <label
            htmlFor="exampleInputpassword"
            className="form-label me-2 bold fs-4"
            style={{ width: "20%" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputpassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <p
          className=" text-danger text-node"
          style={{
            width: "80%",
            marginLeft: "auto",
            padding: "0px",
            display: validationtext.email,
          }}
        >
          {validationtext.message}
        </p>

        <Link
          className="text-node"
          to="/forgot-password"
          style={{
            textDecoration: "none",
            width: "82%",
            marginLeft: "auto",
            display: "block",
          }}
        >
          Forgot password
        </Link>
        <div
          style={{ width: "82%", marginLeft: "auto" }}
          className="button-node"
        >
          <button type="submit" className="btn btn-primary my-2 bg-dark ">
            {loading && (
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}{" "}
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
