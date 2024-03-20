import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

let CartContext = createContext();
const Cart = ({ children }) => {
  let [cart, setCart] = useState([]);
  function setcartitem() {
    console.log("Set Cart Funtion Run!");
    let check = localStorage.getItem("cartitem");
    if (check == null) {
      return;
    } else {
      let result = JSON.parse(check);
      setCart([...result]);
    }
  }
  useEffect(() => {
    setcartitem();
    // [JSON.parse(localStorage.getItem("cartitem"))]
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default Cart;
let useCart = () => useContext(CartContext);
export { useCart };
