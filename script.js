var messages = document.querySelector("#messages");
var textbox = document.querySelector("#text");
var send = document.querySelector("#send");

const firebaseConfig = {
    apiKey: "AIzaSyCcqc8Se8jr5yA54_0SXAVs_YLQwtfLetU",
    authDomain: "messaging-app-d676c.firebaseapp.com",
    projectId: "messaging-app-d676c",
    storageBucket: "messaging-app-d676c.appspot.com",
    messagingSenderId: "223922951789",
    appId: "1:223922951789:web:85bc93f9a85c0470d5d164",
    measurementId: "G-57XJNKLQ2M"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const text = db.collection('messages');

send.addEventListener("click", async(e) => {
    e.preventDefault();

    var newMessage = document.createElement("li");
    newMessage.innerHTML = textbox.value;
    messages.appendChild(newMessage);
    console.log(textbox.value)

    await text.add({
        text: textbox.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })

})
