const usermodel = require("../models/usermodel");
async function isAdmin(req, res) {
  try {
    // console.log("is Admin Function Run!");
    // console.log(req.fields.email);
    // const email = "muhammadrehmanmusharafali3@gmail.com";
    console.log("body", req.body.email);
    let { email } =
      req.body.email == undefined
        ? req.fields != undefined
          ? req.fields
          : false
        : req.body;
    // let id=null;
    if (email == undefined) {
      email = req.params.useremail;
    }
    console.log("Admin Email : ", email);
    const resp = await usermodel.findOne({ email });
    // console.log(resp);
    if (resp != null) {
      // console.log("if condiition run!");
      return resp.role === 1 ? true : false;
    } else {
      return false;
    }
  } catch (error) {
    // console.log("error : ", error);
    return false;
  }
}
module.exports = isAdmin;
