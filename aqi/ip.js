const axios = require('axios');

const GOOGLE_API_KEY = 'AIzaSyDhmuTWrLybkeGFMspf9gCC1p1U8f_3OoQ';
const AQI_API_KEY = '2CwXGYWAr4Z5dsJXL';
const BAIDU_API_KEY = '1O0GiWiKCEvaX4g89B0GYxuHGTRY5R3P';

const getAqiFromIp = () => {
  console.log("Getting AQI based on current location (IP)...")
  var aqiUrl = `http://api.airvisual.com/v2/nearest_city?key=${AQI_API_KEY}`;
  axios.get(aqiUrl).then((response)=>{
    if (response.data.status === 'fail') {
      throw new Error(response.data.message);
    }
    var lat = response.data.data.location.coordinates[1];
    var lng = response.data.data.location.coordinates[0];
    var aqi = response.data.data.current.pollution.aqius;

    // var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    var geocodeUrl = `http://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&pois=1&ak=${BAIDU_API_KEY}`

    axios({
      method: 'get',
      url: geocodeUrl,
      responseType: 'json'
    }).then((response)=>{
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }
      console.log('Getting AQI data for:')
      // console.log(response.data.results[0].formatted_address);
      console.log(response.data.result.formatted_address);
      console.log(`The current AQI is ${aqi}`);
    })
  })
};

module.exports = {
  getAqiFromIp
}