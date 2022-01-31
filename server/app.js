
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

const io = new Server(server, {
    cors: corsOptions
});
const cors = require('cors')
const router = require('./router')

const SERVER_PORT = 8080

app.use(cors(corsOptions));
io.on('connection', (socket) => {
    console.log('someone connected!');
    socket.on("join",({name,room},callback)=>{
        console.log(name,room)
    })
    socket.on('disconnect', () => {
        console.log('someone disconnected!!!');
    })
});

app.use('/', router)

server.listen(SERVER_PORT, () => {
    console.log("listening on port", SERVER_PORT)
})