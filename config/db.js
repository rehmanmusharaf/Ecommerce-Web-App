const mongoose = require("mongoose");
async function Mongoconnect(params) {
  mongoose
    .connect(
      "mongodb+srv://goffood:gofood@cluster0.qlkoag7.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(async () => {
      // const resp = await mongoose.connection.db
      //   .collection("users")
      //   .find({})
      //   .toArray();
      // console.log(resp);
      console.log("connection Succesfull!");
    })
    .catch((err) => {
      console.log(`we Found An error During Connection with Database: ${err}`);
    });
}

// export default Mongoconnect;
module.exports = Mongoconnect;
