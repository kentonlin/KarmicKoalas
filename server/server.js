//var api = require("./api");


var express = require('express')
app = express();
var http = require('http')
var server = require('http').Server(app);

app.use(express.static('./app'));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.listen(3001);

var io = require('socket.io').listen(server);

console.log('booting on 3001')
io.on("connection",  (socket) => {  
    console.log('connection')
    var interval = setInterval(function () {
        socket.emit("location", {text:'Hello world!'});
    }, 1000);

    socket.on("disconnect", function () {
   });
 
    socket.on('location', data => {
      console.log("Incoming location:", data)
    })
});

module.exports = app;
