import { firebase } from "./indexjs"; 



const apiKey = firebase[0];
const authDomain= firebase[1];
const projectID = firebase[2];
const storageBucket = firebase[3];
const messaginSenderId = firebase[4];
const appId = firebase[5];
const measurementId = firebase[6];



//chat box
const messages = document.querySelector("#messages");
const textbox = document.querySelector("#textbox");
const button = document.querySelector("#button");

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
const db = firebase.firestore();
const text = db.collection('messages').doc('message');

// realtime updates 
text.onSnapshot(doc => {
    let message = doc.data().message; 

    });
  








// When the send button gets click the message gets sent to firebase
button.addEventListener("click", (e) => {
    e.stopPropagation();
    let JSONobj = {};
    let messageObj = {};
    messageObj.text = textbox.value;
  
    JSONobj = {
      "message.message" : messageObj
    };
    text.update(JSONobj); //need to change to insert instead of update



    let newMessage = document.createElement("li");
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);
    textbox.value = '';
});
