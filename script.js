let messagebox = document.querySelector ("textarea");
let button = document.querySelector ("button");
let messages = document.querySelector ("ul");
let nameBox = document.querySelector("input");

nameBox.value = localStorage.getItem("username"); //saving users name

function addMessageToList(messageObject)
{
    let newMessage = document.createElement("li");

    newMessage.innerHTML = 
    messageObject.name + "<br>" +
    new Date(messageObject.date) +
     ": <br>" + messageObject.message;


    messages.appendChild(newMessage);
}

function getMessageFromSomeoneElse()
{
    addMessageToList(whatYouRecievedFromServer);
}

//add new message in input box, send and clear box
button.onclick = () =>{
    let messageObject = {
        name: nameBox.value,
        message: messagebox.value,
        date: Date.now()
    };
    addMessageToList(messageObject)
    messagebox.value = "";

    localStorage.setItem("username", nameBox.value); //saving users name

    //sendToSocket(messageObject); didn't use socket for this example only local
}