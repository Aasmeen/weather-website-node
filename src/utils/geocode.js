const request = require('request')

const geocode = (address,callback)=>{
    const url="http://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWFzbWVlbjE3MDAiLCJhIjoiY2tvc3VsN2k2MDBkbzJ2bXFqb2Z0M2h2NyJ9.KnfyLlZI7bb6UgcOfZ5LKg&limit=1"
    request({ url, json:true },(error,{body})=>{
        if(error){
            callback('Unable to connect to internet!',undefined)
        }else if(body.features.length==0||body.message){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode