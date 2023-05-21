const socket = io("http://localhost:8000");

const form = document.getElementById("send_message");
const new_message = document.getElementById("msg");
const messagecontainer = document.querySelector(".container");

const user_name = prompt("What's your name ?");
socket.emit("new-user-joined", user_name);

const append_user = (message, position) => {
    const message_element = document.createElement("div");
    message_element.innerText = message;
    message_element.classList.add("message", position);
    messagecontainer.append(message_element);
}

socket.on("user-joined", user_name=> {
    append_user(`${user_name} joined the chat`, "center");
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = new_message.value;
    append(`You : ${message}`, "right");
    socket.emit("send", message);
    new_message.value = "";
})

socket.on("receive", data => {
    append(`${data.names}`)
})