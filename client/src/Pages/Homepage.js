import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useAuth } from "../Components/Context/Auth";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Categories from "./Categories";
import Card from "../Components/Card";
import "../Components/CSS/Home.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Aboutme from "../Components/Aboutme";

const Homepage = () => {
  let [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [categoryfilter, setCategoryfilter] = useState([]);
  const [filterstyle, setFilterstyle] = useState(true);
  //  useState({
  //   filterbutton: { display: "none" },
  //   filterbar: { display: "block" },
  // });

  let [pricefilter, setPricefilter] = useState([
    { startprice: 1, lastprice: 10 },
    { startprice: 11, lastprice: 20 },
    { startprice: 21, lastprice: 30 },
    { startprice: 31, lastprice: 40 },
    { startprice: 41, lastprice: 50 },
    { startprice: 51, lastprice: 100000 },
  ]);

  let [filter, setFilter] = useState([]);
  function setfilterprice(e) {
    let array = e.target.value.split("-");
    array = array.map(Number);
    setFilter(array);
    e.target.checked = true;
    // console.log(array);
  }
  function filterprice(price) {
    if (filter.length !== 0) {
      let check = price >= filter[0] && price <= filter[1] ? true : false;
      return check;
    }
    return true;
  }
  function func(name, filter) {
    if (filter) {
      setCategoryfilter((prev) => [...prev, name]);
      return;
    }
    let newarray = categoryfilter.filter((item) => item != name);
    setCategoryfilter([...newarray]);
  }

  async function getcategory() {
    try {
      const resp = await axios.get(
        process.env.REACT_APP_url + "/api/getcategory"
      );
      if (!resp.data.success) {
        toast.error("Something Went Wrong");
        return;
      }
      setCategory((prev) => [...prev, ...resp.data.resp]);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }

  async function getallproduct() {
    try {
      const resp = await axios.get(
        process.env.REACT_APP_url + "/api/getproduct"
      );
      if (resp.data.success) {
        // console.log(resp.data.resp);
        setProduct((prev) => [...prev, ...resp.data.resp]);
        return;
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }
  const handleMediaQuery = () => {
    // console.log("Handle Media Queries! ");
    if (window.innerWidth < 800) {
      setFilterstyle(false);
    } else {
    }
  };

  useEffect(() => {
    getcategory();
    getallproduct();
    handleMediaQuery();
  }, []);

  return (
    <Layout
      title="Ecommerce-app"
      description="Ecommerce site to buy Home Essentials"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      {!filterstyle && (
        <button
          className="btn btn-success apply-filter"
          style={filterstyle.filterbutton}
          onClick={() => {
            setFilterstyle(true);
          }}
        >
          Apply Filter
        </button>
      )}
      <div className="d-flex overflow-hidden">
        {filterstyle && (
          <div
            className=" filters border"
            style={{ minHeight: "350px", height: "auto" }}
          >
            <div className="d-flex justify-content-between ">
              <h3>Categories</h3>
              <CancelIcon
                className="fs-1 cancel-icon"
                onClick={() => {
                  setFilterstyle(false);
                }}
              />
            </div>
            {category.length > 0 ? (
              <Categories category={category} func={func} />
            ) : (
              ""
            )}
            <h3>Price Filter</h3>
            {pricefilter?.map((value, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={`filter${index}`}
                    name="filter"
                    value={`${value.startprice}-${value.lastprice}`}
                    onChange={(e) => {
                      setfilterprice(e);
                    }}
                  />
                  <label htmlFor={`filter${index}`}>
                    {pricefilter.length - 1 == index
                      ? "$" + value.startprice + " or more"
                      : "$" + value.startprice + " to " + value.lastprice}
                  </label>
                </div>
              );
            })}
            <label htmlFor="clearfilter" className="btn btn-danger w-75  py-2">
              Reset Filter
            </label>
            <input
              className=" "
              onClick={() => setFilter([])}
              type="radio"
              name="filter"
              style={{ display: "none" }}
              id="clearfilter"
            />
          </div>
        )}

        <div className="product-display-section">
          {category.length > 0 ? (
            category.map((value, index) => (
              <div key={index} className={index}>
                <React.Fragment>
                  {categoryfilter.length == 0 ? (
                    <div>
                      <h1>{value.name}</h1>
                      <div className="d-flex flex-wrap">
                        {product?.map(
                          (value2, index2) =>
                            filterprice(value2.price) &&
                            value2.category === value._id && (
                              <Card
                                value={value}
                                value2={value2}
                                key={index2}
                              />
                            )
                        )}
                      </div>
                    </div>
                  ) : categoryfilter.includes(value.name) ? (
                    <div>
                      <h1>{value.name}</h1>
                      <div className="d-flex flex-wrap">
                        {product?.map(
                          (value2, index2) =>
                            filterprice(value2.price) && (
                              <div key={index2}>
                                {value2.category === value?._id && (
                                  <Card value2={value2} />
                                )}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
      <hr />
      <Aboutme />
    </Layout>
  );
};

export default Homepage;
