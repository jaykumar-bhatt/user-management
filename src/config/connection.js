const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // mongodb connection string
    await mongoose.connect(process.env.URI);
    console.log("Database connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;