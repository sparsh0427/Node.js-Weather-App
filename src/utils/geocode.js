const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2MxODU5IiwiYSI6ImNrYzB2cm1lYjByaW0ycnA5bDV4enhhMGoifQ.61YwrQwd-zjDe39bIm6SFA`
 
    request({url: url, json:true}, (error, response) => {
     if(error) {
         callback('Unable to connect to location services', undefined)
     }
     else if (response.body.features.length === 0) {
         callback('Unable to find location. Try another search',undefined)
     }
     else {
         callback(undefined,{
             latitude: response.body.features[0].center[1],
             longitude: response.body.features[0].center[0],
             location: response.body.features[0].place_name,
         })
     }
    })
 }
 
 module.exports = geocode
 