var User = require('../models/user.js');

module.exports = {
  createUser: function(data, cb){
    new User(data).save().then(function(user){
      cb(user);
    });
  },
  getUser: function(userId, cb){
    User.where({userId: userId})
    .fetch()
    .then(function(user){
      cb(user);
    });
  }
};
