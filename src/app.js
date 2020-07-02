const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sparsh',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sparsh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "this is a help page",
        title: 'Help',
        name: 'Sparsh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        weather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: weatherData,
                location,
                address: req.query.address,
            })
        })

    })

    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'India',
    //     address: req.query.address,
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sparsh',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Sparsh",
        errorMessage: "Page Not Found",
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})