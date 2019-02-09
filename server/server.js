const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  
  console.log('A user connected!');
  /* SERVER EMITTERS =========================================  */

  socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'A user joined the chat =)'));

  /* SERVER LISTENERS =========================================  */

  socket.on('createMessage', (message, callback) => {
      console.log(message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('ADMIN', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'A user has left the chat =('));
  });
});

// ---------
server.listen(PORT, () => {
  console.log(`-- CHAP APP SERVER STARTED ON PORT ${PORT}`);
});