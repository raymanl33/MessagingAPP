// import  firebase from "../index";



// const apiKey = firebase[0];
// const authDomain= firebase[1];
// const projectID = firebase[2];
// const storageBucket = firebase[3];
// const messaginSenderId = firebase[4];
// const appId = firebase[5];
// const measurementId = firebase[6];





//Firebase Set up =======================================
const firebaseConfig = {
    apiKey: "AIzaSyCcqc8Se8jr5yA54_0SXAVs_YLQwtfLetU",
    authDomain: "messaging-app-d676c.firebaseapp.com",
    projectId: "messaging-app-d676c",
    storageBucket: "messaging-app-d676c.appspot.com",
    messagingSenderId: "223922951789",
    appId: "1:223922951789:web:85bc93f9a85c0470d5d164",
    measurementId: "G-57XJNKLQ2M"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const text = db.collection('messages').doc('message');

// realtime updates 
text.onSnapshot(doc => {
    let message = doc.data().message; 

    });
  






//chat box
const messages = document.querySelector("#messages");
const textbox = document.querySelector("#textbox");
const button = document.querySelector("#button");
let count = 0
// When the send button gets click the message gets sent to firebase
button.addEventListener("click", (e) => {
    e.stopPropagation();
    let JSONobj = {};
    let messageObj = {};
    let field_name = `message.${count+1}`
    messageObj.text = textbox.value;

    text.get()
    .then(doc => {
    if(text) {
      JSONobj = {
      
        'message' : messageObj
      };
      db.collection('messages').doc(field_name).set(JSONobj)
    }
    })
 
  
    
    // text.set(JSONobj); //need to change to insert instead of update



    let newMessage = document.createElement("li");
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);
    textbox.value = '';
});
