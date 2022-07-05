const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();
const app = express();

const connectDb = require('./src/config/connection');

const port = process.env.PORT || 8080;

//handel cors error
app.use(cors());

//Mongodb connection
connectDb();

//log requests
app.use(morgan('tiny'));

//parse request into json with 1mb limit
app.use(express.json({limit: '1mb'}));


app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
})
