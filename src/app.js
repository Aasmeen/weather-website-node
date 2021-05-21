const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config
const public_dir_path=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(public_dir_path))

app.get('',(req,res) => {
    res.render('index',{
        title:'Home',
        name:'Aasmeen'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Aasmeen'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Aasmeen'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:'Address not provided'})
    }
    geocode(req.query.address,(error,{latitude, longitude, place}={}) => {
        if(error){
            return res.send({error})
        }else{
            forecast(latitude,longitude,(error,forecast_data)=>{
                if(error){
                    return res.send({error})
                }else{
                    res.send({
                        address:req.query.address,
                        latitude,
                        longitude,
                        forecast_data
                    })
                }
            })
        }
    })
    
})

app.get('./products',(req,res)=>{
    console.log(req.query)
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        error:'Help not found',
        name:'Aasmeen'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404 error',  
        error:'Page not found',
        name:'Aasmeen'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})