// import express
const express = require('express')
const app = express()

// import dotenv variable
require('dotenv').config()
const host = process.env.HOST;
const port = process.env.PORT;
const apikey = process.env.APIKEY;
const authDomain = process.env.AUTHDOMAIN;
const projectId = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messagingSenderId = process.env.MESSAGINSENDERID;
const appId = process.env.APPID;
const measurementId = process.env.MEASUREMENDID;


// set view engine
app.set('view engine', 'ejs'); 


// set static folder directory
app.use(express.static(__dirname + '/public'));

// Home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})


// Chat page
app.get('/chataway', (req, res) => {
    res.render('chat.ejs')
})




app.listen(port, function () {
    console.log(
      `Server running. Visit: ${host}:${port} in your browser 🚀`
    );
  });