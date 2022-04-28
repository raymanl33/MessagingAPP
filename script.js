var messages = document.querySelector("#messages");
var text = document.querySelector("#text");
var send = document.querySelector("#send");

send.addEventListener("click", function(){
    var newMessage = document.createElement("li");
    newMessage.innerHTML = text.value;
    messages.appendChild(newMessage);
})

