const categorySchema = require("../models/categorymodel.js");
const isAdmin = require("../middleware/isAdmin.js");
const isSignin = require("../middleware/isSignin.js");
const slugify = require("slugify");
async function createcategorycontroler(req, res) {
  try {
    console.log("create category controler Run!");
    // res.status(200).send("api end pint hit");
    const adminresp = await isAdmin(req, res);
    const signinresp = await isSignin(req, res);
    // console.log(adminresp);
    // console.log(signinresp);

    if (adminresp && signinresp) {
      let { name } = req.body;
      if (!name || name == "") {
        return req
          .status(404)
          .json({ success: false, ok: false, message: "empty data send!" });
      }
      const existingcategory = await categorySchema.findOne({ name });
      if (existingcategory != null) {
        return req.status(404).json({
          success: false,
          ok: false,
          message: "Category Already Exist",
        });
      }
      const result = await categorySchema
        .create({
          name: name,
          slug: slugify(name),
        })
        .then(() => {
          return res.status(200).json({
            success: true,
            ok: true,
            message: "Category Created Successfully!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            ok: false,
            message: "Error during category creationn",
            error,
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        ok: false,
        message:
          "You Must Need to Sigin And Admmin Credentials to create category!",
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      success: false,
      ok: false,
      message: "Error during category creation",
      error: error,
    });
  }
}

module.exports = { createcategorycontroler };
