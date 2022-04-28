const request = require('request')

const host = process.env.HOST;
const port = process.env.PORT;

const apiKey = process.env.APIKEY;
const authDomain= process.env.AUTHDOMAIN;
const projectID = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messaginSenderId = process.env.MESSAGINGSENDERID;
const appId = process.env.APPID;
const measurementId = process.env.MEASUREMENTID;

const firebase = require('firebase');

//const firebase = [apiKey, authDomain, projectID, storageBucket, messaginSenderId ,appId, measurementId]

const firebaseConfig = {
  apiKey: "AIzaSyAVUCcFvWe8VQElN1r4JNDbvuiIBL46HYo",
  authDomain: "messageproject-2aab6.firebaseapp.com",
  projectId: "messageproject-2aab6",
  storageBucket: "messageproject-2aab6.appspot.com",
  messagingSenderId: "779161762894",
  appId: "1:779161762894:web:f73b053eea24c19e94d71f",
  measurementId: "G-HMLXTEJL71"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


let messagecontrols = {
    upload: (req, res) => {
        console.log("upload function triggered")
        let message = req.body.Messagetext
        db.collection('MessageCollection').document('MessageDocument').update({messageText: message})
    }
};

module.exports = messagecontrols