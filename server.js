const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const consola = require("consola");
const path = require("path");
require("dotenv").config();
const app = express();

const connection = require("./src/config/connection");

const port = process.env.PORT || 8080;

//Handel cors error
app.use(cors());

//Mongodb Connection
connection.connectDb();

//log requests
app.use(morgan("tiny"));

//Parse request into json with 1mb limit
app.use(express.json({ limit: "1mb" }));

//Load routes
app.use("/", require("./src/routes/user.route"));

//Defult route
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "src/views/index.html"));
});

app.listen(port, () => {
  consola.success(`Server is running on port ${port}`);
});
