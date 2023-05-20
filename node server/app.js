const io = require("socket.io")(8000);

const users = {};

io.on("connection", socket =>{
    socket.on("new-user-joined", user_name => {
        console.log(user_name);
        users[socket.id] = user_name;
        socket.broadcast.emit("user-joined", user_name);
    });

    socket.on("send", message => {
        socket.broadcast.emit("receive", {message : message, name : users[socket.id]})
    });
});