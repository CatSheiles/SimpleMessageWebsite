//A simple chat where users can message together
//Wookie wrote a simple server that accepts and send messages to all connected
//shows who messaged, date/time, message
//can connect other ip's via http requests so you can have as many users as you want

let messagebox = document.querySelector ("textarea");
let button = document.querySelector ("button");
let messages = document.querySelector ("ul");
let nameBox = document.querySelector("input");

nameBox.value = localStorage.getItem("username"); //saving users name

function addMessageToList(messageObject)
{
    messages.innerHTML = "";
    messageObject.forEach(message => {
        let newMessage = document.createElement("li");

        newMessage.innerHTML = 
        message.name + "<br>" +
        new Date(message.date) +
        ": <br>" + message.message;

        messages.appendChild(newMessage);
    });
}

function getMessageFromSomeoneElse(res)
{
    addMessageToList(JSON.parse(res.target.response));
}

//Wookie test server
var server = new XMLHttpRequest();
server.addEventListener("load", getMessageFromSomeoneElse);
server.open("GET", "http://192.168.0.125/messages");
server.send();

//add new message in input box, send and clear box
button.onclick = () =>{
    let messageObject = {
        name: nameBox.value,
        message: messagebox.value,
        date: Date.now()
    };
    addMessageToList([messageObject])
    messagebox.value = "";

    localStorage.setItem("username", nameBox.value); //saving users name

    server.open("POST", "http://192.168.0.125/send");
    server.send(JSON.stringify(messageObject));
}