var User = require('../models/user.js');
var db = require('../config.js');

module.exports = {
  signup: function(data, cb){
    new User(data).save(function(err, user){
      if(err){
        return console.error(err);
      }
      cb(user);
    });
  },
};
