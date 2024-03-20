const express = require("express");
const route = express.Router();
const userschema = require("../models/usermodel");

const {
  hashpassword,
  comparepassword,
  Protectedroute,
  forgotpassword,
  Adminvelidation,
  updateprofile,
} = require("../Helper/authhelper");
const { createcategorycontroler } = require("../controlar/createcategory");
const { getcategory, getsinglecategory } = require("../controlar/getcategory");
const updatecategory = require("../controlar/updatecategory");
const deletecategory = require("../controlar/deletecategory");
route.post("/api/createuser", async (req, res) => {
  try {
    const { name, email, password, Phone, address, ques } = req.body;
    if (!name) {
      return res.send({ error: "Name Is Required!" });
    }
    if (!email) {
      return res.send({ error: "Email Is Required!" });
    }
    if (!password) {
      return res.send({ error: "Password Is Required!" });
    }
    if (!Phone) {
      return res.send({ error: "Phone Is Required!" });
    }
    if (!address) {
      return res.send({ error: "address Is Required!" });
    }
    if (!ques) {
      return res.status(200).send({ error: "Question is required!" });
    }
    const existingemail = await userschema.findOne({ email });
    // console.log(existingemail);
    if (existingemail != null) {
      return res.status(200).send({
        success: false,
        error: "Email Already exist",
        message: "Email Already Exist please Login With Existing Email!",
      });
    }
    // console.log(name, email, password, Phone, address);
    const hashedpass = await hashpassword(password);
    // console.log(hashedpass);
    userschema
      .create({
        name,
        email,
        password: hashedpass,
        Phone,
        address,
        answer: ques,
      })
      .then(() => {
        return res.status(200).json({ success: true, message: "user created" });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: `Error During Post Request! ${error}` });
  }
});
route.post("/api/login", comparepassword, (req, res) => {});

route.get("/test", Protectedroute, (req, res) => {});
route.get("/api/user-auth", Protectedroute, (req, res) => {
  console.log("token: ", req.headers.authorization);
});
route.post("/api/forgotpassword", forgotpassword, (req, res) => {});
route.post("/api/admin-auth", Adminvelidation, (req, res) => {});
route.put("/api/updatprofile", updateprofile, (req, res) => {});
route.post("/api/createcategory", createcategorycontroler, (req, res) => {});
route.get("/api/getcategory", getcategory, (req, res) => {});
route.put("/api/updatecategory/:id", updatecategory, (req, res) => {});
route.delete(
  "/api/deletecategory/:id/:useremail",
  deletecategory,
  (req, res) => {}
);
route.get("/api/single-category/:slug", getsinglecategory, (req, res) => {});

module.exports = route;
