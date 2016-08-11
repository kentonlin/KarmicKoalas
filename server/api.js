
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./db/models/user');
const Keyword = require('./db/models/keyword');
const Route = require('./db/models/route');
const Event = require('./db/models/event');
const db = require('./db/config')
const userController = require('./db/controllers/userController');
const routeController = require('./db/controllers/routeController');
const eventController = require('./db/controllers/eventController');

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

app.get('/getAllUsers', (req, res) => {
  // Get request to /getallusers
  // returns [ { name : name,user_ id: user_id},{ name : name,user_ id: user_id}….]
  var allUsers = db.knex.raw('SELECT `name`, `id` FROM `Users`')
  console.log("allUsers",allUsers)
  res.status(200).send(allUsers)
})

app.post('/signup', (req, res) => {
  //check if existing user..
  //req.body  = {username, email, password}
  //reurn userID from db
  new User({
      name: req.body.name
    }).fetch()
    .then((user) => {
      if (!user) {
        //add new user
        userController.createUser(req.body)
          .then((user) => {
            var data = {
              'userId': user['id']
            };
            res.status(200).send(data)
          });
      } else {
        //  existing user
        var newPassword = req.body.password
          // userController.comparePassword(user.password, newPassword, (matches) => {
          //         if (matches) {
          //             //log in
        var data = {
          'userId': user['id']
        };
        res.status(200).send(JSON.stringify(data))
          // } else {
          //     //send resp with error, wrong password
          //     res.send(401, 'wrong password!')
          // }
          //})
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
  // {title:string, keywords:[],start:{}, end:{}, routeObject:[]}
  //{title:'bike in Central Park', keywords:['New York', 'Central Park', 'bike', 'bicycle'],start:'{latitude: 37.33756603, longitude: -122.02681114}', end:{latitude: 37.34756603, longitude: -122.02581114}, routeObject: '[{latitude: 37.33756603, longitude: -122.02681114}, {latitude: 37.34756603, longitude: -122.02581114}]'}
  var keywordIdList = [];
  var route_id;
  //var body = JSON.parse(req.body);
  var keywords = req.body.keywords
    //var addWords = helpers.generateKeywords(req.body)
    //keywords: req.body.keywords
    //"{title:'foo',start:{'lat:lon'},end:{lat:lon},keywords:'[key,key]',routeObject:'{sdfasf}''}"
    //on insert to routes, .get() route_id. on insert to keywords,
    // .get() each keword_id and insert pairs into this join table
    //add route object to route table
  routeController.createRoute(req.body)
    .then((input) => {
      route_id = input.id
      console.log('input', route_id)
        //add each keyword to keywords table if new, else get id
      keywords.forEach((input) => {
        // new Keyword({word:input}).fetch()
        //  knex.raw('INSERT INTO table (Keywords) values (?) ON DUPLICATE KEY UPDATE c=c+1', [1, 2, 3]);
        // .then ((result) => {
        //  if (result !== null){
        //    //existing keyword. get the keyword_id
        //    keyword_id = result['id']
        //    keywordIdList.push(keyword_id)
        //    console.log('existing keyword',keywordIdList)
        //
        //  } else if (!result){
        // console.log('new keyword')
        //new keyword.. make a new entry and get id
        //add keyword_id to join table with route_id
        new Keyword({
            word: input
          }).save()
          .then((keyword) => {
            keyword_id = keyword['id']
              //add to join table
            var data = {
                keyword_id: keyword_id,
                route_id: route_id,
              }
              //  console.log(data)
              // Returns [1] in "mysql", "sqlite", "oracle"; [] in "postgresql" unless the 'returning' parameter is set.
            db.knex.raw('INSERT INTO `keywords_routes` (`keyword_id`, `route_id`) values (' + toString(keyword_id) + ', ' + toString(route_id) + ' ) ');
            //  new keyword_route(data).save()
            //   .then((resp)=>{
            //    console.log('db updated')
            //    });
            //keywordIdList.push(keyword_id)
            //console.log('new keyword',keywordIdList)
          })
          //   }
          //  })
      })
      console.log('output', route_id)
      res.status(200).send(JSON.stringify({
          'route_id': route_id
        }))
    }) //.then(()=>{
    //     //add keyword_id to join table with route_id
    //     console.log('route_id',route_id)
    //     console.log('keywordIdList',keywordIdList)
    //     keywordIdList.forEach((input) => {
    //        var data = {
    //           keyword_id: input,
    //           route_id: route_id,
    //         }
    //           console.log('data',data)
    //       new keyword_route(data).save()
    //          .then((resp)=>{
    //         console.log('db updated')
    //       });
    //    })
    // })

});

app.post('/createEvent', (req, res) => {
  var invitees = [];
  //{title:string, host:user_id, guests:[id, id], route_id, route_id, time:time}



  // eventController.createEvent(req.body)
  //   .then((event) => {
  //   console.log(event)
  //get user from users db based on name??
  //add userId of participants and host to join table, events_participants


  //  var transporter = nodemailer.createTransport('smptps://karmickoalas42%40gmail.com:makersquare42@smptp.gmail.com');
  // JSON.parse(event.get('invitees')).forEach((invitee) => {
  //     var options = {
  //         to: invitee,
  //         subject: 'Karmic Koalas',
  //         html: '<b>Karmic Koalas</b>'
  //     };
  //     transporter.sendMail(options, (err, data) => {
  //         if (err) return console.error(err);
  //         console.log("Message sent:", data.response);
  //     });
  // });
//})
res.send(invitees);
});


app.post('/joinEvent', (req, res) => {

});

app.post('/getEvents', (req, res) => {
  userController.getEvents(req.body.id, (events) => {
    res.send(events);
  });
});


module.exports = app;
