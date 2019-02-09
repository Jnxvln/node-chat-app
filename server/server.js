const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
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

socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to the chat app!'));
socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'A new user joined the app!'));

/* SERVER LISTENERS =========================================  */

socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`-- CHAP APP SERVER STARTED ON PORT ${PORT}`);
});