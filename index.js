require('dotenv').config()


const apiKey = process.env.APIKEY;
const authDomain= process.env.AUTHDOMAIN;
const projectID = process.env.PROJECTID;
const storageBucket = process.env.STORAGEBUCKET;
const messaginSenderId = process.env.MESSAGINGSENDERID;
const appId = process.env.APPID;
const measurementId = process.env.MEASUREMENTID;

//Firebase Set up =======================================
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectID,
    storageBucket: storageBucket,
    messagingSenderId: messaginSenderId,
    appId: appId,
    measurementId: measurementId
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//chat box
const messages = document.getElementById("messages");
const textbox = document.getElementById("textbox");
const button = document.getElementById("button");





// When the send button gets click the message gets sent to firebase
button.addEventListener("click", () => {
    let newMessage = document.createElement("li");
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);
    textbox.value = '';
});