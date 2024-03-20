const isAdmin = require("../middleware/isAdmin");
const isSignin = require("../middleware/isSignin");
const categorymodel = require("../models/categorymodel");
async function deletecategory(req, res) {
  try {
    let { id } = req.params;
    const resp1 = await isAdmin(req, res);
    const resp2 = await isSignin(req, res);
    console.log(resp1, resp2);
    if (resp1 && resp2 && id) {
      categorymodel
        .findByIdAndDelete({ _id: id })
        .then(() => {
          res.status(200).send({
            success: true,
            ok: true,
            message: "Caategory Deleted",
          });
        })
        .catch((error) => {
          res.status(400).send({
            success: false,
            ok: false,
            message: "Caategory not Deleted",
            error: "Category Not Found",
          });
        });
    } else {
      res.status(400).send({
        success: false,
        ok: false,
        message: "Error during deleteting category",
        error:
          "you must nedd to login with Admin Credentials and pass category id",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      ok: false,
      message: "Error during deleteting category",
      error,
    });
  }
}
module.exports = deletecategory;
