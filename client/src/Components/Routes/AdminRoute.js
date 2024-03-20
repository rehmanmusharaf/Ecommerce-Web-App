import Spinner from "../Spinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
const Adminroute = () => {
  const [token, setToken] = useState("");
  let [ok, setOk] = useState(false);
  async function usercheck() {
    let storedtoken = localStorage.getItem("auth");
    storedtoken = await JSON.parse(storedtoken);
    // console.log(storedtoken.token);
    setToken(storedtoken?.token);
    // console.log(token);
    if (token) {
      // console.log("if condition run");
      // console.log(storedtoken?.email);
      await axios({
        method: "POST",
        url: process.env.REACT_APP_url + "/api/admin-auth",
        data: {
          email: storedtoken.email,
          token: storedtoken?.token,
        },
      })
        .then((resp) => {
          if (resp.data.ok) {
            setOk(true);
          }
          // console.log(resp.data);
        })
        .catch((error) => {
          console.log("Error", error.response.data);
        });
    }
  }

  useEffect(() => {
    // console.log("token got change useEffect Run!");
    usercheck();
  }, [token]);

  return ok ? <Outlet /> : <Spinner path="/" />;
};

export default Adminroute;
