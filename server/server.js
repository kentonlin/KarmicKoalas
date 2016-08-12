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
const rooms = {};
var userId = 'foo';
var myRoom = 'baz';


io.on('connection', (socket) => {
            console.log('Client connected');
           
            socket.on('initialize', (data) => {
                // myRoom = toString(data.eventId);
                // userId = toString(data.userId);
                // username = toString(data.username);
                userId = data.userId;
                myRoom = data.myRoom;
                console.log('initialize client side',data)
               // socket.join(myRoom);
            });
            socket.join(myRoom);
            socket.on('location', (data) => {
                console.log("Incoming location with updated title:", data)
                io.to(myRoom).emit('groupUpdate', data);
            });

            socket.on('tweet', (data) => {
                console.log("Incoming tweet:", data)
                io.to(myRoom).emit('tweet', data);
            });

            socket.on('error', (err) => {
                console.log("Error", err);
            });

            socket.on('disconnect', () => console.log('Client disconnected'));

 });
