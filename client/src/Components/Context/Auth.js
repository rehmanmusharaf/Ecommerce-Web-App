import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let AuthContext = createContext();

const Auth = ({ children }) => {
  let [auth, setAuth] = useState({ user: null, token: "" });
  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    // const handleStorageChange = () => {
    let resp = localStorage.getItem("auth");

    if (resp) {
      setAuth((prevval) => {
        resp = JSON.parse(resp);
        let obj = { ...resp };
        delete obj.token;

        // console.log(obj);
        // console.log(resp.token);

        return {
          ...prevval,
          user: obj,
          token: resp.token,
        };
      });
      // console.log(resp);
    }
    // };
    // Cleanup function to remove the event listener when component unmounts
    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
let useAuth = () => useContext(AuthContext);

export { useAuth };
