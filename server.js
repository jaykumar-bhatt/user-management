const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();
const app = express();

const connectDb = require('./src/config/connection');

const port = process.env.PORT || 8080;

//Handel cors error
app.use(cors());

//Mongodb Connection
connectDb();

//log requests
app.use(morgan('tiny'));

//Parse request into json with 1mb limit
app.use(express.json({limit: '1mb'}));

//Load routes
app.use('/',require('./src/routes/user.route'));

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
})
