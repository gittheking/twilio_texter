const twilio          = require('twilio');
const http            = require('http');
const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const homeRoute       = require('./routes/home');
const userRoute       = require('./routes/user');
const cronRoute       = require('./routes/cron');
const zip_codes       = require('./zip_codes');

const app             = express();
const port            = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.static(path(__dirname,'public')));

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/cron', cronRoute);

app.listen(port, (req,res) => {
  console.log('Server is listening on ', port);
});