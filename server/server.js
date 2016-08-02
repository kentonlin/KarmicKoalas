'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'test.html');

const server = express()
  .use((req, res) => res.sendFile(test) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

//const api = require('./api')
const io = socketIO(server);
var group = [];
var rooms = {};

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('intitialize', (data) =>{
    console.log('initialize', data)
    //add unique socket id to group array in rooms object
    if(this.rooms[data.groupId] === undefined){
      this.rooms[data.groupId] = this.rooms[data.groupId] = []
    } else {
      this.rooms[data.groupId].push(socket)
    }
  })

  socket.on('location', (data) => {
      console.log("Incoming location:", data)
     // ------->

         if(group.length){
              for(var i=0; i<group.length; i++){
                    if(group[i].title === data.title){
                          group[i].latitude = data.latitude;
                          group[i].longitude = data.longitude;
      }
    }
  } else {
    group.push(data);
  }
      //------>
      // group[data.user] = data.coordinates;
      console.log("send to client:", group)
     socket.emit('groupUpdate', group);
    });
    socket.on('error', (err) =>{
      console.log("Error", err);
    });
 
 socket.on ('tweet', (data)=>{
      console.log('tweet message received', data.text)
      //socket.group(groupId).emit('tweet', data)
      socket.emit('tweet', data)
  })

  socket.on('disconnect', () => console.log('Client disconnected'));
});

module.exports = server;

// var express = require('express')
// var app = express()
// var http = require('http')
// var server = require('http').Server(app);
// var port = process.env.PORT || 3001;
// app.use(express.static('../'));
// var api = require("./api");

// server.listen(port, ()=>
//   console.log('server listening on port: ' + port)
//   );
// // use socket.io
// var io = require('socket.io').listen(server);

// //turn off debug
// io.set('log level', 1);

// // define interactions with client
// io.sockets.on('connection', function(socket){

//      socket.on('location', function(data) {
//       console.log("Incoming location:", data)
//       //sending dummy data for group update

//       socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
//     });
//     socket.on('error', function(err) {
//       console.log("Error", err);
//     });
// });

// module.exports = app;
