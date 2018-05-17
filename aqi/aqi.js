const yargs = require('yargs');
const city = require('./city');
const ip = require('./ip')


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
  .alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.a);  

if (argv.a) {
  city.getAqiFromCity(encodedAddress)
  
} else {
  ip.getAqiFromIp();
};
