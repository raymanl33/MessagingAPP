// import express
const express = require('express')
const app = express()

// import dotenv variable
require('dotenv').config()
const host = process.env.HOST;
const port = process.env.PORT;


// set view engine
app.set('view engine', 'ejs'); 


// set static folder directory
app.use(express.static(__dirname + '/public'));

// render home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})


// Render chat page
app.get('/chataway', (req, res) => {
    res.render('chat.ejs')
})



app.listen(port, function () {
    console.log(
      `Server running. Visit: ${host}:${port} in your browser 🚀`
    );
  });

// pass export env variables <- need to figure out how to import 
let env_variables = { 
  apikey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENDID
};

module.exports = env_variables;