const request = require('request');


var getWeather = (lat, lng, callback) => {
    var urlString = `https://api.darksky.net/forecast/16af274a690428aed8f5ffc21b24053d/${lat},${lng}`;
    request({
        url: urlString,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            
            var current = body.currently;

            callback(undefined, {
                temperature: current.temperature,
                apparentTemperature: current.temperature,
                summary: current.summary,
            });

        } else {
            console.log(response.statusCode);
            console.log(urlString);
            callback('unable to fetch weather.');
        }
    });
};
module.exports = {
    getWeather
}