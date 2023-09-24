// const socket = io("https://chatarpatar.netlify.app");
const socket = io("https://real-time-chat-application-nu.vercel.app");


const form = document.getElementById("send_message");
const new_message = document.getElementById("msg");
const messagecontainer = document.querySelector(".container");
const new_msg_audio = new Audio("../media/new_msg.mp3");
const new_user_audio = new Audio("../media/new_user.mp3");


// Ennter your name:-
const user_name = prompt("What's your name ?");

// function to append to the message-container
const append = (message, position) => {
    const message_element = document.createElement("div");
    message_element.innerText = message;
    message_element.classList.add("message", position);
    messagecontainer.append(message_element);
}

// Emit to other users, that you joined
socket.emit("new-user-joined", user_name);
append("You joined the chat", "center");


// receive broadcast emit from server when new user joins
socket.on("user-joined", user_name => {
    append(`${user_name} joined the chat`, "center");
    new_user_audio.play();

})


// receive notification when a user lefts
socket.on("user-left", data => {
    append(`${data.name} left the chat`);
})

// event listener to listen Submit button of new message
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = new_message.value;
    append(`You : ${message}`, "right");
    socket.emit("send", message);
    new_message.value = "";
})

// receives the broadcast emit of new message.
socket.on("receive", data => {
    append(`${data.name} : ${data.message}`, "left");
    // new Audio("../media/new_msg.mp3").play();
    // Audio("../media/new_msg.mp3").play();
    new_msg_audio.play();
})