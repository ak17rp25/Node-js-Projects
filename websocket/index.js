const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const port = 8000;

const path = require('path');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.on('message', (msg) => {
    io.emit('user-message', msg);
  });
});
//for setting the path
app.use(express.static(path.resolve('./websocket/public')));
app.get('/', (req, res) => {
    res.sendFile('./websocket/public/index.html');
  });


server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
