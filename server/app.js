/* eslint-disable no-console */
/* eslint-disable no-multi-assign */
const express = require('express');

const app = express();
const io = app.io = require('socket.io')();
const cors = require('cors');
const bodyParse = require('body-parser');
const path = require('path');
const users = require('./routes/user');
const rooms = require('./routes/room');
const chat = require('./chat_namespace');

app.use(cors);
app.use(bodyParse.json());

// Middleware
app.use((req, res, next) => {
  console.log('Time : ', Date.now());
  next();
});

// Routing
app.use('/auth', users);
app.use('/rooms', rooms);

// static routing
app.use(express.static(path.join(__dirname, '../dist')));
// chat socket namespace
chat.createNameSpace(io);

module.exports = app;
