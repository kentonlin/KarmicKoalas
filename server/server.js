//var api = require("./api");
var express = require('express')
app = express();
var http = require('http')
var server = require('http').Server(app);

app.use(express.static('./'));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

server.listen(3001);

// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);

    //recieve client data
    socket.on('client_data', function(data){
        process.stdout.write(data.letter);
    });
     socket.on('location', function(data) {
       process.stdout.write(data.letter);
      console.log("Incoming location:", data)
    })

});
//working client code:
// <script>
//     var socket = io.connect();

//     socket.on('date', function(data){
//         $('#date').text(data.date);
//     });

//     $(document).ready(function(){
//         $('#text').keypress(function(e){
//             socket.emit('client_data', {'letter': String.fromCharCode(e.charCode)});
//         });
//     });
// </script>



//old server code:

// app.listen(3001);

// var io = require('socket.io').listen(server);

// console.log('booting on 3001')
// io.on("connection",  (socket) => {  
//     console.log('connection')
//     var interval = setInterval(function () {
//         socket.emit("location", {text:'Hello world!'});
//     }, 1000);

//     socket.on("disconnect", function () {
//    });
 
//     socket.on('location', data => {
//       console.log("Incoming location:", data)
//     })
// });

module.exports = app;
