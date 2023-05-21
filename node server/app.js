const http = require('http');
const socketIO = require("socket.io");

// Create the HTTP server
const server = http.createServer();

// Create the Socket.IO instance and pass the server as an argument
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        credentials: true
    }
});


const users = {};

io.on("connection", socket =>{
    socket.on("new-user-joined", user_name => {
        // console.log(user_name);
        users[socket.id] = user_name;
        socket.broadcast.emit("user-joined", user_name);
    });

    socket.on("send", message => {
        socket.broadcast.emit("receive", {message : message, name : users[socket.id]})
    });

    socket.on("disconnect", message => {
        socket.broadcast.emit("user-left", {name : users[socket.id]});
        delete users[socket.id];
    })
});


server.listen(8000);