const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A user connected!');

/* SERVER EMITTERS =========================================  */

// socket.emit from Admin text Welcome to Chat App
// socket.broadcast.emit (sent to everyone but who joined)
    // from Admin, text New user joined

socket.emit('newMessage', {
  from: 'ADMIN',
  text: 'Welcome to Chat App!',
  createdAt: new Date().getTime()
});

socket.broadcast.emit('newMessage', {
  from: 'ADMIN',
  text: 'A new user joined the channel!',
  createdAt: new Date().getTime()
});
/* SERVER LISTENERS =========================================  */



socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`-- CHAP APP SERVER STARTED ON PORT ${PORT}`);
});