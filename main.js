const express=require('express');
// const { Socket } = require('socket.io');
const app = express();
const path = require('path');
const http = require('http').Server(app);

const port = process.env.PORT || 4000

// attach http server to socket.io
const io = require('socket.io')(http);
// routes

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname,'src/index.html'))
})
// create a new connection
io.on('connection',Socket =>{
    console.log("A user is connected");
    Socket.on ('disconnect',()=>{
        console.log("User disconnected");
    }) 
    Socket.on('message',msg =>{
        console.log("client message:", msg);
    })
    Socket.emit('server', "message from server");
})


http.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})