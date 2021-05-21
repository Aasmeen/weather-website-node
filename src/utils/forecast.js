const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=805428e8521ea1483841d191aa83f640&query="+latitude+","+longitude+"&units=f"
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to internet!',undefined)
        }
        else if(body.error){
            callback('Unable to fetch location',undefined)
        }else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                feels_like:body.current.feelslike
            })
        }
    })
}

module.exports = forecast