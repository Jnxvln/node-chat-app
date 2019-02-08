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


/* SERVER LISTENERS =========================================  */
  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`-- CHAP APP SERVER STARTED ON PORT ${PORT}`);
});