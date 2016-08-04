var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');

var User = require('./db/models/user');
var Event = require('./db/models/event');
var Route = require('./db/models/route');

var userController = require('./db/controllers/userController');
var eventController = require('./db/controllers/eventController');
var routeController = require('./db/controllers/routeController');

var app = express();

app.use(bodyParser.json());


app.post('/signup', function(req, res){
  userController.createUser({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    routes: req.body.routes,
    events: req.body.events
  }, function(user){
    res.send(user);
  });
});

app.post('/updateUser', function(req, res){
  userController.updateUser(req.body.userId, req.body.data, function(user){
    res.send(user);
  });
});

app.post('/addRoute', function(req, res){
  userController.addRoute(req.body.userId, req.body.routeId, function(user){
    res.send(user);
  });
});

app.post('/login', function(req, res){

});

app.post('/logout', function(req, res){

});

app.post('/createRoute', function(req, res){
  routeController.createRoute({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    points_of_interest: req.body.points_of_interest,
    keywords: req.body.keywords
  }, function(route){
    res.send(route);
  });
});


app.post('/createEvent', function(req, res){

  eventController.createEvent({
    hostId: req.body.hostId,
    routeId: req.body.routeId,
    invitees: req.body.invitees,
    acceptedInvitees: req.body.acceptedInvitees
  }, function(event){
    var transporter = nodemailer.createTransport('smptps://karmickoalas42%40gmail.com:makersquare42@smptp.gmail.com');
    JSON.parse(event.get('invitees')).forEach(function(invitee){
      var options = {
        to: invitee,
        subject: 'Karmic Koalas',
        html: '<b>Karmic Koalas</b>'
      };
      transporter.sendMail(options, function(err, data){
        if(err) return console.error(err);
        console.log("Message sent:", data.response);
      });
    });
  });
  res.send("ok");
});


app.post('/joinGroup', function(req, res){

});

app.post('/getEvents', function(req, res){
  userController.getEvents(req.body.id, function(events){
    res.send(events);
  });
});

module.exports = app;
