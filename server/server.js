//var api = require("./api");
var express = require('express')
app = express();
var http = require('http')
var server = require('http').Server(app);

app.use(express.static('../'));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

server.listen(3001);

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){
     socket.on('location', function(data) {
      console.log("Incoming location:", data)
    });
    socket.on('error', function(err) {
      console.log("Error", err);
    });
});

module.exports = app;
