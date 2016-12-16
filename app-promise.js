const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for. ',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geocodeURL).then((response) => {

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/16af274a690428aed8f5ffc21b24053d/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);

}).then((response) => {

    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    
    console.log(`It's currently ${temperature} but it feels like ${apparentTemperature}`);

}).catch((e) => {
    
    if (e.code === 'ENOTFOUND') {
        console.log("unable to connect to API servers.");
    } else {
        console.log(e.message);
    }

});