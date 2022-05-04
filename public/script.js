
// // ???
// const firebase = require("../index");
// console.log(firebase)
;


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
const text = db.collection('messages');







text.get().then((querySnapshot) => {
    // uses querySnapshot to get a list of each document inside the collection
    // querySnapshot contains the results of a query 
    querySnapshot.forEach((text_mssg) => {
        let doc_id = text_mssg.id;
        const textDoc = text.doc(doc_id);
        // onSnapshot for real time update of text messages
        textDoc.onSnapshot(doc => {
            let message = doc.data().text;
            let createdAt = doc.data().createdAt;
            let newMessages = document.createElement("li");
            // use the timestamp string from firebase and append it to index.html
            let timestamp = document.createElement('li')
            newMessages.innerHTML = `Raymond: ${message}`
            timestamp.innerHTML =  `→ ${createdAt}`
            messages.appendChild(newMessages)
            messages.appendChild(timestamp)
            
        })
    })
});



// When the send button gets clicked the message will be sent to firebase
send.addEventListener("click", async(e) => {
    e.preventDefault();
    let newMessage = document.createElement("li");
    let timestamp = document.createElement('li');
    // create a new date object and convert it to string type 
    // then insert it into firebase
    const current_time = new Date();
    const minute = current_time.getMinutes().toString().length;
    const periods = day(current_time)
    if (minute === 1) { 
        // checkig if getMinutes return only 1 digit
        // if 1 digit add a 0 in front of minitues
        
        let current = `${current_time.getHours()}:0${current_time.getMinutes()} ${periods}`;
        newMessage.innerHTML = `Raymod: ${textbox.value}`;
        timestamp.innerHTML = `→ ${current}`;
        messages.appendChild(newMessage);
        messages.appendChild(timestamp)
        console.log(textbox.value)
        await text.add({
            text: textbox.value,
            createdAt: current
        })
    } else {
        let current = `${current_time.getHours()}:${current_time.getMinutes()} ${periods}`;
        newMessage.innerHTML = `Raymod: ${textbox.value}`;
        timestamp.innerHTML = `→ ${current}`;
        messages.appendChild(newMessage);
        messages.appendChild(timestamp)
        console.log(textbox.value)
        await text.add({
            text: textbox.value,
            createdAt: current
        })
    }

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

// upload image 
const image_input = document.querySelector('#chatbox')
let uploaded_image = "";

image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#chatbox").style.backgroundImage = `url(${uploaded_image})`; 
    });
    reader.readAsDataURL(this.files[0]);
});



