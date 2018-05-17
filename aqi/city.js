const axios = require('axios');

const GOOGLE_API_KEY = 'AIzaSyDhmuTWrLybkeGFMspf9gCC1p1U8f_3OoQ';
const AQI_API_KEY = '2CwXGYWAr4Z5dsJXL';
const BAIDU_API_KEY = '1O0GiWiKCEvaX4g89B0GYxuHGTRY5R3P';

const getAqiFromCity = (address) => {
  // var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`;
  var geocodeUrl = `http://api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=${BAIDU_API_KEY}`

  axios
    .get(geocodeUrl)
    .then(response => {
      if (response.data.status !== 0) {
        if (response.data.status === 101) {
          throw new Error('Unauthorized Access');
        } else if (response.data.status === 5) {
          throw new Error('API problems');
        } else if (response.data.status === 200) {
          throw new Error('can not find address');
        } else {
          throw new Error("There's an unknown error.");
        }
      }
      var lat = response.data.result.location.lat;
      var lng = response.data.result.location.lng;

      const aqiUrl = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lng}&key=${AQI_API_KEY}`;

      axios.get(aqiUrl).then(response => {
        if (response.data.status === 'fail') {
          throw new Error(response.data.data.message);
        }
        var aqi = response.data.data.current.pollution.aqius;
        console.log(`The current AQI is ${aqi}`);
      });
    }).catch((e) => {
      console.log(e.message);
    });
};

module.exports = {
  getAqiFromCity
}