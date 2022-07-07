const mongoose = require("mongoose");

// User Schema
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", schema);

module.exports = Users;
