const request = require('postman-request')

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e2684dccd0f9aa701f88e16dd384bf3c&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`

    request({url: url, json:true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather service",undefined)
        }
        else if ( response.body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                weather_description:`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees. It feels like ${response.body.current.feelslike} degrees`,
                // temperature: response.body.current.temperature + " Celcius",
                // feels_like: response.body.current.feelslike + " Celcius" ,
            })
        }

    })
}

module.exports = weather