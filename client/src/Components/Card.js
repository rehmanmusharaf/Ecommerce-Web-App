import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./Context/cart";
import "./CSS/Home.css";
const Card = (props) => {
  // function check() {
  // }
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
  let [cart, setCart] = useCart();
  useEffect(() => {
    // check();
  }, []);

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <Link
        className="text-decoration-none text-center "
        to={`/product/${props.value2._id}`}
      >
        <img
          src={`${process.env.REACT_APP_url}/api/product-photo/${props.value2._id}`}
          className="card-img-top m-auto"
          alt="..."
          style={{ height: "auto", width: "200px" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{props.value2?.name}</h5>
        <p className="card-text ellipsis">{props.value2?.description}</p>
        <p className=" fs-5 text-success card-price">${props.value2.price}</p>
        <Link
          to={`/product/${props.value2._id}`}
          className="btn btn-primary cart-button"
        >
          Check Detail
        </Link>
        <button
          className="btn btn-dark mx-2 cart-button"
          onClick={() => addtocart(props.value2)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
