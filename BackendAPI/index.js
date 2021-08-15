//const winston = require("winston");
const config = require("config");
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs=require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressvalidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
// app
const app = express();
// db
require("./startup/db")();
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressvalidator());
app.use(cors());

// routes middleware


app.use('/api', authRoutes);
app.use('/api', dataRoutes);



morgan.token('body', (req, res) => JSON.stringify(req.body));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
//console.log(accessLogStream);
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', { stream: accessLogStream }));


const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
 /** winston.info(`Listening on port ${port}...`) **/
 console.log(`Listening on port ${port}...`)
);
module.exports = server;