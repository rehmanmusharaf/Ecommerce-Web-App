const express = require("express");
const route = express.Router();
const formidable = require("express-formidable");
const {
  createproduct,
  getallproduct,
  getSingleproduct,
  getphoto,
  deleteproduct,
  updateproduct,
  searchproductcontroler,
  braintreeTokenController,
  braintreePaymentController,
  getorderController,
  getallorderController,
} = require("../controlar/Productcontrolar");
const productmodel = require("../models/productmodel");
route.post("/api/createproduct", formidable(), createproduct, (req, res) => {});
route.get("/api/getproduct", getallproduct, (req, res) => {});
route.get("/api/getproduct/:slug", getSingleproduct, (req, res) => {});
route.get("/api/product-photo/:pid", getphoto, (req, res) => {});
route.delete("/api/product/:pid/:useremail", deleteproduct, (req, res) => {});
route.put(
  "/api/updateproduct/:pid",
  formidable(),
  updateproduct,
  (req, res) => {}
);

route.get("/api/search/:keyword", searchproductcontroler, (req, res) => {});
route.get("/api/braintree/token", braintreeTokenController);
route.post("/api/braintree/payment", braintreePaymentController);
route.get("/api/getorders/:id", getorderController, (req, res) => {});
route.post("/api/getallorders/:id", getallorderController, (req, res) => {});
module.exports = route;
