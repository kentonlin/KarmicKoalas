
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./db/models/user');
var Event = require('./db/models/event');
var Route = require('./db/models/route');
var Keyword = require('./db/models/Keyword');

const userController = require('./db/controllers/userController');
const eventController = require('./db/controllers/eventController');
const routeController = require('./db/controllers/routeController');

const googleApiDirections = require('./googleApiDirections');
const app = express();

app.use(bodyParser.json());

app.post('/getRouteFromGoogle', (req, res) => {
    // req.body.start = 40.8534229,-73.9793236
    // req.body.end = 40.7466059,-73.9885128
    // req.body.waypoints = latlon | latlon | ...NOT USED
    googleApiDirections(req.body.start, req.body.end, (data) => {
        res.send(data);
    });
});

app.post('/signup', (req, res) => {
            //check if existing user..
            //login or add..
            //reurn userID from db
            const userEmail = req.body.email
            new User({ email: userEmail}).fetch()
                .then((user) => {
                    if (!user) {
                        //add new user
                        userController.createUser({
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        }, (user_Id, username) => {
                            const data = {
                                userId: user.get('id'),
                                username: user.get('name')
                            };
                            res.send(200, data)
                        });
                    } else {
                        //existing user
                        user.comparePassword(userPassword, (matches) => {
                                if (matches) {
                                    //log in
                                    const data = {
                                        userId: user.get('id'),
                                        username: user.get('name')
                                    };
                                    res.send(200, data)
                                } else {
                                    //send resp with error, wrong password
                                    res.send(401, 'wrong password!')
                                }
                        })
                  }
            })
 });

        // app.post('/updateUser', (req, res)=>{
        //   userController.updateUser(req.body.userId, req.body.data, (user)=>{
        //     res.send(user);
        //   });
        // });

        // app.post('/addRoute', (req, res)=>{
        //   userController.addRoute(req.body.userId, req.body.routeId, (user)=>{
        //     res.send(user);
        //   });
        // });



app.post('/searchRoutes', (req, res) => {
    //keywords is an array 
    
  });

app.post('/createRoute', (req, res) => {
    //var addWords = helpers.generateKeywords(req.body)
    //keywords: req.body.keywords
    //"{title:'foo',start:{'lat:lon'},end:{lat:lon},keywords:'[key,key]',routeObject:'{sdfasf}''}"
    //on insert to routes, .get() route_id. on insert to keywords,
    // .get() each keword_id and insert pairs into this join table
    routeController.createRoute(req.body,(route) => {
      var route_id = route['id'];
      var keywords = JSON.parse(req.body.keywords);
      keywords.forEach((input) => {
           new keyword({word:input}).fetch()
               .then ((result) => {
                   if(!result){
                     keywordController.createKeyword(input).then()
                   }
               })
      })

    });
});


app.post('/createEvent', (req, res) => {

    eventController.createEvent({
        hostId: req.body.hostId,
        routeId: req.body.routeId,
        invitees: req.body.invitees,
        acceptedInvitees: req.body.acceptedInvitees
    }, (event) => {
        var transporter = nodemailer.createTransport('smptps://karmickoalas42%40gmail.com:makersquare42@smptp.gmail.com');
        JSON.parse(event.get('invitees')).forEach((invitee) => {
            var options = {
                to: invitee,
                subject: 'Karmic Koalas',
                html: '<b>Karmic Koalas</b>'
            };
            transporter.sendMail(options, (err, data) => {
                if (err) return console.error(err);
                console.log("Message sent:", data.response);
            });
        });
    });
    res.send("ok");
});


app.post('/joinGroup', (req, res) => {

});

app.post('/getEvents', (req, res) => {
    userController.getEvents(req.body.id, (events) => {
        res.send(events);
    });
});

// app.post('/login', (req, res)=>{

// });

// app.post('/logout', (req, res)=>{

// });
module.exports = app;
