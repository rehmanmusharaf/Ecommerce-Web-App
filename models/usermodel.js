const mongoose = require("mongoose");
const { Schema } = mongoose;
var validator = require("validator");

const userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate(value) {
      return validator.isEmail(value);
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 3,
  },
  Phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("users", userschema);
