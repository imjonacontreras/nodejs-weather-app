
const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=50410865b2ce26772d65c16b1b663f1f&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services. Check your connection', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            let temp = body.current.temperature;
            let rain = body.current.precip;
            let feelsLike = body.current.feelslike;
            let weatherDescs = body.current.weather_descriptions[0];
            let humidity = body.current.humidity


            callback(undefined, weatherDescs + '. It is currently ' + temp + ' degrees out. It feels like ' + feelsLike + ' degrees out. There is a ' + rain + '% chance of rain, with a humidity of ' + humidity + '.')
        }
    })
}
module.exports = forecast;