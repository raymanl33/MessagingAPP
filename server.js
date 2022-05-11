// import express
const express = require('express')
const app = express()

// import dotenv variable
require('dotenv').config()
const host = process.env.HOST;
const port = process.env.PORT;

// import Auth0
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERURL
};

// set view engine
app.set('view engine', 'ejs'); 


// set static folder directory
app.use(express.static(__dirname + '/public'));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// render home page
app.get('/', (req, res) => {
  console.log(`${req.oidc.isAuthenticated()}`)
  res.render('home.ejs', {
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user,
  });
})

// render login page
app.get('/login', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})


// Render chat page
app.get('/chataway', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.render("home.ejs", {
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user,
    })
 
  } else {
    res.render('chat.ejs', {
      isAuthenticated: req.oidc.isAuthenticated(),
      user: req.oidc.user,
    })
  }
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