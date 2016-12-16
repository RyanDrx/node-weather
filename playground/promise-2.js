const request = require('request');

var geocodeAddress = (address) => {

    var encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {

            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find address.');
            } else if (body.status === 'OK') {
                var results = body.results[0];

                resolve({
                    address: results.formatted_address,
                    latitude: results.geometry.location.lat,
                    longitude: results.geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('98178').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});