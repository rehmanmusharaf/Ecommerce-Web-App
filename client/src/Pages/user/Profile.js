import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Usermenu from "../../Components/Usermenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Context/Auth";
import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  let navigate = useNavigate();
  let [auth, setAuth] = useAuth();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [ques, setQues] = useState("");
  let [newpassword, setNewpassword] = useState("");
  let [updatepass, setUpdatepass] = useState(false);

  let [validationtext, setValidationtext] = useState({
    email: "none",
    message: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit run!");
    try {
      await axios({
        method: "PUT",
        url: process.env.REACT_APP_url + "/api/updatprofile",
        data: {
          name: name,
          email: email,
          password: password,
          newpassword: newpassword == "" ? false : newpassword,
          Phone: phone,
          address: address,
          answer: ques,
        },
      })
        .then(async (resp) => {
          if (resp.data.success) {
            setValidationtext((prevval) => {
              return { ...prevval, email: "none", message: "" };
            });
            let userdata = await JSON.parse(localStorage.getItem("auth"));
            console.log(userdata);
            let updatedata = {
              ...userdata,
              name: name,
              email: email,
              phone: phone,
              address: address,
              answer: ques,
            };
            localStorage.setItem("auth", JSON.stringify(updatedata));
            setAuth((prev) => {
              return {
                ...prev,
                user: {
                  ...prev.user,
                  name: name,
                  phone: phone,
                  address: address,
                  answer: ques,
                },
              };
            });
            toast.success("Profile Updated Successfully!");
            if (newpassword) {
              localStorage.removeItem("auth");
              setAuth((prevval) => {
                return { ...prevval, user: null, token: "" };
              });
              navigate("/login");
            }
            // navigate("/");
          } else {
            toast.error("Something Went Wrong");
            setValidationtext((prevval) => {
              return { ...prevval, email: "block", message: resp.data.message };
            });
            console.log(resp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("err ", error);
    }
  };

  async function setuserdata() {
    const { name, email, address, phone, answer } = auth?.user;
    // console.log(auth);
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setQues(answer);
  }
  useEffect(() => {
    setuserdata();
  }, []);

  return (
    <Layout
      title="Profile- Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div style={{ marginTop: "10px" }}>
        <div className="d-flex justify-content-evenly  ">
          <div style={{ width: "25%" }}>
            <Usermenu />
          </div>
          <div style={{ width: "70%" }}>
            <div>
              <form
                onSubmit={handlesubmit}
                className="mx-auto my-3 profile-form"
                style={{ width: "90%" }}
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
                    disabled={true}
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
                <div className="mb-3 d-flex register-form-container">
                  <label
                    htmlFor="exampleInputpassword"
                    className="form-label me-2 bold fs-4 forgot-input-container-child1"
                    style={{ width: "20%" }}
                  >
                    {updatepass ? "Old Password" : "Password"}
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

                {updatepass && (
                  <div className="mb-3 d-flex register-form-container">
                    <label
                      htmlFor="exampleInputpassword"
                      className="form-label me-2 bold fs-4 forgot-input-container-child1"
                      style={{ width: "20%" }}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputpassword "
                      value={newpassword}
                      onChange={(e) => {
                        setNewpassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                )}
                <div className="mb-3 form-check register-form-container">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={() =>
                      updatepass ? setUpdatepass(false) : setUpdatepass(true)
                    }
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Update Passowrd
                  </label>
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
                  <button
                    type="submit"
                    className="btn btn-primary my-2 bg-dark "
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
