import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../Components/Context/cart";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/Auth";
import "../Components/CSS/cartpage.css";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
  let [auth] = useAuth();
  let [clientToken, setClientToken] = useState("");
  let [instance, setInstance] = useState("");
  let [loading, setLoading] = useState(false);
  let [cart, setCart] = useCart();
  let [error, setError] = useState(false);

  const navigate = useNavigate();
  async function handlepayment() {
    try {
      setLoading(true);
      setError(false);
      const { nonce } = await instance.requestPaymentMethod();
      const token = auth?.token;
      const id = auth?.user?.id;
      const { data } = await axios.post(
        process.env.REACT_APP_url + "/api/braintree/payment",
        {
          nonce,
          cart,
          token,
          id: id,
        }
      );
      // console.log(data);
      setLoading(false);
      localStorage.removeItem("cartitem");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      // console.log(error);
      setError(true);
      setLoading(false);
    }
  }
  function totalset() {
    // console.log("during total cart", cart);
    setTotal((prev) => {
      if (localStorage.getItem("cartitem")) {
        let newTotal = JSON.parse(localStorage.getItem("cartitem"))?.map(
          (value, index) => value.price
        );
        let total = newTotal?.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        return total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      }
    });
  }
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_url + "/api/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      // console.log("error", error);
    }
  };
  useEffect(() => {
    totalset();
    getToken();

    // console.log("Addres is : ", auth?.user?.address);
  }, []);

  let [total, setTotal] = useState(0);
  function removeitem(id) {
    let cartarray = localStorage.getItem("cartitem");
    cartarray = JSON.parse(cartarray);
    let indextofind = cartarray.findIndex((item) => item._id == id);
    // console.log(indextofind);
    cartarray.splice(indextofind, 1);
    setCart([...cartarray]);
    cartarray = JSON.stringify([...cartarray]);
    localStorage.setItem("cartitem", cartarray);
    totalset();
  }
  return (
    <Layout
      title="Cart- Ecommerce-app"
      description="Ecommerce site cart page"
      author="Muhammad Rehman"
      keywords="html, css, js, reactjs, nodejs, express"
    >
      <div className="d-flex flex-wrap cartpage-container">
        <div className="cartpage-container-child1 ">
          {cart.length == 0 ? (
            <h2>No Product Exist in Cart</h2>
          ) : (
            <>
              <h2 className="text-center">
                {cart.length} Product Exist In cart
              </h2>
              {cart?.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="my-2 d-flex rounded "
                    style={{ border: "0.2px solid grey" }}
                  >
                    <div className="w-25 d-flex align-items-center ">
                      <img
                        className="cartpage-img"
                        src={`${process.env.REACT_APP_url}/api/product-photo/${value._id}`}
                        alt=""
                        style={{ height: "auto", width: "100px" }}
                      />
                    </div>
                    <div className=" w-75 ">
                      <div className="d-flex w-100">
                        <div className="cartpage-item-child1">
                          <h5>{value.name}</h5>
                          <p className="ellipsis mb-0">{value.description}</p>
                          <p className="text-success fs-5 mb-0">
                            ${value.price}
                          </p>
                        </div>
                        <div className="d-flex align-items-end ms-auto cartpage-item-child2 justify-content-end my-2 mx-1">
                          <DeleteIcon
                            onClick={() => removeitem(value._id)}
                            className="delete-icon fs-2"
                          />
                          {/* <button
                            className="btn btn-danger "
                            
                          >
                            Remove From Cart
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="cartpage-container-child2">
          <div className=" w-75 mx-auto" style={{ minHeight: "50vh" }}>
            <h3>Cart Summary</h3>
            <p>Total | Checkout | Payment</p>
            <hr />
            <p className="fs-3">Total : {total}</p>

            {clientToken && cart.length > 0 ? (
              <div className="my-3">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <p
                  className=" text-danger "
                  style={{ display: error ? "block" : "none" }}
                >
                  Please Select Payment Method Before Proceeding Next
                </p>
                <button
                  onClick={handlepayment}
                  className="btn btn-warning "
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing" : "Make Payment"}
                </button>
              </div>
            ) : cart.length > 0 ? (
              <h1>Loading...</h1>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
