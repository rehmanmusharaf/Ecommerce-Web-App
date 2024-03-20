const { default: slugify } = require("slugify");
const isAdmin = require("../middleware/isAdmin");
const isSignin = require("../middleware/isSignin");
const productmodel = require("../models/productmodel");
const ordermodel = require("../models/ordermodel");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

async function createproduct(req, res) {
  try {
    console.log("Api End Point Hit!");
    const resp1 = await isAdmin(req, res);
    const resp2 = await isSignin(req, res);
    // console.log(resp1);
    if (resp2 && resp1) {
      console.log("if Condition RUn");
      const { name, description, price, category, quantity, shiping } =
        req.fields;
      // console.log(name, description, price, category, quantity);
      const { photo } = req.files;
      console.log(photo);
      switch (true) {
        case !name:
          return res.status(400).json({
            success: false,
            ok: false,
            error: "Name is required",
            message: "Name is required",
          });
        case !description:
          return res.status(400).json({
            success: false,
            ok: false,
            error: "Description is required",
            message: "Description is required",
          });
        case !price:
          return res.status(400).json({
            success: false,
            ok: false,
            error: "Price is required",
            message: "Price is required",
          });
        case !category:
          return res.status(400).json({
            success: false,
            ok: false,
            error: "Category is required",
            message: "Category is required",
          });
        case !quantity:
          return res.satus(400).json({
            success: false,
            ok: false,
            error: "Quantity is required",
            message: "Quantity is required",
          });
        case !photo && photo.size > 100000:
          return res.satus(400).json({
            success: false,
            ok: false,
            error: "Photo is required",
            message: "Photo is required",
          });
      }

      const product = new productmodel({ ...req.fields, slug: slugify(name) });
      //   console.log(...req);
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
      await product.save();
      return res.status(201).json({
        success: true,
        ok: true,
        message: "Product Created Successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        ok: false,
        error: "must need to login with admin credentials",
        message: "You must need to Login With AAdmin Credentials",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "Error During Creating Product!",
    });
  }
}
async function getallproduct(req, res) {
  try {
    // console.log("api end point hit!");
    productmodel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 })
      .then((resp) => {
        res.status(200).json({ resp: [...resp], success: true });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          ok: false,
          error,
          message: "error during fetching Product Data!",
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "error during fetching Product Data!",
    });
  }
}
function getSingleproduct(req, res) {
  try {
    console.log(req.params.slug);
    productmodel
      .find({ _id: req.params.slug })
      .select("-photo")
      .then((resp) => {
        // console.log(resp);

        return res.status(200).json({ success: true, ok: true, resp });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          ok: false,
          error,
          message: "Product does'nt Exist",
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "error during fetching Single Product Data!",
    });
  }
}
async function getphoto(req, res) {
  try {
    console.log(req.params.pid);
    productmodel
      .findOne({ _id: req.params.pid })
      .select("photo")
      .then((resp) => {
        if (!resp) {
          return res.status(400).json({
            success: false,
            ok: false,
            error: "data not found!",
            message: "Data not found!",
          });
        }
        // console.log(res.photo.contentType, res.photo.data);
        res.set("Content-type", resp.photo.contentType);
        return res.status(200).send(resp.photo.data);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          ok: false,
          err,
          message: "error during fetching Product Photo Data!",
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "error!",
    });
  }
}
async function deleteproduct(req, res) {
  console.log("Api End Point Hit!");

  try {
    const resp1 = await isAdmin(req, res);
    const resp2 = await isSignin(req, res);
    // console.log(resp1, resp2);
    if (resp2 && resp1) {
      console.log(req.params.pid);
      productmodel
        .findByIdAndDelete({ _id: req.params.pid })
        .select("-photo")
        .then((resp) => {
          if (!resp) {
            console.log(resp);
            return res.status(400).json({
              success: false,
              ok: false,
              message: "Product Not Deleted!",
              error: "Product Not Found",
            });
          }
          return res
            .status(200)
            .json({ success: true, ok: true, message: "Product Deleted!" });
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            ok: false,
            message: "Product Not Deleted!",
            error: "Product Not Found",
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        ok: false,
        message: "Must Need to Login With Admin Credentials",
        error: "login with Admin Credentials!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      ok: false,
      message: "Product Not Deleted!",
      error: "Product Not Found",
    });
  }
}

async function updateproduct(req, res) {
  try {
    const resp1 = await isAdmin(req, res);
    const resp2 = await isSignin(req, res);

    if (resp2 && resp1) {
      delete req.fields.email;
      console.log(req.fields);

      // console.log("If Condiiton Run !");
      // const { name, slug, description, price, category, quantity, shiping } =
      //   req.fields;
      // console.log("req dataa", ...req.fields);

      const { photo } = req.files;
      // console.log(photo);
      let product = {};
      if (photo) {
        console.log("if Condition Run");
        product = {
          photo: { data: fs.readFileSync(photo.path), contentType: photo.type },
          ...req.fields,
          slug: slugify(req.fields.name),
        };
        console.log(product);
      } else {
        product = {
          ...req.fields,
          slug: slugify(req.fields.name),
        };
      }

      // console.log(product);
      await productmodel
        .findByIdAndUpdate(req.params.pid, { ...product })
        .then((result) => {
          return res.status(201).json({
            success: true,
            ok: true,
            message: "Product Updated Successfully!",
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            ok: false,
            error: err,
            message: "You must need to Login With AAdmin Credentials",
          });
        });
    } else {
      res.status(400).json({
        success: false,
        ok: false,
        error: "must need to login with admin credentials",
        message: "You must need to Login With AAdmin Credentials",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      ok: false,
      message: "Product Not Updated!",
      error: "Product Not Found",
    });
  }
}

async function searchproductcontroler(req, res) {
  try {
    const { keyword } = req.params;
    // console.log(keyword);
    const result = await productmodel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.status(200).json({ result, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
}
function braintreeTokenController(req, res) {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        // console.log("error found", err);
        res.status(500).json({ success: false, error: err });
      } else {
        // console.log("response", response);
        res.send(response);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
  // res.send("End Point hit");
}
async function braintreePaymentController(req, res) {
  try {
    const resp = await isSignin(req, res);

    if (resp) {
      const { cart, nonce, id } = req.body;
      // console.log("Id IS: ", id);
      if (cart == undefined || nonce == undefined || id == undefined) {
        console.log("If Condition Run!");
        return res.satus(401).json({
          success: false,
          message: "Information Not Properly Send from user End about cart !",
        });
      }
      let total = 0;
      cart.map((value) => {
        total += value.price;
      });
      let newtransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (err, result) {
          if (result) {
            const order = new ordermodel({
              products: cart,
              payment: result,
              buyer: id,
            }).save();
            res.status(200).json({ success: true });
          } else {
            res.satus(500).json({ success: false, err });
          }
        }
      );
    } else {
      res.status(401).json({ success: false, error: "Login Beefore access!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
async function getorderController(req, res) {
  const resp = isSignin(req, res);
  try {
    if (resp) {
      const { id } = req.params;
      // console.log("if condition run!", id);
      ordermodel
        .find({ buyer: id })
        .populate("products", "-photo")
        .populate("buyer", "name")
        .then((result) => {
          // console.log("result found", result);
          // const array = [];
          // console.log("array is : ", array);
          // const products = Array.from(
          //   result.map((value, index) => {
          //     return value.products;
          //   })
          // );
          //  result.products;
          // console.log(products);

          res.status(200).json({ success: true, result });
          return;
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: "No Order Exist" });
        });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Login Before Access Credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function getallorderController(req, res) {
  try {
    const resp1 = await isSignin(req, res);
    const resp2 = await isAdmin(req, res);
    console.log("both responses : ", resp1, resp2);
    if (resp1 && resp1) {
      ordermodel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .then((result) => {
          return res.status(200).json({ success: true, result });
        })
        .catch((error) => {
          return res.status(500).json({ success: false, error });
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Login Before Access all Orders" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}
module.exports = {
  deleteproduct,
  createproduct,
  getallproduct,
  getSingleproduct,
  getphoto,
  updateproduct,
  searchproductcontroler,
  braintreeTokenController,
  braintreePaymentController,
  getorderController,
  getallorderController,
};
