'use strict';

const express = require('express');
//const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const app = require('./api');
const server = require('http').Server(app)//express()
 // .use((req, res) => res.sendFile(test) )
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(server);
var rooms = {};

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.join('myRoom');
  socket.on('location', function(data) {
      console.log("Incoming location:", data)
      io.to('myRoom').emit('groupUpdate', data);
    });
  socket.on('tweet', function(data) {
  console.log("Incoming tweet:", data)
  io.to('myRoom').emit('tweet', data);
  });
    socket.on('error', function(err) {
      console.log("Error", err);
    });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
