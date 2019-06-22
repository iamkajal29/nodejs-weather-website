//server side coding
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express() //app stores the express application and express() generates the application
//app.get first argument is the route from the domain i.e. app.com here

//setting port for heroku to listen
const port = process.env.PORT || 3000

//setup path
console.log(path.join(__dirname, '../public/index.html'))
const views_path = path.join(__dirname, '../templates/views') 
const partials_path = path.join(__dirname, '../templates/partials')
//setup handlebars
app.set('view engine','hbs')
app.set('views',views_path)

//registering partials
hbs.registerPartials(partials_path)
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Know the weather in your location'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Put in the location where you live to know the weather and click on Search!'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'This weather application is created by Kajal Shrivastava',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        return res.send({
            error: 'You must provide an address'
        })
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req,res)=>{
    res.render('Error',{
        title: '404 NOT FOUND',
        name: "The page you're looking for cannot be found"
    })
})


//start the server
app.listen(port, () => {
    console.log('Server is up!')
})