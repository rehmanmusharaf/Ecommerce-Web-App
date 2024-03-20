const jsonwebtoken = require("jsonwebtoken");

async function isSignin(req, res) {
  // console.log("is Signin Function Run!");
  try {
    // const data = JSON.parse(req.headers.authorization);
    // console.log(data);
    let token =
      req.headers.authorization == undefined
        ? req.body.token
        : req.headers.authorization;
    // console.log(token);
    const decoded = await jsonwebtoken.verify(token, process.env.Secret_key);
    console.log(decoded);
    if (decoded) {
      console.log("VErified");
      return true;
    }
    console.log("Not VErified");

    return false;
  } catch (error) {
    // console.log("Not varified due to error !");
    return false;
  }
}
module.exports = isSignin;
