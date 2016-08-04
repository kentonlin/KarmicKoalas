var User = require('../models/user.js');

module.exports = {
  createUser: function(data, cb){
    new User(data).save().then(function(user){
      cb(user);
    });
  },
  getUser: function(userId, cb){
    // User.where({id: userId})
    // .fetch()
    // .then(function(user){
    //   cb(user);
    // });
    new User({id: userId}).fetch().then(function(user){
      cb(user);
    });
  },
  updateUser: function(userId, data, cb){
    new User({id: userId}).save(data).then(function(user){
      cb(user);
    });
  },
  getEvents: function(userId, cb){
    new User({id: userId}).fetch().then(function(user){
      Promise.all(JSON.parse(user.get('events')).map(function(groupId){
        return new Group({id: groupId}).fetch()
      })).then(function(groups){
        cb(groups);
      });
    });
  },
  addRoute: function(userId, routeId, cb){
    new User({id: userId}).fetch().then(function(user){
      var routes = JSON.parse(user.get('routes'));
      routes.push(+routeId);
      new User({id: userId}).save({routes: JSON.stringify(routes)}).then(function(user){
        cb(user);
      });
    });
  }
};
