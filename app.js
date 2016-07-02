const express         = require('express');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const path            = require('path');
const homeRoute       = require('./routes/home');
const userRoute       = require('./routes/user');
const cronRoute       = require('./routes/cron');

const app             = express();
const port            = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use('/bower_components',express.static(path.join(__dirname,'/bower_components')));

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/cron', cronRoute);

app.listen(port, (req,res) => {
  console.log('Server is listening on ', port);
});