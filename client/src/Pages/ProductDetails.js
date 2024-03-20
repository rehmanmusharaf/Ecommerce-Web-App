import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../Components/CSS/productdetail.css";
import { useCart } from "../Components/Context/cart";
const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  let [cart, setCart] = useCart();

  function addtocart(value) {
    let result = localStorage.getItem("cartitem");
    // console.log(result);
    if (result != null) {
      result = JSON.parse(result);
      result = [...result, value];
      setCart(result);
      localStorage.setItem("cartitem", JSON.stringify(result));
      return;
    } else {
      let result = value;
      result = [{ ...result }];
      let val = JSON.stringify(result);
      // console.log(val);
      localStorage.setItem("cartitem", val);
    }
    // localStorage.setItem('cartitem',JSON.stringify([JSON.parse()]))
  }

  function getproductdetail(slug) {
    // console.log("get Product detail funtion Run!");
    axios
      .get(process.env.REACT_APP_url + `/api/getproduct/${slug}`)
      .then((resp) => {
        // console.log(resp);
        if (resp.data.success) {
          toast.success("Product Get Successfully!");
          setProduct({ ...resp.data.resp });
        }
      })
      .catch((err) => {
        // console.log("Something Went Wrong!" + err);
        toast.error("Somethin Went Wrong!");
      });
  }
  useEffect(() => {
    getproductdetail(slug);
    // console.log(product);
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="d-flex product-detail-container">
        <div className="product-detail-container-child1 d-flex justify-content-center  align-items-center ">
          <img
            src={`${process.env.REACT_APP_url}/api/product-photo/${slug}`}
            style={{ height: "300px" }}
            alt="img here"
            width="auto"
          />
        </div>
        <div className="product-detail-container-child2 card">
          <h1 className="text-center">Produt Detail</h1>
          {product && (
            <>
              <p>Name :{product[0]?.name}</p>
              <p>Description : {product[0]?.description}</p>
              <p>Price : ${product[0]?.price}</p>
              <button
                className="btn btn-dark product-detail-cart-button"
                onClick={() => addtocart(product[0])}
              >
                Add To Cart
              </button>
              {/* <p></p> */}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
