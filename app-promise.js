const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alia: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.a);
geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDhmuTWrLybkeGFMspf9gCC1p1U8f_3OoQ`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/a84ccfb2c5a360df59d84d7094f99335/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl).then((response) => {
    var temperature = response.data.currently.temperature;
    var actualTemperature = response.data.currently.apparentTemperature
    console.log(`It's currently ${temperature}. It feels like ${actualTemperature}`)
  })
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API services')
  } else {
    console.log(e.message)
  }
});