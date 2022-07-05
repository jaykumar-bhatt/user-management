const express = require('express');
const cors = require('cors');
const connectDb = require('./src/config/connection');
require('dotenv').config();
const app = express();

//database connection
connectDb();


app.use(cors());

app.listen(3000,()=> {
  console.log('Server is running on 3000..')
})

