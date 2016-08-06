
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./db/models/user');
var Event = require('./db/models/event');
var Route = require('./db/models/route');

const userController = require('./db/controllers/userController');
const eventController = require('./db/controllers/eventController');
const routeController = require('./db/controllers/routeController');

const googleApiDirections = require('./googleApiDirections');
const app = express();

app.use(bodyParser.json());

app.post('/getRouteFromGoogle', (req, res) => {
    // req.body.start = 40.8534229,-73.9793236
    // req.body.end = 40.7466059,-73.9885128
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

        // app.post('/login', (req, res)=>{

        // });

        // app.post('/logout', (req, res)=>{

        // });

        app.post('/searchRoutes', (req, res) => {
            //keywords is an object {keyword1:foo,keyword2:foo... keyword5:foo}

        });

        app.post('/createRoute', (req, res) => {
            //var addWords = helpers.generateKeywords(req.body)
            routeController.createRoute({
                title: req.body.title,
                start: req.body.start,
                end: req.body.end,
                points_of_interest: req.body.points_of_interest,
                keywords: req.body.keywords
            }, (route) => {
                res.send(route);
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

        module.exports = app;
