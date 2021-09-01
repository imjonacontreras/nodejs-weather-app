const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jona Contreras'
    })
})

// ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jona Contreras'
    })
})

// HELP
app.get('/help', (req, res) => {
    res.render('help', {
        helpTxt: 'This is a help message.',
        title: 'Help',
        name: 'Jona Contreras'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

// 404 HELP ERROR
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Jona Contreras',
        errMsg: 'Help article not found'
    })
})

// GENERIC 404 ERROR
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jona Contreras',
        errMsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// $nodemon src/app.js -e js,hbs
// -e as in extensions