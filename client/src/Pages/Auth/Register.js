import React, { useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
function Register() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [ques, setQues] = useState("");
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
        url: process.env.REACT_APP_url + "/api/createuser",
        data: {
          name: name,
          email: email,
          password: password,
          Phone: phone,
          address: address,
          ques: ques,
        },
      })
        .then((resp) => {
          if (resp.data.success) {
            setValidationtext((prevval) => {
              return { ...prevval, email: "none", message: "" };
            });
            navigate("/login");
          } else {
            setValidationtext((prevval) => {
              return { ...prevval, email: "block", message: resp.data.message };
            });
            // console.log(resp);
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } catch (error) {
      // console.log("err ", error);
    }
  };
  return (
    <Layout
      title="Register- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <form
        onSubmit={handlesubmit}
        className="mx-auto my-3 register-form"
        style={{ width: "50%" }}
      >
        <div className="mb-3 d-flex register-form-container">
          <label
            htmlFor="exampleInputname"
            className="form-label fs-4 bold me-2"
            style={{ width: "20%" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3 d-flex register-form-container">
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
        <div className="mb-3 d-flex register-form-container">
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
            id="exampleInputpassword "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3 d-flex register-form-container">
          <label
            htmlFor="exampleInputphone"
            className="form-label me-2 bold fs-4"
            style={{ width: "20%" }}
          >
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputphone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-3 d-flex register-form-container">
          <label
            htmlFor="exampleInputaddress"
            className="form-label me-2 bold fs-4"
            style={{ width: "20%" }}
          >
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputaddress"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-3 d-flex register-form-container">
          <label
            htmlFor="exampleInputquest"
            className="form-label me-2 bold fs-4 forgot-input-container-child1"
            style={{ width: "20%" }}
          >
            favuorite Sport
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputquest"
            placeholder="Cricket, Football, Hocky"
            value={ques}
            onChange={(e) => {
              setQues(e.target.value);
            }}
            required
          />
        </div>

        <p
          className=" text-danger "
          style={{
            width: "80%",
            marginLeft: "auto",
            padding: "0px",
            display: validationtext.email,
          }}
        >
          {validationtext.message}
        </p>

        <div
          style={{ width: "82%", marginLeft: "auto" }}
          className="button-node"
        >
          <button type="submit" className="btn btn-primary my-2 bg-dark ">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Register;
