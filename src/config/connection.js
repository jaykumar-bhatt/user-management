const mongoose = require("mongoose");
const consola = require("consola");
require("dotenv").config({ path: "../../.env" });

// Connection With Database
const connectDb = async () => {
  try {
    // mongodb connection string
    await mongoose.connect(process.env.URI);
    consola.success("Database connected...");
  } catch (error) {
    consola.error(error);
  }
};

// Disconnect With Database
const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    consola.info("Successfully Disconnect...");
  } catch (error) {
    consola.error(error);
  }
};

module.exports = { connectDb, disconnectDb };
