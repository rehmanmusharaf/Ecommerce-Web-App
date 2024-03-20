import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Auth from "./Components/Context/Auth";
import Search from "./Components/Context/search";
import Cart from "./Components/Context/cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Cart>
    <Search>
      <Auth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth>
    </Search>
  </Cart>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
