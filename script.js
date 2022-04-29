// Creates variables for the chat display, textarea, and send button
var messages = document.querySelector("#messages");
var textbox = document.querySelector("#text");
var send = document.querySelector("#send");

// Firebase Configuration ====================================
const firebaseConfig = {
    apiKey: "AIzaSyCcqc8Se8jr5yA54_0SXAVs_YLQwtfLetU",
    authDomain: "messaging-app-d676c.firebaseapp.com",
    projectId: "messaging-app-d676c",
    storageBucket: "messaging-app-d676c.appspot.com",
    messagingSenderId: "223922951789",
    appId: "1:223922951789:web:85bc93f9a85c0470d5d164",
    measurementId: "G-57XJNKLQ2M"
};

// Firebase Initialization
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const text = db.collection('messages');

// Messages get added to Firebase Database
// Messages sent off button click
// Await used so that text.add does not hold up the function
send.addEventListener("click", async(e) => {
    e.preventDefault();

    let newMessage = document.createElement("li");
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);

    
    await text.add({
        text: textbox.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

})
