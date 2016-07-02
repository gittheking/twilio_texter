const http        = require('http');
const parseString = require('xml2js').parseString;

function getTrainStatus(trains) {
  let promise = new Promise((res,rej) => {
    http.get('http://web.mta.info/status/serviceStatus.txt', function(response) {
      let completeResponse = '';
      response.on('data', chunk => {
        completeResponse += chunk;
      });
      response.on('end', () => {
        parseString(completeResponse, (err, result) => {
          if(err) throw err;
          let allTrains = result.service.subway[0].line;
          let myTrains  = allTrains.filter( train => {
            for(let i = 0; i < trains.length; i++) {
              if(train.name[0].indexOf(trains[i]) >= 0) return true;
            }
            return false;
          });
          myTrains.forEach( train => {
            if(train.text[0] !== '') train.text[0] = formatStatusText(train.text[0]);
          })
          res(myTrains); 
        });
      });
    });
  });
  return promise;
}

function formatStatusText(statusText) {
  let text = statusText.replace(/<(?:.|\n)*?>/gm, '');
  return text
    //.split(' ').filter( str => {
    //return str.indexOf('&') === 0 }).join(' ');
};

module.exports = { getTrainStatus };
