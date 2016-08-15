'use strict';

const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, 'index.html');
const app = require('./api');
const server = require('http').Server(app)
    app.use((req, res) => res.sendFile(INDEX) )
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(server);
var rooms = {};
var userId;
var username;
var myRoom = '1';

const db = require('./db/config');

// var joinRoom = (data, socket) => {
// //  var myRoom = data.eventId;
//   //check to see if user_id is matched with event_id in
//   //events_participants join table
//   console.log('join room', data)
//   return db.knex.raw('SELECT * FROM `events_participants` WHERE `event_id`=' + data.event_id + ' AND `user_id`= ' + data.user_id)
//        .then((results) =>{
//          results = results[0][0]
//          console.log('join room', results)
//          if (results.length === 0){
//            //not a participant in this event
//          } else {
//             if(rooms.myRoom){
//               //existing room
//               rooms.myRoom.push(socket)
//             } else {
//               rooms.myRoom = [];
//               rooms.myRoom.push(socket)
//             }
//             console.log('rooms', rooms)
//         }
//        return;
//   })
// }
io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('initialize', (data) => {
                // userId = data.userId;
                // username = data.username;
                // joinRoom(myRoom, socket)
                socket.leave(myRoom);
                myRoom = data.eventId;
                console.log('+++++++intialaze client side', data, myRoom)
                socket.join(data.eventId);
                console.log('joined')
            });

            socket.on('location', (data) => {
                //console.log("Incoming location with updated title:", data)
                console.log("Incoming location:", data, myRoom)
                //data.title = username
                //myRoom = toString(data.eventId)
                io.to(data.eventId).emit('groupUpdate', data);
            });

            socket.on('tweet', (data) => {
                console.log("Incoming tweet:", data)
                //myRoom = toString(data.eventId)
                io.to(data.eventId).emit('tweet', data.text);
            });

            socket.on('error', (err) => {
                console.log("Error", err);
            });

            socket.on('disconnect', () => console.log('Client disconnected'));

 });
