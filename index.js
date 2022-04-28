const messageController = require("./controller/messageController")


// import dotenv
require('dotenv').config()

// import express
const express = require("express");
const app = express();

// set views
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// public folder express
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'))



const host = process.env.HOST;
const port = process.env.PORT;

const apiKey = process.env.APIKEY;
const authDomain= process.env.AUTHDOMAIN;
const projectID = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messaginSenderId = process.env.MESSAGINGSENDERID;
const appId = process.env.APPID;
const measurementId = process.env.MEASUREMENTID;

const firebase = [apiKey, authDomain, projectID, storageBucket, messaginSenderId ,appId, measurementId]



app.get("/", (req, res) => {
    res.render('./index')
});

router.post( "/", messageController.upload);



app.listen(port, function () {
    console.log(
      `Server running. Visit: ${host}:${port} in your browser 🚀`
    );
  });
