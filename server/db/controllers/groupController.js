var Group = require('../models/group.js')

module.exports = {
  createGroup: function(data, cb){
    new Group(data).save().then(function(group){
      cb(group);
    });
  },
}
