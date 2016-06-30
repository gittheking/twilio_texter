const twilio          = require('twilio');
const http            = require('http');
const express         = require('express');
const path            = require('path');
const parseString     = require('xml2js').parseString;
const cronJob         = require('cron').CronJob;
const homeRoute       = require('./routes/home');
const userRoute       = require('./routes/user');
const cronRoute       = require('./routes/cron');
const zip_codes       = require('./zip_codes');

const app             = express();
const client          = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHTOKEN);
const openWeatherKey  = process.env.OPENWEATHER_KEY;
const port            = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path(__dirname,'public')));

app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/cron', cronRoute);

app.listen(port, (req,res) => {
  console.log('Server is listening on ', port);
});

// var textJob = new cronJob('0 18 * * *', function() {
//   http.get('http://web.mta.info/status/serviceStatus.txt', function(response) {
//     var completeResponse = '';
//     response.on('data', function(chunk) {
//       completeResponse += chunk;
//     });
//     response.on('end',function() {
//       parseString(completeResponse, function(err, result) {
//         if(err) {
//           console.log('error: ', err);
//         }

//         var myTrain = result.service.subway[0].line
//           .filter( (train) => train.name[0] === '456' )
//           .map( cleanData );

//         console.log(myTrain);

//         http.get('http://api.openweathermap.org/data/2.5/weather?zip=10009&units=imperial&appid='+openWeatherKey, function(response) {
//           var completeWeather = '';
//           response.on('data', function(WeatherChunk) {
//             completeWeather += WeatherChunk;
//           });
//           response.on('end', function() {

//             var myWeather = JSON.parse(completeWeather);
//             console.log(myWeather);
//             var myMessage = 'Good Morning Bobby,\n\nCurrent Temp: '+myWeather.main.temp+'°F\n\n'+myTrain[0].name+' Status:\n'+myTrain[0].status;
//             client.sendMessage({
//               to: process.env.PERSONAL_NUMBER,
//               from: process.env.TWILIO_NUMBER,
//               body: myMessage
//             }, function(err,data) {
//               console.log('error: %s\ndata: %s', err, data);
//             });

//           });
//         }.bind(myTrain));
//       });
//     });
//   }).on('error', function(err) {
//     console.log('problem with request: ' + err.message);
//   });
// }, null, true);


// function cleanData(obj) {
//   Object.keys(obj).forEach(function(key) {
//     obj[key] = obj[key][0];
//   });
//   return obj;
// }

// function TextMessage() {
//   this.train = {
//     name: null,
//     status: null
//   };
//   this.weather = {
//     current_temp: null,
//     min_temp: null,
//     max_temp: null
//   };
// }

// TextMessage.prototype.getTrain = function() {
//   // var myMessage = this;
//   // console.log(myMessage);
//   http.get('http://web.mta.info/status/serviceStatus.txt', function(response) {
//     var completeResponse = '';
//     response.on('data', function(chunk) {
//       completeResponse += chunk;
//     });
//     response.on('end',function() {
//       parseString(completeResponse, function(err, result) {
//         if(err) {
//           console.log('error: ', err);
//         }
//         var myTrain = result.service.subway[0].line.filter(function(train) {
//           return train.name[0] === '456';
//         });
//         cleanData(myTrain[0]);
//         this.train.name = myTrain[0].name;
//         this.train.status = myTrain[0].status;
//         // console.log(myMessage);
//       });
//     });
//   }.bind(this));
// };

// TextMessage.prototype.getWeather = function() {
//   // var myMessage = this;
//   // console.log(myMessage);
//    http.get('http://api.openweathermap.org/data/2.5/weather?zip=10009&units=imperial&appid='+openWeatherKey, function(response) {
//     var completeWeather = '';
//     response.on('data', function(WeatherChunk) {
//       completeWeather += WeatherChunk;
//     });
//     response.on('end', function() {
//       var weatherJSON = JSON.parse(completeWeather);
//       // console.log(myMessage);
//       this.weather.current_temp = weatherJSON.main.temp;
//       this.weather.min_temp = weatherJSON.main.temp.temp_min;
//       this.weather.max_temp = weatherJSON.main.temp.temp_max;
//       // var myMessage = 'Good Morning Bobby,\n\nCurrent Temp: '+myWeather.main.temp+'°F\n\n'+myTrain[0].name+' Status:\n'+myTrain[0].status;
//     });
//   }.bind(this));
// };
