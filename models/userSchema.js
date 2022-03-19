const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  User_id: {
    type: Number,
    required: true,
  },
  User_fname: {
    type: String,
    required: true,
  },
  User_lname: {
    type: String,
    required: true,
  },
  User_mobno: {
    type: Number,
    required: true,
  },
  User_email: {
    type: String,
    required: true,
  },
  User_pwd: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
