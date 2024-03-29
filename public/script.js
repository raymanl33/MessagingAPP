// const { type } = require("express/lib/response");

const socket = io();
const chatMessages = document.querySelector('#chatbox')


// Get username and room from URL 
const { user, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


// Join room 
socket.emit("joinRoom", {user, room});



// retrieve message from the server.js
socket.on('message', message => {
        // Scrow down 
        chatMessages.scrollTop = chatMessages.scrollHeight;
        outputMessage(message, user);
});



//chat box
let messages = document.querySelector("#messages");
let textbox = document.querySelector("#text");
let send = document.querySelector("#send");


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
let text = db.collection(room);


// output message on to the DOM
const outputMessage = (msg, user) => {

    let newMessage = document.createElement("li");
    let timestamp = document.createElement('li');
    
    // create a new date object and convert it to string type 
    // then insert it into firebase
    const current_time = new Date();
    
    // output format functions: minute() & day ()
    const minutes = minute(current_time.getMinutes())
    const periods = day(current_time)


    // Get username from the URL using windows search 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('user')

 
    if ( msg.username != user && msg.username != "Chataway Bot") {
            let current = `${current_time.getHours()}:${minutes} ${periods}`;   
            newMessage.innerHTML = `${msg.username}: ${msg.text}`;
            timestamp.innerHTML = `→ ${current}`;
            messages.appendChild(newMessage);
            messages.appendChild(timestamp);

        
   
     
    } else if (msg.username === "Chataway Bot" ) {
        console.log(msg.text)
        let current = `${current_time.getHours()}:${minutes} ${periods}`;   
        newMessage.innerHTML = `${msg.username}🤖 : ${msg.text}!`;
        timestamp.innerHTML = `→ ${current}`;
        messages.appendChild(newMessage);
        messages.appendChild(timestamp);

    } else {
        newMessage.style.textAlign = "right";
        timestamp.style.textAlign = "right";
  
        let current = `${current_time.getHours()}:${minutes} ${periods}`;   
        newMessage.innerHTML = `${user}: ${msg.text}`;
        timestamp.innerHTML = `→ ${current}`;
        messages.appendChild(newMessage);
        messages.appendChild(timestamp);
       
    } 

    
}


text.orderBy("createdAt").get().then((querySnapshot) => {
    // uses querySnapshot to get a list of each document inside the collection
    // querySnapshot contains the results of a query 
    querySnapshot.forEach((text_mssg) => {
        let doc_id = text_mssg.id;
        const textDoc = text.doc(doc_id);
       
        // onSnapshot for real time update of text messages
        textDoc.onSnapshot(doc => {
            let message = doc.data().text;
            let createdAt = doc.data().createdAt;
            let username = doc.data().name;
            const current_time = new Date(createdAt.seconds * 1000)
            
             // output format functions: minute() & day ()
            const periods = day(current_time)
            const minutes = minute(current_time.getMinutes())
            
            let current = `${current_time.getHours()}:${minutes} ${periods}`;
            let newMessages = document.createElement("li");
            
            // use the timestamp string from firebase and append it to index.html
            let timestamp = document.createElement('li')
            if (user === username) {
                newMessages.style.textAlign = "right";
                timestamp.style.textAlign = "right";
            }
          
            newMessages.innerHTML = `${username}: ${message}`
            timestamp.innerHTML =  `→ ${current}`
            messages.appendChild(newMessages)
            messages.appendChild(timestamp)

            })
    })
});



// When the send button gets clicked the message will be sent to firebase
send.addEventListener("click", async(e) => {
    e.preventDefault();

    // emit a message to the server
    socket.emit('chatMessage', textbox.value);
    
    await text.add({
        name: user,
        text: textbox.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    textbox.value = '';

});

// check the hour and return whether it is AM or PM
const day = (hour) => {
    const day = hour.getHours()
    if (day >= 12) {
        return 'PM'
    } else {
        return 'AM'
    }
}

// check the minutes passed in the parameter. If the length of the minute is 1
// return with a 0 in front of the variable, else just return the argument, minutes
const minute = (minutes) => {
    if (minutes.toString().length === 1) {
        return `0${minutes}`
    } else {
        return minutes;
    }
}




