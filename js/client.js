const socket = io("http://localhost:8000");

const form = document.getElementById("send_message");
const message = document.getElementById("msg");
const messagecontainer = document.querySelector("container");

const user_name = prompt("What's your name ?");
socket.emit("new-user-joined", user_name);