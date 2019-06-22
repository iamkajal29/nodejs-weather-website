const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/717953ca13b82e2eacfe55985cbde4f2/'+latitude+','+longitude+'?units=si'
    request({url: url, json: true}, (error,response) =>{
        if(error){
            callback('Unable to connect to forecast services',undefined)
        }
        else if(response.body.error){
            callback('Unable to fulfill request at the given location. Search again',undefined)
        }
        else{
            callback(undefined,{
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
            })
        }
    })
    
}

module.exports = forecast