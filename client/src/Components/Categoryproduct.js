import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
const Categoryproduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  let [currentcategory, setCurrentcategory] = useState("Allcatgory");
  function getcategory() {
    // console.log("parameters", slug);

    axios
      .get(process.env.REACT_APP_url + "/api/getproduct")
      .then((resp) => {
        if (resp.data.success) {
          setProduct([...resp.data.resp]);
          axios
            .get(process.env.REACT_APP_url + "/api/getcategory")
            .then((resp) => {
              if (resp.data.success) {
                // console.log("Response Get : ", resp.data.resp);
                const cat = [...resp.data.resp];
                // console.log("all categories : ", cat);

                setCategory([...resp.data.resp]);
                return;
              }
              // console.log("Something Went Wrong With REsponse!");
            });
          return;
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  function productcount(id) {
    let count = 0;
    product?.forEach((value, index) => {
      if (value.category == id) {
        count += 1;
      }
    });
    category?.forEach((value, index) => {
      if (value._id == slug) {
        document.title = value.name;
      }
    });
    return count;
  }
  useEffect(() => {
    getcategory();
  }, []);
  return (
    <Layout
      title="All Categories"
      description="Different Categories Products"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div className="d-flex flex-wrap ">
        {slug == "allcategory" ? (
          category?.map((value, index) => {
            return (
              <Link
                to={`/category/${value._id}`}
                className="btn btn-outline-dark fs-1"
                style={{ width: "35%", margin: "10px auto" }}
              >
                {value.name}
              </Link>
            );
          })
        ) : (
          <>
            <h4 className=" text-center d-block w-100 ">
              {productcount(slug) + "  Product Found"}
            </h4>
            {product?.map((value, index) => {
              return value.category === slug ? (
                <Card value2={value} key={index} />
              ) : (
                ""
              );
            })}{" "}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Categoryproduct;
