const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('Welcome to Chat App!');
});

app.listen(PORT, () => {
  console.log(`-- CHAP APP SERVER STARTED ON PORT ${PORT}`);
});