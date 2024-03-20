const bcrypt = require("bcrypt");
const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
// Secret_key
//default axios
// axios.defaults.headers.common["Authorization"] = auth?.token;
async function hashpassword(password) {
  const hashpass = await bcrypt.hash(password, 10);
  console.log(hashpass);
  return hashpass;
}
async function comparepassword(req, res, next) {
  try {
    const resp = await usermodel.findOne({
      email: req.body.email,
    });
    next();
    if (resp != null) {
      const pwdcmpr = await bcrypt.compare(req.body.password, resp.password);
      if (pwdcmpr) {
        let token = jwt.sign({ id: req.body._id }, process.env.Secret_key);
        console.log("token: ", token);
        return res.status(200).json({
          id: resp._id,
          success: true,
          message: "Login successfull",
          email: resp.email,
          name: resp.name,
          phone: resp.Phone,
          address: resp.address,
          role: resp.role,
          answer: resp.answer,
          token,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Password " });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error during login", error });
  }
}
async function Protectedroute(req, res, next) {
  try {
    // console.log("token " + );
    let decoded = jwt.verify(req.headers.authorization, process.env.Secret_key);
    console.log(decoded);

    if (decoded) {
      return res.status(200).json({ ok: true, success: true });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      success: false,
      message: "Error During Private route access!!",
      error,
    });
  }
}
async function Adminvelidation(req, res, next) {
  try {
    console.log("api end point hit");

    let { email, token } = req.body;
    // console.log(req);
    // console.log(token);
    // console.log(email);
    let decoded = jwt.verify(token, process.env.Secret_key);

    if (decoded) {
      let result = await usermodel.findOne({ email });
      // console.log(result);
      if (result != null) {
        return result.role == 1
          ? res.status(200).json({ ok: true, success: true })
          : res.status(400).json({
              ok: false,
              success: false,
              message: "inavlid access to admin dashboard",
            });
      }
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      success: false,
      message: "Error During Private route access!!",
      error,
    });
  }
}

async function forgotpassword(req, res) {
  try {
    let { email, newpassword, sport } = req.body;
    console.log(email, newpassword, sport);
    const resp = await usermodel.findOne({ email, answer: sport });
    newpassword = await hashpassword(newpassword);
    if (resp != null) {
      const result = await usermodel.findByIdAndUpdate(
        { _id: resp._id },
        { $set: { password: newpassword } }
      );
      console.log(result);
      if (result) {
        return res.status(200).json({
          success: true,
          message: "User Password Updated Successfully",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "We Found An error during Updation",
          error: "Not Updated user",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "user not Exist",
        error: "User Not Exist With This email",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error During Forgot The Password",
      error,
    });
  }
}

async function updateprofile(req, res) {
  try {
    const { name, email, password, newpassword, Phone, address, answer } =
      req.body;
    console.log(
      "Body Data Get Successfully : ",
      name,
      email,
      password,
      newpassword,
      Phone,
      address,
      answer
    );

    let user = "initial value !";
    user = await usermodel.findOne({ email });
    if (user == null) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email !" });
    }
    const pwdcmpr = await bcrypt.compare(password, user.password);
    if (pwdcmpr) {
      if (email) {
        // console.log("line 167 reach");
        if (newpassword) {
          const hashpass = await hashpassword(newpassword);
          console.log(hashpass);
          usermodel
            .findOneAndUpdate(
              { email },
              {
                $set: {
                  name,
                  password: hashpass,
                  Phone,
                  address,
                  answer,
                },
              }
            )
            .then((resp) => {
              return res.status(200).json({
                success: true,
                message: "User Profile Updated Succeessfully! ",
              });
            })
            .catch((error) => {
              return res
                .status(401)
                .json({ success: false, message: "Email Doesn't Exist" });
            });
        } else {
          console.log("Else Condition Run Successfully!");
          usermodel
            .findOneAndUpdate(
              { email },
              { $set: { name, Phone, address, answer } }
            )
            .then((resp) => {
              // console.log("REsponse get : ", resp);

              return res.status(200).json({
                success: true,
                message: "User Profile Updated Succeessfully! ",
              });
            })
            .catch((error) => {
              return res
                .status(404)
                .json({ success: false, message: "Email Doesn't Exist" });
            });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "unAuthorized Access",
          error: "Invalid Credentials",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "unAuthorized Access",
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, err: error, message: "Something Went Wrong" });
  }
}

module.exports = {
  hashpassword,
  comparepassword,
  Protectedroute,
  forgotpassword,
  Adminvelidation,
  updateprofile,
};
