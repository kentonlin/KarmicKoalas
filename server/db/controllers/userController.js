var User = require('../models/user.js');

module.exports = {
  createUser: function(data, cb){
    new User(data).save().then(function(user){
      cb(user);
    });
  },
  getUser: function(userId, cb){
    User.where({id: userId})
    .fetch()
    .then(function(user){
      cb(user);
    });
  },
  // not tested
  updateUser: function(userId, data, cb){
    new User({id: userId}).save(data).then(function(user){
      cb(user);
    });
  },
  getEvents: function(id, cb){
    new User({id: id}).fetch().then(function(user){
      Promise.all(JSON.parse(user.get('events')).map(function(groupId){
        return new Group({id: groupId}).fetch()
      })).then(function(groups){
        cb(groups);
      });
    });
  }
};
