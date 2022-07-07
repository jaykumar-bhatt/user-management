const mongoose = require("mongoose");
require("dotenv").config({ path: "../../.env" });

// Connection With Database
const connectDb = async () => {
  try {
    // mongodb connection string
    await mongoose.connect(process.env.URI);
    console.log("Database connected...");
  } catch (error) {
    console.log(error);
  }
};

// Disconnect With Database
const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("Successfully Disconnect...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb, disconnectDb };
