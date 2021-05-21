const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=805428e8521ea1483841d191aa83f640&query="+latitude+","+longitude
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to internet!',undefined)
        }
        else if(body.error){
            callback('Unable to fetch location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. Temperature is currently '+body.current.temperature+' degree celcius feels like '+body.current.feelslike+' degree celcius.')
        }
    })
}

module.exports = forecast