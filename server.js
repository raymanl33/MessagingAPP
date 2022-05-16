const express = require('express')
const indexRouter = require("./routes/index.js")
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
require('dotenv').config()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERURL
};

const app = express()
app.set("views", "views")
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use(auth(config));

app.use("/", indexRouter);

app.get('/login', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.render("index", { title: "Home Page" });
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/home', (req, res) => {
  res.render("home.ejs")
});

app.get('/chat', (req, res) => {
  if(req.oidc.isAuthenticated()) {
    res.render("index.ejs")
  } else {
    res.redirect('/login');
  }
});

const port = 8080
app.listen(port, () => {
  console.log(`Server listening on port ${port} 🚀`)
});

let env_variables = { 
  apikey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENDID
};
