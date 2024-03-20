import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Componentcss.css";
import { useAuth } from "./Context/Auth";
import axios from "axios";
import Searchinput from "./Searchinput";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import "./CSS/headfoot.css";
const Header = () => {
  let [dropdownstyle, setDropdownstyle] = useState({
    width: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });
  let [auth, setAuth] = useAuth();
  let [category, setCategory] = useState([]);
  function handlelogout() {
    // console.log("handle logout run");
    localStorage.removeItem("auth");
    setAuth((prevval) => {
      return { ...prevval, user: null, token: "" };
    });
    // console.log(auth);
  }
  function getcategory() {
    try {
      axios
        .get(process.env.REACT_APP_url + "/api/getcategory")
        .then((resp) => {
          if (resp.data.success) {
            // console.log(resp.data.resp);
            setCategory((prev) => [...prev, ...resp.data.resp]);
          }
        })
        .catch((err) => {
          // console.log("err", err);
        });
    } catch (error) {}
  }
  function handledashboard() {}
  useEffect(() => {
    getcategory();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-light ">
        <div className="container-fluid">
          <Link
            className="navbar-brand text-light header-heading"
            to="/"
            style={{ fontSize: "1.5rem" }}
          >
            <LocalGroceryStoreIcon /> Ecommerce App
          </Link>
          <button
            className="navbar-toggler bg-light hamburger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-light "></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-content"
            id="navbarSupportedContent"
          >
            <Searchinput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle fs-5 "
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item text-dark"
                      to={`/category/allcategory`}
                    >
                      All Categories
                    </Link>
                  </li>
                  {category?.length > 0
                    ? category?.map((value, index) => {
                        return (
                          <li key={index}>
                            <Link
                              className="dropdown-item text-dark"
                              to={`/category/${value._id}`}
                            >
                              {value.name}
                            </Link>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </li>
              {auth.user === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fs-5 "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name.split(" ")[0]}
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link
                        className="dropdown-item text-dark"
                        to="/login"
                        onClick={handlelogout}
                      >
                        Logout
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-dark"
                        to={`${
                          auth?.user?.role == 0
                            ? "/dashboard/user"
                            : "/dashboard/admin"
                        }`}
                        // onClick={handledashboard}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link fs-5" to="/logincheck/cartpage">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
