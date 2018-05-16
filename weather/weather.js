const request = require('request');



var getWeather = (latitude, longitude, callback) => {

  request({
    url: `https://api.darksky.net/forecast/a84ccfb2c5a360df59d84d7094f99335/${latitude},${longitude}`,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        actualTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports = {
  getWeather
}