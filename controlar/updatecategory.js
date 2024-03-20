const { default: slugify } = require("slugify");
const isAdmin = require("../middleware/isAdmin");
const isSignin = require("../middleware/isSignin");
const categorymodel = require("../models/categorymodel");
async function updatecategory(req, res) {
  try {
    let { id } = req.params;
    let { name } = req.body;
    console.log(id);
    const resp1 = isAdmin(req, res);
    const resp2 = isSignin(req, res);
    if (resp1 && resp2) {
      const check = categorymodel.findById({ _id: id });
      if (check !== null) {
        categorymodel
          .findByIdAndUpdate({ _id: id }, { name: name, slug: slugify(name) })
          .then(() => {
            res.status(200).json({
              success: true,
              ok: true,
              message: "Category Updated Successfully",
            });
          })
          .catch((error) => {
            res.status(200).json({
              success: false,
              ok: false,
              message: "Category Not Updated",
            });
          });
      } else {
        return res.status(200).json({
          success: false,
          ok: false,
          message: "Category Already Exist With This Name",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        ok: false,
        message:
          "You Mus need Admin credentials and login require for updation!",
        error: "need creadentials and login",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      ok: false,
      message: "Error during Updating category",
      error,
    });
  }
}
module.exports = updatecategory;
