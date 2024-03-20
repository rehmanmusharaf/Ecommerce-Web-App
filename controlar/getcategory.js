// const isAdmin = require("../middleware/isAdmin");
// const isSignin = require("../middleware/isSignin");
const categorySchema = require("../models/categorymodel");
async function getcategory(req, res) {
  try {
    categorySchema
      .find({})
      .then((resp) => {
        return res.status(200).json({ resp, success: true });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          ok: false,
          error,
          message: "error during getting category!",
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "error during getcategory!",
    });
  }
}
async function getsinglecategory(req, res) {
  try {
    let { slug } = req.params;
    console.log(slug);
    if (slug !== null) {
      categorySchema
        .find({ slug: slug })
        .then((resp) => {
          return res.status(200).json({ resp });
        })
        .catch((error) => {
          res.status(400).json({
            success: false,
            ok: false,
            error,
            message: "error during getting category!",
          });
        });
    } else {
      res.status(400).json({
        success: false,
        ok: false,
        message: "error during getting category!",
        error: "peramter not found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      ok: false,
      error,
      message: "error during getcategory!",
    });
  }
}
module.exports = { getcategory, getsinglecategory };
